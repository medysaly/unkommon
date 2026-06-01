"""Chat service: the brain of the Unkommon chatbot.

Receives a user message, runs the LLM tool-calling loop on Bedrock,
persists conversation state, and notifies sales of any captured leads.

This module depends on the domain layer (system_prompt, tools) for the
static knowledge that defines the chatbot, and on the data layer
(conversations_repo, bedrock_client, calendar_client, email_client) for
every external system interaction.

The handler layer is the only thing that calls this service. The service
does not know about HTTP, CORS, or AWS Lambda event shapes.
"""

import re
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

from domain.system_prompt import SYSTEM_PROMPT
from domain.tools import TOOLS
from domain.intent_trie import build_intent_trie
from data.conversations_repo import get_conversation_history, save_conversation_history
from data.bedrock_client import invoke_chat_model
from data.calendar_client import check_availability, book_appointment
from data.email_client import send_lead_email


# Track bookings per conversation to prevent abuse via chatbot
_conversation_bookings = {}  # conversation_id -> count
MAX_BOOKINGS_PER_CONVERSATION = 1

# Build the FAQ intent Trie once per warm Lambda instance, reused across requests
_intent_trie  = build_intent_trie()

# Track conversations we've already notified about to avoid duplicate emails
_notified_conversations = set()


def validate_tool_params(tool_name, tool_input):
    """Validate tool parameters server-side, independent of LLM output."""
    if tool_name == "check_availability":
        date = tool_input.get('date', '')
        if not re.match(r'^\d{4}-\d{2}-\d{2}$', date):
            return "Invalid date format. Use YYYY-MM-DD."
        try:
            datetime.strptime(date, '%Y-%m-%d')
        except ValueError:
            return "Invalid date."
    elif tool_name == "book_appointment":
        date = tool_input.get('date', '')
        time_val = tool_input.get('time', '')
        email = tool_input.get('email', '')
        name = tool_input.get('name', '')
        phone = tool_input.get('phone', '')
        if not re.match(r'^\d{4}-\d{2}-\d{2}$', date):
            return "Invalid date format."
        if not re.match(r'^\d{2}:\d{2}$', time_val):
            return "Invalid time format."
        if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
            return "Invalid email address."
        if not name.strip() or len(name) > 100:
            return "Name is required and must be under 100 characters."
        # Sanitize phone to digits and formatting chars only
        tool_input['phone'] = re.sub(r'[^\d+\-() ]', '', phone)[:20]
        tool_input['name'] = name.strip()[:100]
    return None


def execute_tool(tool_name, tool_input, conversation_id=None):
    """Execute a tool call from the LLM. Returns a string result for the LLM."""
    print(f"Tool called: {tool_name}")

    # Server-side parameter validation (independent of LLM)
    validation_error = validate_tool_params(tool_name, tool_input)
    if validation_error:
        return validation_error

    try:
        if tool_name == "check_availability":
            print(f"Checking availability for date: {tool_input['date']}")
            slots = check_availability(tool_input['date'])
            if slots:
                return f"Available times on {tool_input['date']}: {', '.join(slots)}"
            return f"No available slots on {tool_input['date']}"

        elif tool_name == "book_appointment":
            # Enforce one booking per conversation to prevent abuse
            if conversation_id:
                count = _conversation_bookings.get(conversation_id, 0)
                if count >= MAX_BOOKINGS_PER_CONVERSATION:
                    return "You already have an appointment booked. If you need to reschedule, please contact us at contact@unkommon.ai."
            print(f"Booking appointment")
            data = book_appointment(tool_input)
            if data.get("success"):
                # Track successful booking
                if conversation_id:
                    _conversation_bookings[conversation_id] = _conversation_bookings.get(conversation_id, 0) + 1
                email_status = "Confirmation email sent." if data.get("emailSent") else "Note: confirmation email could not be sent."
                return f"Appointment booked successfully for {tool_input['name']} on {tool_input['date']} at {tool_input['time']}. {email_status}"
            return f"Failed to book: {data.get('error', 'Unknown error')}"

    except Exception:
        return "The calendar service is temporarily unavailable. Please try again."


def format_phone(phone):
    """Format phone number to XXX-XXX-XXXX."""
    digits = re.sub(r'\D', '', phone)
    if len(digits) == 11 and digits[0] == '1':
        digits = digits[1:]
    if len(digits) == 10:
        return f"{digits[:3]}-{digits[3:6]}-{digits[6:]}"
    return phone


