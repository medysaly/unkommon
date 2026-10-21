"""Server-owned confirmation and at-most-once calendar writes.

The LLM can prepare an intent, never submit a booking. A new user turn must
exactly confirm the random code bound to that intent's immutable details.
"""

import re
import secrets
import time
import uuid
from datetime import datetime
from zoneinfo import ZoneInfo

from data.booking_state_repo import get_booking_state, save_pending_booking, transition_booking
from data.calendar_client import check_availability, book_appointment
from data.appointments_repo import save_appointment

EASTERN = ZoneInfo("America/New_York")
UNCERTAIN = (
    "I couldn't verify the booking result. Please don't submit it again. "
    "Contact contact@unkommon.ai so we can check the calendar before another attempt."
)
BLOCKED = "A booking has already been submitted in this conversation. For help or changes, contact contact@unkommon.ai."


def validate_booking(details):
    required = ("date", "time", "name", "email", "phone")
    if not isinstance(details, dict) or any(not isinstance(details.get(k), str) or not details[k].strip() for k in required):
        return "A date, time, full name, email, and phone are required."
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", details["date"]) or not re.fullmatch(r"\d{2}:\d{2}", details["time"]):
        return "Use YYYY-MM-DD and HH:MM for the date and time."
    try:
        start = datetime.strptime(f'{details["date"]} {details["time"]}', "%Y-%m-%d %H:%M").replace(tzinfo=EASTERN)
    except ValueError:
        return "The date or time is invalid."
    if start <= datetime.now(EASTERN):
        return "Please choose a future appointment."
    if not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", details["email"]) or len(details["email"]) > 254:
        return "A valid email address is required."
    if len(details["name"]) > 100 or any(ord(c) < 32 or ord(c) == 127 for k in required for c in details[k]):
        return "Please provide plain contact details without control characters."
    if not re.fullmatch(r"[+\d() .-]{7,25}", details["phone"]) or not 7 <= len(re.sub(r"\D", "", details["phone"])) <= 15:
        return "A valid phone number is required."
    return None


def prepare_booking(conversation_id, details):
    error = validate_booking(details)
    if error:
        return {"error": error}
    previous = get_booking_state(conversation_id)
    if previous and previous["status"] not in ("pending", "cancelled"):
        return {"error": BLOCKED}
    booking = {k: details[k].strip() for k in ("date", "time", "name", "email", "phone")}
    if booking["time"] not in check_availability(booking["date"]):
        return {"error": "That time is not available. Please choose another returned slot."}
    token = secrets.token_hex(4).upper()
    recap = (
        f"Please check your free 30-minute call:\n"
        f"Date: {booking['date']}\nTime: {booking['time']} Eastern Time (America/New_York)\n"
        f"Name: {booking['name']}\nEmail: {booking['email']}\nPhone: {booking['phone']}\n\n"
        f"To book these exact details, reply Confirm {token}. "
        "This confirmation expires in 15 minutes. Nothing is booked yet. "
        "If anything needs changing, tell me instead."
    )
    now = int(time.time())
    pending = {"intentId": str(uuid.uuid4()), "token": token, "booking": booking,
               "recap": recap, "expiresAt": now + 900, "ttl": now + 86400}
    if not save_pending_booking(conversation_id, pending, previous):
        return {"error": "The booking details changed in another request. Please review them again."}
    return {"confirmation": recap}


def handle_confirmation(conversation_id, user_message):
    """Return authoritative text for confirmations, or None for normal chat.

    Non-confirmation messages invalidate pending details before reaching the
    model. Quoted/prefixed/appended confirmations are never accepted.
    """
    state = get_booking_state(conversation_id)
    match = re.fullmatch(r"confirm\s+([a-f0-9]{8})[.!]?", user_message.strip(), re.IGNORECASE)
    if not state:
        return "There is no pending booking to confirm. Tell me which day you prefer." if match else None
    status = state["status"]
    if status in ("processing", "uncertain", "booked"):
        return state.get("response", UNCERTAIN if status == "uncertain" else BLOCKED) if match else None
    if status != "pending":
        return "That confirmation is no longer active. Please review a new booking first." if match else None
    if int(state["expiresAt"]) <= int(time.time()):
        transition_booking(conversation_id, state["intentId"], "pending", "cancelled")
        return "That confirmation expired. Let's check availability and review the details again." if match else None
    if not match:
        if re.fullmatch(r"(?:yes|yes please|yes book it|confirm|okay|ok)[.!]?", user_message.strip(), re.IGNORECASE):
            return state["recap"]
        transition_booking(conversation_id, state["intentId"], "pending", "cancelled")
        return None
    if not secrets.compare_digest(match[1].upper(), state["token"]):
        return "That code does not match the pending booking. Please use the code in the latest booking recap."
    booking = state["booking"]
    if validate_booking(booking):
        transition_booking(conversation_id, state["intentId"], "pending", "cancelled")
        return "That appointment is no longer valid. Please choose a new time."
    if not transition_booking(conversation_id, state["intentId"], "pending", "processing"):
        return "This booking is already being handled or its details changed. Please don't submit it again."
    try:
        available = check_availability(booking["date"])
    except Exception:
        transition_booking(conversation_id, state["intentId"], "processing", "cancelled")
        return "I couldn't check availability, so nothing was booked. Please review a new time or use https://www.unkommon.ai/book-a-call."
    if booking["time"] not in available:
        transition_booking(conversation_id, state["intentId"], "processing", "cancelled")
        return "That time is no longer available. Nothing was booked. Please choose another time."
    try:
        result = book_appointment(booking)
    except Exception as error:
        # A definitive 400/409 means the calendar rejected the request. Any
        # timeout/unknown failure may follow a successful write: never retry it.
        if getattr(getattr(error, "response", None), "status_code", None) in (400, 409):
            transition_booking(conversation_id, state["intentId"], "processing", "cancelled")
            return "The calendar rejected that booking. Nothing is confirmed. Please choose a new time."
        transition_booking(conversation_id, state["intentId"], "processing", "uncertain", UNCERTAIN)
        return UNCERTAIN
    if result.get("success") is not True:
        transition_booking(conversation_id, state["intentId"], "processing", "uncertain", UNCERTAIN)
        return UNCERTAIN
    response = f"Your free 30-minute call is booked for {booking['date']} at {booking['time']} Eastern Time."
    response += " A confirmation email was sent." if result.get("emailSent") is True else " I couldn't verify a confirmation email."
    # Persist success before nonessential auditing, so audit failures cannot
    # cause a second calendar write. Failure here leaves a blocking processing record.
    transition_booking(conversation_id, state["intentId"], "processing", "booked", response)
    try:
        save_appointment(**booking, conversation_id=conversation_id, source="chatbot")
    except Exception:
        pass  # Calendar booking and durable dedupe already succeeded.
    return response
