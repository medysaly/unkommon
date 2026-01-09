import json
import boto3
import os
import uuid
from datetime import datetime

# Initialize Bedrock client
bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-east-1')

# System prompt with company knowledge
SYSTEM_PROMPT = """You are an AI assistant for Unkommon, a company that provides AI automation solutions for businesses.

Company Information:
- Company: Unkommon (formerly Business Automated)
- Website: unkommon.ai
- Contact: sales@unkommon.ai
- Phone: (203) XXX-XXXX (Demo AI Receptionist available 24/7)

Our Solutions:

1. AI Receptionist
   - Answers calls 24/7 with natural, human-like voice
   - Books appointments automatically
   - Handles customer inquiries
   - Never misses a call
   - Integrates with existing calendar systems

2. Speed-to-Lead
   - Instant response to new leads (under 1 minute)
   - Automatic follow-up via phone, email, or SMS
   - Increases conversion rates dramatically
   - Works while you sleep

3. AI Booking System
   - Automated appointment scheduling
   - Calendar integration
   - Reminder notifications
   - Reduces no-shows

4. Social Media Bot
   - Automated responses on social platforms
   - Lead generation from social media
   - 24/7 engagement

Value Proposition:
- Save time on repetitive tasks
- Never miss leads or appointments
- Scale customer service without hiring
- Increase revenue through faster response times

How to Get Started:
1. Test our demo AI Receptionist: Call (203) XXX-XXXX
2. Schedule a free 30-minute efficiency audit
3. Contact us via the contact form or email sales@unkommon.ai

Be helpful, professional, and guide users toward booking a consultation or testing the demo. If asked about pricing, explain that we offer custom solutions and recommend scheduling an audit call to discuss their specific needs.
"""

def lambda_handler(event, context):
    """
    Lambda handler for chatbot API
    Expects: { "message": "user message", "conversationId": "optional-uuid" }
    Returns: { "response": "AI response", "conversationId": "uuid", "timestamp": 123456 }
    """
    
    try:
        # Parse request body
        body = json.loads(event['body']) if isinstance(event.get('body'), str) else event.get('body', {})
        
        user_message = body.get('message', '').strip()
        conversation_id = body.get('conversationId') or str(uuid.uuid4())
        
        if not user_message:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Message is required'})
            }
        
        # Prepare Claude API request
        # For now, we'll use a simple single-turn conversation
        # In production, you'd want to store conversation history in DynamoDB
        
        request_body = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 1000,
            "system": SYSTEM_PROMPT,
            "messages": [
                {
                    "role": "user",
                    "content": user_message
                }
            ],
            "temperature": 0.7
        }
        
        # Call Claude via Bedrock
        response = bedrock_runtime.invoke_model(
            modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
            body=json.dumps(request_body)
        )
        
        # Parse response
        response_body = json.loads(response['body'].read())
        ai_response = response_body['content'][0]['text']
        
        # Return successful response
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            'body': json.dumps({
                'response': ai_response,
                'conversationId': conversation_id,
                'timestamp': int(datetime.now().timestamp() * 1000)
            })
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Failed to process request',
                'message': str(e)
            })
        }
