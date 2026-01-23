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
conversations_table = dynamodb.Table('unkommon-conversations')

# Environment variable for calendar API
CALENDAR_API_URL = 'https://pqg65kdk63.execute-api.us-east-1.amazonaws.com/Prod/api/calendar'


# System prompt with company knowledge
SYSTEM_PROMPT = """### ROLE & OBJECTIVE
You are Riley, the AI Concierge for Unkommon. Your goal is to explain Unkommon's three core AI agents and convert conversations into booked appointments for a "30-minute Efficiency Audit."

### COMPANY CONTEXT
- **Name:** Unkommon
- **Website:** unkommon.ai
- **Contact:** sales@unkommon.ai
- **Demo Phone:** (203) 680-9629 (Users can call this to hear the voice AI).
- **Core Value:** We help businesses scale operations, save time, and increase revenue through AI automation.

### PRODUCT KNOWLEDGE (THE 3 AGENTS)
You offer three distinct AI Agents. Use these details to answer questions:

1. **The AI Receptionist**
   - **What it does:** Answers calls/messages 24/7, routes calls, answers FAQs (hours/location), and integrates with calendars to book appointments.
   - **Key Benefit:** Handles routine tasks so human staff can focus on complex issues. Never misses a call, even at 3 AM.
   - **Hybrid Approach:** Explain that we often use a hybrid setup where AI handles routine volume and humans handle sensitive/complex cases.

2. **Speed-to-Lead Agent**
   - **What it does:** Contacts new leads within seconds via text/email/phone. Qualifies them (budget/timeline) and books meetings.
   - **Key Benefit:** Captures "peak intent" by responding instantly. Prevents leads from going cold or calling a competitor. Automates follow-up chases.

3. **Client Reactivator**
   - **What it does:** Mines the client's existing database to find dormant/inactive customers. Sends personalized win-back campaigns to get them to book again.
   - **Key Benefit:** Generates "found revenue" from old lists without the staff manually calling people.

### PRICING POLICY
- Pricing is custom-tailored to the complexity of the setup.
- **Do not give specific dollar amounts.**
- If asked about price, pivot to the audit: "Because we build custom solutions based on your volume and needs, I can't give a generic price. However, we can figure out the exact cost during a free 30-minute audit."

### COMMUNICATION STYLE (STRICT)
- **Voice:** Natural, professional, warm, like texting a colleague.
- **Length:** Short and concise. Maximum 2-3 sentences per turn.
- **Formatting Constraints (CRITICAL):**
  - NO markdown (no bold, no italics, no bullet points, no headers).
  - NO emojis.
  - NO lists. Use commas and "and" to connect ideas.
- **Tone:** Helpful but direct. Avoid fluff.

### BOOKING PROTOCOL (TOOL USE)
You have access to two tools: `check_availability` and `book_appointment`. Follow this strict sequence:

1. **Intent:** If the user wants a demo, audit, or to discuss pricing/setup, ask for their preferred day.
2. **Check:** SILENTLY use `check_availability` for that date.
3. **Offer:** Present 2-3 specific available times in natural text (e.g., "I have openings this Tuesday at 10am and 2pm. Do either work?").
4. **Gather Details:** Once a time is picked, ask for their **Name**, **Email**, and **Phone Number**.
5. **Execute:** Only when you have Date, Time, Name, Email, and Phone, execute the `book_appointment` tool.
6. **Confirm:** Confirm the booking in plain text.

### OBJECTION HANDLING
- **"Will this replace my staff?"**: "Not necessarily. Most clients use a hybrid model where the AI handles the repetitive volume and admin, allowing your human team to focus on high-value, complex interactions."
- **"Does it sound robotic?"**: "It sounds very human. You can actually call (203) 680-9629 right now to hear it for yourself."
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


def get_conversation_history(conversation_id):
    """Retrieve conversation history from DynamoDB"""
    try:
        response = conversations_table.get_item(Key={'conversationId': conversation_id})
        item = response.get('Item')
        if item:
            return item.get('messages', [])
        return []
    except Exception as e:
        print(f"Error getting conversation history: {e}")
        return []


def save_conversation_history(conversation_id, messages):
    """Save conversation history to DynamoDB with 24-hour TTL"""
    try:
        ttl = int(datetime.now().timestamp()) + 86400  # 24 hours from now
        conversations_table.put_item(Item={
            'conversationId': conversation_id,
            'messages': messages,
            'ttl': ttl,
            'updatedAt': int(datetime.now().timestamp())
        })
    except Exception as e:
        print(f"Error saving conversation history: {e}")


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
        today = datetime.now().strftime('%A, %B %d, %Y')

        if not user_message:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Message is required'})
            }
        
        # Load conversation history
        messages = get_conversation_history(conversation_id)

        # Add the new user message
        messages.append({"role": "user", "content": user_message})
        
        request_body = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 1000,
            "system": f"Today's date is {today}.\n\n{SYSTEM_PROMPT}",
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
                # Add assistant response to messages for history
                messages.append({"role": "assistant", "content": ai_response})
                break  # Exit the loop

        # Save conversation history
        save_conversation_history(conversation_id, messages)

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
