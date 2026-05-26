"""HTTP handler for the chatbot API.

Receives an API Gateway event, runs the request-level security guards,
delegates the chat work to the service layer, and formats the response.

This module is intentionally thin. It does not contain business logic,
LLM calls, or database access. All of that lives in the service and data
layers and is called through process_chat_message().
"""

import json
import re
import uuid
from datetime import datetime

from handlers.guards import check_global_budget, check_prompt_injection, get_cors_origin
from services.chat_service import process_chat_message

def handle_chat_request(event, context):
    """Process an incoming chat API request and return an HTTP response.

    This is the entry point called from app.py's lambda_handler shim.
    """
    cors_origin = get_cors_origin(event)

    try:
        # Parse request body
        body = json.loads(event['body']) if isinstance(event.get('body'), str) else event.get('body', {})
        user_message = body.get('message', '').strip()[:2000]

        # GUARD: hourly request budget (prevents cost abuse)
        if not check_global_budget():
            return _http_response(
                429,
                {'error': 'Service is temporarily busy. Please try again in a few minutes.'},
                cors_origin,
            )

        # GUARD: prompt injection detection
        if check_prompt_injection(user_message):
            return _http_response(
                200,
                {
                    'response': "I'm here to help you learn about Unkommon's AI engineering services. What can I help you with?",
                    'conversationId': body.get('conversationId', str(uuid.uuid4())),
                    'timestamp': int(datetime.now().timestamp() * 1000),
                },
                cors_origin,
            )

        # Validate conversationId is a valid UUID, otherwise generate a new one
        raw_cid = body.get('conversationId', '')
        if raw_cid and re.match(
            r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
            raw_cid,
            re.IGNORECASE,
        ):
            conversation_id = raw_cid
        else:
            conversation_id = str(uuid.uuid4())

        # Validate message is non-empty
        if not user_message:
            return _http_response(400, {'error': 'Message is required'}, cors_origin)

        # Delegate the actual chat work to the service layer
        ai_response = process_chat_message(user_message, conversation_id)

        # Return success response
        return _http_response(
            200,
            {
                'response': ai_response,
                'conversationId': conversation_id,
                'timestamp': int(datetime.now().timestamp() * 1000),
            },
            cors_origin,
        )

    except Exception as e:
        print(f"Error: {str(e)}")
        return _http_response(500, {'error': 'Failed to process request'}, cors_origin)

def _http_response(status_code, body_dict, cors_origin):
    """Build an API Gateway HTTP response with standard CORS headers."""
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': cors_origin,
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
        'body': json.dumps(body_dict),
    }
