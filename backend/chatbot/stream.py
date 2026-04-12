import json
import os
import re
import boto3
import uuid
import requests
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from app import (
    SYSTEM_PROMPT, TOOLS, execute_tool,
    get_conversation_history, save_conversation_history,
    save_chatbot_lead
)

bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-east-1')

CALENDAR_API_URL = os.environ['CALENDAR_API_URL']
ALLOWED_ORIGINS = {'https://unkommon.ai', 'https://www.unkommon.ai'}


def handler(event, response_stream, context):
    """
    Streaming Lambda handler for chatbot.
    Uses Bedrock's invoke_model_with_response_stream for real-time text streaming.
    """

    # Set content type for SSE
    response_stream.content_type = "text/event-stream"

    try:
        # Origin validation — only allow requests from the frontend
        headers = event.get('headers', {})
        origin = headers.get('origin', '') or headers.get('Origin', '')
        if not origin or origin not in ALLOWED_ORIGINS:
            response_stream.write(f"data: {json.dumps({'error': 'Forbidden'})}\n\n".encode())
            response_stream.close()
            return

        # Parse request
        body = json.loads(event.get('body', '{}'))
        user_message = body.get('message', '').strip()[:2000]

        # Validate conversationId is a valid UUID format
        raw_cid = body.get('conversationId', '')
        if raw_cid and re.match(r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', raw_cid, re.IGNORECASE):
            conversation_id = raw_cid
        else:
            conversation_id = str(uuid.uuid4())

        if not user_message:
            response_stream.write(f"data: {json.dumps({'error': 'Message is required'})}\n\n".encode())
            response_stream.close()
            return

        # Send conversation ID immediately
        response_stream.write(f"data: {json.dumps({'conversationId': conversation_id})}\n\n".encode())

        # Generate calendar reference
        now_et = datetime.now(ZoneInfo('America/New_York'))
        today = now_et.strftime('%A, %B %d, %Y')
        calendar_lines = []
        for i in range(14):
            day = now_et + timedelta(days=i)
            label = " (today)" if i == 0 else " (tomorrow)" if i == 1 else ""
            calendar_lines.append(f"{day.strftime('%A')} = {day.strftime('%Y-%m-%d')}{label}")
        calendar_reference = "\n".join(calendar_lines)

        # Load conversation history
        messages = get_conversation_history(conversation_id)
        messages.append({"role": "user", "content": user_message})

        system_prompt = f"Today is {today}.\n\nCALENDAR REFERENCE (use for date conversion):\n{calendar_reference}\n\n{SYSTEM_PROMPT}"

        request_body = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 1000,
            "system": system_prompt,
            "messages": messages,
            "tools": TOOLS,
            "temperature": 0.7
        }

        # Tool use loop (non-streamed) - resolve all tool calls first
        max_iterations = 5
        for _ in range(max_iterations):
            response = bedrock_runtime.invoke_model(
                modelId='anthropic.claude-haiku-4-5-20251001-v1:0',
                body=json.dumps(request_body)
            )
            response_body = json.loads(response['body'].read())
            stop_reason = response_body.get('stop_reason', '')

            if stop_reason == 'tool_use':
                assistant_content = response_body['content']
                messages.append({"role": "assistant", "content": assistant_content})

                tool_results = []
                for block in assistant_content:
                    if block.get('type') == 'tool_use':
                        result = execute_tool(block['name'], block['input'], conversation_id)
                        tool_results.append({
                            "type": "tool_result",
                            "tool_use_id": block['id'],
                            "content": result
                        })

                messages.append({"role": "user", "content": tool_results})
                request_body["messages"] = messages
            else:
                # No tool use needed - break and stream the final response
                break

        # If the last response was already a final text (from tool loop), extract and stream it
        if stop_reason != 'tool_use':
            # We already have the final response, stream it character by character
            ai_response = ""
            for block in response_body['content']:
                if block.get('type') == 'text':
                    ai_response = block['text']
                    break

            # Stream the text in small chunks for smooth rendering
            chunk_size = 3
            for i in range(0, len(ai_response), chunk_size):
                chunk = ai_response[i:i + chunk_size]
                response_stream.write(f"data: {json.dumps({'text': chunk})}\n\n".encode())

        else:
            # Final streaming call (after tool use resolved)
            # Use streaming API for the final response
            streaming_response = bedrock_runtime.invoke_model_with_response_stream(
                modelId='anthropic.claude-haiku-4-5-20251001-v1:0',
                body=json.dumps(request_body)
            )

            ai_response = ""
            for event in streaming_response['body']:
                chunk = json.loads(event['chunk']['bytes'])
                if chunk.get('type') == 'content_block_delta':
                    text = chunk['delta'].get('text', '')
                    if text:
                        ai_response += text
                        response_stream.write(f"data: {json.dumps({'text': text})}\n\n".encode())

        # Save conversation history
        messages.append({"role": "assistant", "content": ai_response})
        save_conversation_history(conversation_id, messages)

        # Capture leads
        save_chatbot_lead(user_message, ai_response, conversation_id)

        # Send done signal
        response_stream.write(f"data: {json.dumps({'done': True, 'conversationId': conversation_id})}\n\n".encode())

    except Exception as e:
        print(f"Streaming error: {e}")
        response_stream.write(f"data: {json.dumps({'error': 'Failed to process request'})}\n\n".encode())

    response_stream.close()
