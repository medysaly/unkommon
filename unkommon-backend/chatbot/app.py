import json
import re
import boto3
import os
import uuid
import requests
from datetime import datetime

# Initialize Bedrock client
bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-east-1')


# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb')
leads_table = dynamodb.Table('unkommon-leads')

# Environment variable for calendar API
CALENDAR_API_URL = 'https://pqg65kdk63.execute-api.us-east-1.amazonaws.com/Prod/api/calendar'


# System prompt with company knowledge
SYSTEM_PROMPT = """Your name is Riley and you work at Unkommon, helping businesses automate their operations with AI solutions.

About Unkommon:
Unkommon helps businesses save time and increase revenue through AI automation. We specialize in making sure you never miss a customer call, lead, or appointment. You can reach us at sales@unkommon.ai or visit our website at unkommon.ai.

What We Offer:
We have four main solutions. The AI Receptionist answers your business calls 24/7 with a natural human voice, books appointments automatically, and integrates with your calendar so you never miss a call even at 3am. Our Speed-to-Lead system responds to new leads in under a minute via phone, email, or text, which dramatically increases conversion rates. The AI Booking System handles all your appointment scheduling, sends reminders, and reduces no-shows. Finally, our Social Media Bot engages with customers on social platforms around the clock and generates leads while you sleep.

The Big Picture:
Basically, we help you scale your customer service without hiring more people, save tons of time on repetitive tasks, and make more money by responding faster to opportunities. Most of our clients see results within the first week.

Getting Started:
If someone wants to try it out, they can call (203) 680-9629 anytime to talk to our demo AI Receptionist and see how natural it sounds. We also offer a free 30-minute efficiency audit where we analyze their business and show exactly how much time and money they could save. They can book that through the contact form on the website or just email sales@unkommon.ai.

Pricing:
We create custom solutions for each business, so pricing depends on their specific needs. The best approach is to schedule that free audit call so we can give them an accurate quote based on their situation.

How to Communicate:
Talk like a real person, not a robot or corporate website. Keep your responses short and conversational, usually 2-3 sentences unless someone asks for details. Never use markdown formatting like hashtags, asterisks, dashes, or numbered lists. Never use emojis. Write naturally like you're texting a colleague. Be warm, friendly, and helpful, but stay professional. Get to the point quickly. If you need to mention multiple things, use commas and the word "and" instead of making lists. Your goal is to help people understand how Unkommon can help their business and guide them toward trying the demo or booking a consultation.

When someone wants to book a call, schedule a demo, or shows serious interest, always ask for their name, email, and phone number so you can have someone reach out to them. Say something natural like "I'd love to have someone from the team reach out to you. Could you share your name, email, and best phone number to reach you?" Once they provide their info, confirm you've noted it down and someone will contact them soon.

"""

# Define tools for the AI to use
TOOLS = [
    {
        "name": "check_availability",
        "description": "Check available appointment slots for a specific date. Use this when someone wants to book a call or see when you're available.",
        "input_schema": {
            "type": "object",
            "properties": {
                "date": {
                    "type": "string",
                    "description": "The date to check in YYYY-MM-DD format"
                }
            },
            "required": ["date"]
        }
    },
    {
        "name": "book_appointment",
        "description": "Book a 30-minute consultation appointment. Use this after getting the customer's name, email, phone, and preferred time.",
        "input_schema": {
            "type": "object",
            "properties": {
                "date": {"type": "string", "description": "Date in YYYY-MM-DD format"},
                "time": {"type": "string", "description": "Time in HH:MM format (24-hour)"},
                "name": {"type": "string", "description": "Customer's full name"},
                "email": {"type": "string", "description": "Customer's email address"},
                "phone": {"type": "string", "description": "Customer's phone number"}
            },
            "required": ["date", "time", "name", "email", "phone"]
        }
    }
]

def execute_tool(tool_name, tool_input):
    """Execute a tool and return the result"""
    try:
        if tool_name == "check_availability":
            response = requests.get(
                f"{CALENDAR_API_URL}/availability",
                params={"date": tool_input["date"]}
            )
            data = response.json()
            slots = data.get("availableSlots", [])
            if slots:
                return f"Available times on {tool_input['date']}: {', '.join(slots)}"
            return f"No available slots on {tool_input['date']}"
            
        elif tool_name == "book_appointment":
            response = requests.post(
                f"{CALENDAR_API_URL}/book",
                json=tool_input
            )
            data = response.json()
            if data.get("success"):
                return f"Appointment booked successfully for {tool_input['name']} on {tool_input['date']} at {tool_input['time']}"
            return f"Failed to book: {data.get('error', 'Unknown error')}"
            
    except Exception as e:
        return f"Error: {str(e)}"


def should_capture_lead(user_message, ai_response):
    """Detect if user is showing interest and should be captured as a lead"""
    interest_keywords = [
        'book', 'schedule', 'appointment', 'call', 'demo', 'interested',
        'pricing', 'price', 'cost', 'how much', 'sign up', 'get started',
        'contact', 'email', 'phone', 'reach out', 'audit', 'consultation'
    ]
    
    message_lower = user_message.lower()
    return any(keyword in message_lower for keyword in interest_keywords)


