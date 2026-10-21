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

import json
import re
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

from domain.system_prompt import SYSTEM_PROMPT
from domain.tools import TOOLS
from domain.intent_trie import build_intent_trie
from domain.response_format import format_response
from data.conversations_repo import get_conversation_history, save_conversation_history
from data.bedrock_client import invoke_chat_model
from data.calendar_client import check_availability
from data.email_client import send_lead_email
from data.leads_repo import save_lead
from services import booking_flow

# Build the FAQ intent Trie once per warm Lambda instance, reused across requests
_intent_trie  = build_intent_trie()

# Track conversations we've already notified about to avoid duplicate emails
_notified_conversations = set()


def validate_tool_params(tool_name, tool_input):
    """Validate tool parameters server-side, independent of LLM output."""
    if not isinstance(tool_input, dict):
        return "Tool input must be an object."
    if tool_name == "prepare_booking":
        return booking_flow.validate_booking(tool_input)
    if tool_name != "check_availability":
        return "Unsupported tool. The model cannot submit a booking."
    if tool_name == "check_availability":
        date = tool_input.get('date', '')
        if not isinstance(date, str) or not re.fullmatch(r'\d{4}-\d{2}-\d{2}', date):
            return "Invalid date format. Use YYYY-MM-DD."
        try:
            datetime.strptime(date, '%Y-%m-%d')
        except ValueError:
            return "Invalid date."
    return None


def execute_tool(tool_name, tool_input, conversation_id=None):
    """Execute an allowed read/preparation tool and return a structured result."""
    print(f"Tool called: {tool_name}")

    # Server-side parameter validation (independent of LLM)
    validation_error = validate_tool_params(tool_name, tool_input)
    if validation_error:
        return {"error": validation_error}

    try:
        if tool_name == "check_availability":
            print(f"Checking availability for date: {tool_input['date']}")
            slots = check_availability(tool_input['date'])
            return {"date": tool_input['date'], "timezone": "America/New_York", "availableSlots": slots}

        elif tool_name == "prepare_booking":
            if not conversation_id:
                return {"error": "A conversation is required to prepare booking details."}
            return booking_flow.prepare_booking(conversation_id, tool_input)

    except Exception:
        return {"error": "The calendar service is temporarily unavailable. No booking was submitted."}


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

    # Persist the lead to DynamoDB so sales can query leads later,
    # not just rely on the email notification.
    save_lead(
        email=email,
        phone=phone,
        conversation_id=conversation_id,
        source="chatbot",
        last_user_message=user_message,
        assistant_response=ai_response,
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

    # Confirmation never passes through the LLM. The server binds the user's
    # exact code to persisted details and atomically claims the one allowed write.
    confirmation_response = booking_flow.handle_confirmation(conversation_id, user_message)
    if confirmation_response is not None:
        messages.append({"role": "assistant", "content": confirmation_response})
        save_conversation_history(conversation_id, messages)
        return confirmation_response

    # Only short, standalone opening FAQs use fixed answers. Follow-ups and
    # qualified questions need the model to account for the conversation.

    faq_response = _intent_trie.match(user_message, exact=True) if len(messages) == 1 else None
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
        "temperature": 0.4
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
            confirmation_recap = None
            for block in assistant_content:
                if block.get('type') == 'tool_use':
                    tool_name = block['name']
                    tool_input = block['input']
                    tool_id = block['id']

                    result = execute_tool(tool_name, tool_input, conversation_id)
                    if result.get("confirmation"):
                        confirmation_recap = result["confirmation"]

                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": tool_id,
                        "content": json.dumps(result),
                        "is_error": bool(result.get("error")),
                    })

            messages.append({"role": "user", "content": tool_results})
            if confirmation_recap:
                ai_response = confirmation_recap
                messages.append({"role": "assistant", "content": ai_response})
                break
            request_body["messages"] = messages

        else:
            # Claude gave a final response (end_turn). Extract the text.
            for block in response_body['content']:
                if block.get('type') == 'text':
                    ai_response = format_response(block['text'])
                    break
            messages.append({"role": "assistant", "content": ai_response})
            break

    if not ai_response:
        ai_response = "I couldn't complete that request. Nothing is confirmed. Please try a simpler question or use https://www.unkommon.ai/book-a-call."
        messages.append({"role": "assistant", "content": ai_response})

    # Save conversation history back to DynamoDB
    save_conversation_history(conversation_id, messages)

    # Try to capture lead if user shows interest
    notify_chatbot_lead(user_message, ai_response, conversation_id)

    return ai_response