def notify_chatbot_lead(user_message, ai_response, conversation_id):
    """Email a lead notification to sales when the chatbot detects contact info or interest.
    One email per conversation (in-memory dedupe within warm Lambda instance)."""

    if conversation_id in _notified_conversations:
        return

    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    email_match = re.search(email_pattern, user_message)
    email = email_match.group(0) if email_match else None

    phone_pattern = r'[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{3,4}'
    phone_match = re.search(phone_pattern, user_message)
    phone = format_phone(phone_match.group(0)) if phone_match else None

    interest_keywords = [
        'book', 'schedule', 'appointment', 'call me', 'contact me',
        'interested', 'sign up', 'demo', 'trial', 'pricing',
        'more info', 'tell me more', 'learn more', 'get started'
    ]
    if not (email or phone or any(k in user_message.lower() for k in interest_keywords)):
        return

    body = (
        "New chatbot lead captured.\n\n"
        f"Email:  {email or 'not provided'}\n"
        f"Phone:  {phone or 'not provided'}\n"
        f"Conversation ID: {conversation_id}\n\n"
        f"Last user message:\n{user_message[:500]}\n\n"
        f"Assistant response:\n{ai_response[:500]}\n"
    )
    send_lead_email(f"Chatbot lead: {email or phone or 'interested visitor'}", body)
    _notified_conversations.add(conversation_id)



def process_chat_message(user_message, conversation_id):
    """Process a chat message and return the AI response text.

    This is the main entry point for the service layer. The handler calls
    this after running its guards and parsing the request.

    Args:
        user_message: the user's chat message (already validated by handler)
        conversation_id: the conversation ID (already validated by handler)

    Returns:
        str: the AI's text response
    """
    # Load conversation history from DynamoDB and append the new user message
    messages = get_conversation_history(conversation_id)
    messages.append({"role": "user", "content": user_message})

    # FAQ fast path: if the message matches a known intent, answer it from the
    # Trie and skip the Bedrock call entirely. We still persist the turn and run
    # lead capture, so conversation state and sales notifications are unchanged.

    faq_response = _intent_trie.match(user_message)
    if faq_response is not None:
        messages.append({"role": "assistant", "content": faq_response})
        save_conversation_history(conversation_id, messages)
        notify_chatbot_lead(user_message, faq_response, conversation_id)
        return faq_response

    # Generate calendar reference for the next 14 days so Claude can convert
    # relative dates like "next Friday" into YYYY-MM-DD format
    now_et = datetime.now(ZoneInfo('America/New_York'))
    today = now_et.strftime('%A, %B %d, %Y')
    calendar_lines = []
    for i in range(14):
        day = now_et + timedelta(days=i)
        label = " (today)" if i == 0 else " (tomorrow)" if i == 1 else ""
        calendar_lines.append(f"{day.strftime('%A')} = {day.strftime('%Y-%m-%d')}{label}")
    calendar_reference = "\n".join(calendar_lines)


    # Build the Bedrock request body (system prompt + calendar context + history + tools)
    request_body = {
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 1000,
        "system": [
            {
                "type": "text",
                "text": SYSTEM_PROMPT,
                "cache_control": {"type": "ephemeral"}
            },
            {
                "type": "text",
                "text": f"Today is {today}.\n\nCALENDAR REFERENCE (use for date conversion):\n{calendar_reference}"
            }
        ],
        "messages": messages,
        "tools": TOOLS,
        "temperature": 0.7
    }

    # Tool-calling loop: keep going until Claude returns a final text response
    ai_response = ""
    max_iterations = 5  # Safety limit to prevent infinite loops

    for _ in range(max_iterations):
        # Call Claude via Bedrock (through the data layer)
        response_body = invoke_chat_model(request_body)
        stop_reason = response_body.get('stop_reason', '')

        if stop_reason == 'tool_use':
            # Claude wants to use a tool. Execute each tool call and
            # feed the results back in the next iteration.
            assistant_content = response_body['content']
            messages.append({"role": "assistant", "content": assistant_content})

            tool_results = []
            for block in assistant_content:
                if block.get('type') == 'tool_use':
                    tool_name = block['name']
                    tool_input = block['input']
                    tool_id = block['id']

                    result = execute_tool(tool_name, tool_input, conversation_id)

                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": tool_id,
                        "content": result
                    })

            messages.append({"role": "user", "content": tool_results})
            request_body["messages"] = messages

        else:
            # Claude gave a final response (end_turn). Extract the text.
            for block in response_body['content']:
                if block.get('type') == 'text':
                    ai_response = block['text']
                    break
            messages.append({"role": "assistant", "content": ai_response})
            break

    # Save conversation history back to DynamoDB
    save_conversation_history(conversation_id, messages)

    # Try to capture lead if user shows interest
    notify_chatbot_lead(user_message, ai_response, conversation_id)

    return ai_response