# Save lead to DynamoDB

def save_chatbot_lead(user_message, ai_response, conversation_id):
    """
    Save chatbot lead to DynamoDB when user provides contact info
    Extracts email, phone, and name from the message
    """
    
    # Extract email using regex
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    email_match = re.search(email_pattern, user_message)
    email = email_match.group(0) if email_match else None
    
    # Extract phone using regex (various formats)
    phone_pattern = r'[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{3,4}'
    phone_match = re.search(phone_pattern, user_message)
    phone = phone_match.group(0) if phone_match else None
    
    # Check for interest keywords
    interest_keywords = [
        'book', 'schedule', 'appointment', 'call me', 'contact me',
        'interested', 'sign up', 'demo', 'trial', 'pricing',
        'more info', 'tell me more', 'learn more', 'get started'
    ]
    message_lower = user_message.lower()
    is_interested = any(keyword in message_lower for keyword in interest_keywords)
    
    # Only save if we have contact info OR user shows interest
    if email or phone or is_interested:
        lead_id = str(uuid.uuid4())
        timestamp = int(datetime.now().timestamp())
        
        item = {
            'leadId': lead_id,
            'createdAt': timestamp,
            'name': 'Chatbot User',
            'email': email if email else 'pending',
            'phone': phone if phone else 'N/A',
            'message': user_message,
            'primaryBottleneck': 'N/A',
            'source': 'chatbot',
            'appointmentBooked': False,
            'appointmentTime': None,
            'metadata': {
                'conversationId': conversation_id,
                'aiResponse': ai_response,
                'hasEmail': bool(email),
                'hasPhone': bool(phone)
            }
        }
        
        try:
            leads_table.put_item(Item=item)
            print(f"✅ Chatbot lead captured: {lead_id} | Email: {email} | Phone: {phone}")
            return lead_id
        except Exception as e:
            print(f"❌ Failed to save chatbot lead: {e}")
            return None
    
    return None

    
    # Check if user message shows interest
    message_lower = user_message.lower()
    is_interested = any(keyword in message_lower for keyword in interest_keywords)
    
    if is_interested:
        lead_id = str(uuid.uuid4())
        timestamp = int(datetime.now().timestamp())
        
        item = {
            'leadId': lead_id,
            'createdAt': timestamp,
            'name': 'Chatbot User',
            'email': 'pending@chatbot.com',
            'phone': 'N/A',
            'message': user_message,
            'primaryBottleneck': 'N/A',
            'source': 'chatbot',
            'appointmentBooked': False,
            'appointmentTime': None,
            'metadata': {
                'conversationId': conversation_id,
                'aiResponse': ai_response
            }
        }
        
        try:
            leads_table.put_item(Item=item)
            print(f"✅ Chatbot lead captured: {lead_id}")
            return lead_id
        except Exception as e:
            print(f"❌ Failed to save chatbot lead: {e}")
            return None
    
    return None

# Lambda handler
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
        
        messages = [{"role": "user", "content": user_message}]
        
        request_body = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 1000,
            "system": SYSTEM_PROMPT,
            "messages": messages,
            "tools": TOOLS,
            "temperature": 0.7
        }

        
        # Tool calling loop - keeps going until Claude gives a final text response
        ai_response = ""
        max_iterations = 5  # Safety limit to prevent infinite loops
        
        for _ in range(max_iterations):
            # Call Claude via Bedrock
            response = bedrock_runtime.invoke_model(
                modelId='global.anthropic.claude-sonnet-4-5-20250929-v1:0',
                body=json.dumps(request_body)
            )
            
            response_body = json.loads(response['body'].read())
            stop_reason = response_body.get('stop_reason', '')
            
            # Check if Claude wants to use a tool
            if stop_reason == 'tool_use':
                # Claude wants to use a tool - find the tool_use block
                assistant_content = response_body['content']
                messages.append({"role": "assistant", "content": assistant_content})
                
                # Process each tool use
                tool_results = []
                for block in assistant_content:
                    if block.get('type') == 'tool_use':
                        tool_name = block['name']
                        tool_input = block['input']
                        tool_id = block['id']
                        
                        # Execute the tool
                        result = execute_tool(tool_name, tool_input)
                        
                        tool_results.append({
                            "type": "tool_result",
                            "tool_use_id": tool_id,
                            "content": result
                        })
                
                # Add tool results to messages for next iteration
                messages.append({"role": "user", "content": tool_results})
                request_body["messages"] = messages
                
            else:
                # Claude gave a final response (end_turn) - extract text
                for block in response_body['content']:
                    if block.get('type') == 'text':
                        ai_response = block['text']
                        break
                break  # Exit the loop
        
        # Try to capture lead if user shows interest
        save_chatbot_lead(user_message, ai_response, conversation_id)



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
