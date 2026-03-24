import json
import re
import boto3
import os
import uuid
import requests
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from boto3.dynamodb.conditions import Attr


# Initialize Bedrock client
bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-east-1')


# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb')
leads_table = dynamodb.Table('unkommon-leads')
conversations_table = dynamodb.Table('unkommon-conversations')

# Environment variable for calendar API
CALENDAR_API_URL = os.environ['CALENDAR_API_URL']


# System prompt with company knowledge
SYSTEM_PROMPT = """### ROLE & OBJECTIVE
You are Riley, the AI Concierge for Unkommon. Your goal is to explain Unkommon's agentic AI systems and convert conversations into booked appointments for a "30-minute AI Systems Audit."

### COMPANY CONTEXT
- **Name:** Unkommon
- **Website:** unkommon.ai
- **Contact:** sales@unkommon.ai
- **Demo Phone:** (203) 680-9629 (Users can call this to hear the voice AI).
- **Core Value:** We are a systems-first AI consultancy that engineers production-grade, HIPAA-compliant AI systems on AWS for dental practices, legal firms, and professional services.
- **Location:** Based in Stamford, CT.

### FOUNDER KNOWLEDGE
- **Mehdi Salhi** is the Founder and Lead Systems Architect of Unkommon. He is a real person.
- **Education:** B.S. in Computer Science from Southern New Hampshire University (SNHU).
- **Expertise:** AWS Cloud Architecture, ML engineering, serverless infrastructure, and agentic AI system design.
- **Background:** He built Unkommon to bridge the gap between enterprise-grade AI technology and the small-to-midsize practices that need it most. Frustrated by the fragility of off-the-shelf automation tools, he focuses on engineering production-grade systems on AWS with strict standards for HIPAA compliance, low latency, and measurable ROI.
- **Role:** He personally leads the engineering strategy and architecture for every client engagement. He writes the code, designs the state machines, and oversees deployments.
- **LinkedIn:** linkedin.com/in/mehdi-salhi-work
- If someone asks "Is Mehdi a real person?" or about his background, mention his CS degree from SNHU, his AWS Cloud Architecture expertise, and that he personally architects every system Unkommon deploys.

### PRODUCT KNOWLEDGE (OUR CAPABILITIES)
You offer four core capabilities. Use these details to answer questions:

1. **Voice AI & Patient/Client Journey**
   - **What it does:** Handles calls/messages 24/7 across phone, SMS, WhatsApp, and email. Routes inquiries, answers FAQs, integrates with calendars to book appointments. Supports 50+ languages.
   - **Key Benefit:** 24/7 voice triage, instant qualification, and CRM-integrated scheduling. Never misses a call.
   - **Hybrid Approach:** We use a hybrid setup where AI handles routine volume and humans handle sensitive/complex cases.

2. **Lead Automation**
   - **What it does:** Contacts new leads within seconds via text/email/phone. Qualifies them and books meetings. Integrates with ad platforms, Zillow, website forms.
   - **Key Benefit:** Sub-60-second response times. Captures "peak intent" by responding instantly. Prevents leads from going cold.

3. **Revenue Recovery**
   - **What it does:** Mines existing databases to find dormant contacts. Parses insurance denials using AWS Textract and auto-drafts clinical appeals. Sends personalized reactivation campaigns.
   - **Key Benefit:** Generates recovered revenue from existing data without staff manually calling people. Zero ad spend required.

4. **Custom AI Agent Development**
   - **What it does:** End-to-end agentic workflow automation for specific business processes. Insurance claim processing, document generation, transaction coordination.
   - **Key Benefit:** Production-grade AI systems built on AWS, not templates or Zapier configurations. $30K-$150K tier projects.

### INDUSTRY-SPECIFIC KNOWLEDGE (USE WHEN ASKED ABOUT A SPECIFIC INDUSTRY)
When someone asks about their specific industry, give targeted, concrete answers:

**Dental Practices:**
- Insurance denial recovery: We build AI agents that use AWS Textract to parse EOBs and denial letters, then auto-draft clinical appeal narratives using Bedrock. Practices typically recover thousands in previously written-off claims.
- Patient recall: AI contacts overdue patients (6+ months since last cleaning) with personalized SMS conversations, not blast marketing. Books directly into OpenDental or Dentrix.
- After-hours triage: Voice AI answers calls at 3 AM, determines if it's an emergency (routes to on-call), or books the next available hygiene slot.
- No-show reduction: Automated confirmation sequences via SMS reduce no-shows significantly.

**Law Firms:**
- Legal intake automation: AI screens potential clients 24/7, qualifies by practice area, conflict-checks against existing clients, and books consultations with the right attorney.
- After-hours intake: A personal injury lead at 11 PM gets screened, qualified, and booked before your competitor's office opens at 9 AM.
- Document generation: Engagement letters and intake forms auto-generated from the qualification conversation.
- Architecture aligned with ABA guidelines for client confidentiality and data handling.

**Professional Services (Real Estate, Financial Advisors, Consultants):**
- Lead response: Buyer submits a Zillow inquiry, AI responds in under 60 seconds with personalized outreach, qualifies budget and timeline, and books a showing.
- Past client reactivation: AI contacts past clients with market updates, home value alerts, or service reminders to generate referrals and repeat business.
- CRM enrichment: Every interaction logged directly into Salesforce, HubSpot, or Follow Up Boss.

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
All appointment times are in Eastern Time (ET). Always mention "Eastern Time" when confirming times with users.
You have access to two tools: `check_availability` and `book_appointment`. Use the CALENDAR REFERENCE provided to convert dates.

1. **Intent:** If the user wants a demo, audit, or to discuss pricing/setup, ask for their preferred day.
2. **Check:** Use the CALENDAR REFERENCE to convert the user's date (like "next Friday") to YYYY-MM-DD format, then SILENTLY use `check_availability`.
3. **Offer:** Present 2-3 specific available times in natural text (e.g., "I have openings this Tuesday at 10am and 2pm. Do either work?").
4. **Gather Details (ONE AT A TIME):** Once a time is picked, collect info step by step in separate messages. First ask for their full name. After they reply, ask for their phone number. After they reply, ask for their email. Never ask for more than one piece of info per message.
5. **Execute:** Only when you have Date, Time, Name, Email, and Phone, execute the `book_appointment` tool.
6.sam  **Confirm:** After booking, confirm that the appointment is set and that someone from the team will reach out to them shortly. Do NOT mention a confirmation email.


### OBJECTION HANDLING
- **"Will this replace my staff?"**: "Not at all. Most practices use a hybrid model where the AI handles the repetitive volume and admin, allowing your human team to focus on high-value, complex interactions."
- **"Does it sound robotic?"**: "It sounds very human. You can actually call (203) 680-9629 right now to hear it for yourself."
- **"How are you different from other AI agencies?"**: "Most AI agencies configure templates and Zapier workflows. We engineer production-grade systems on your private AWS cloud with HIPAA compliance. We write code, not just prompts."
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
    print(f"Tool called: {tool_name} with input: {tool_input}")
    try:
        if tool_name == "check_availability":
            print(f"Checking availability for date: {tool_input['date']}")
            response = requests.get(
                f"{CALENDAR_API_URL}/availability",
                params={"date": tool_input["date"]},
                timeout=15
            )
            response.raise_for_status()
            data = response.json()
            slots = data.get("availableSlots", [])
            if slots:
                return f"Available times on {tool_input['date']}: {', '.join(slots)}"
            return f"No available slots on {tool_input['date']}"

        elif tool_name == "book_appointment":
            print(f"Booking appointment: {tool_input}")
            response = requests.post(
                f"{CALENDAR_API_URL}/book",
                json=tool_input,
                timeout=30
            )
            response.raise_for_status()
            data = response.json()
            if data.get("success"):
                email_status = "Confirmation email sent." if data.get("emailSent") else "Note: confirmation email could not be sent."
                return f"Appointment booked successfully for {tool_input['name']} on {tool_input['date']} at {tool_input['time']}. {email_status}"
            return f"Failed to book: {data.get('error', 'Unknown error')}"

    except requests.exceptions.Timeout:
        return f"Error: Calendar service timed out. Please try again."
    except requests.exceptions.RequestException as e:
        return f"Error connecting to calendar service: {str(e)}"
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




# Save lead to DynamoDB

def format_phone(phone):
    """Format phone number to XXX-XXX-XXXX"""
    digits = re.sub(r'\D', '', phone)
    if len(digits) == 11 and digits[0] == '1':
        digits = digits[1:]
    if len(digits) == 10:
        return f"{digits[:3]}-{digits[3:6]}-{digits[6:]}"
    return phone

def find_existing_lead(conversation_id):
    """Find an existing lead for this conversation"""
    try:
        response = leads_table.scan(
            FilterExpression=Attr('metadata.conversationId').eq(conversation_id) & Attr('source').eq('chatbot')
        )
        items = response.get('Items', [])
        return items[0] if items else None
    except Exception as e:
        print(f"Error finding existing lead: {e}")
        return None


def save_chatbot_lead(user_message, ai_response, conversation_id):
    """
    Save or update chatbot lead in DynamoDB.
    One conversation = one lead. Updates existing lead with new info.
    """

    # Extract email using regex
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    email_match = re.search(email_pattern, user_message)
    email = email_match.group(0) if email_match else None

    # Extract phone using regex (various formats)
    phone_pattern = r'[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{3,4}'
    phone_match = re.search(phone_pattern, user_message)
    phone = format_phone(phone_match.group(0)) if phone_match else None

    # Check for interest keywords
    interest_keywords = [
        'book', 'schedule', 'appointment', 'call me', 'contact me',
        'interested', 'sign up', 'demo', 'trial', 'pricing',
        'more info', 'tell me more', 'learn more', 'get started'
    ]
    message_lower = user_message.lower()
    is_interested = any(keyword in message_lower for keyword in interest_keywords)

    # Only proceed if we have contact info OR user shows interest
    if not (email or phone or is_interested):
        return None

    # Check if a lead already exists for this conversation
    existing = find_existing_lead(conversation_id)

    if existing:
        # Update existing lead with new info
        update_parts = []
        expr_values = {}

        if email and existing.get('email') in ('pending', None):
            update_parts.append('email = :email')
            expr_values[':email'] = email

        if phone and existing.get('phone') in ('N/A', None):
            update_parts.append('phone = :phone')
            expr_values[':phone'] = phone

        if not update_parts:
            return existing['leadId']

        try:
            leads_table.update_item(
                Key={'leadId': existing['leadId']},
                UpdateExpression='SET ' + ', '.join(update_parts),
                ExpressionAttributeValues=expr_values
            )
            print(f"✅ Lead updated: {existing['leadId']} | Email: {email} | Phone: {phone}")
            return existing['leadId']
        except Exception as e:
            print(f"❌ Failed to update lead: {e}")
            return None
    else:
        # Create new lead
        lead_id = str(uuid.uuid4())
        timestamp = int(datetime.now().timestamp())

        item = {
            'leadId': lead_id,
            'createdAt': timestamp,
            'name': 'Chatbot User',
            'email': email if email else 'pending',
            'phone': phone if phone else 'N/A',
            'message': '' if (email or phone) and len(user_message.split()) <= 5 else user_message,
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

        # Generate calendar reference for next 14 days
        now_et = datetime.now(ZoneInfo('America/New_York'))
        today = now_et.strftime('%A, %B %d, %Y')
        calendar_lines = []
        for i in range(14):
            day = now_et + timedelta(days=i)
            label = " (today)" if i == 0 else " (tomorrow)" if i == 1 else ""
            calendar_lines.append(f"{day.strftime('%A')} = {day.strftime('%Y-%m-%d')}{label}")
        calendar_reference = "\n".join(calendar_lines)


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
            "system": f"Today is {today}.\n\nCALENDAR REFERENCE (use for date conversion):\n{calendar_reference}\n\n{SYSTEM_PROMPT}",
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
                'error': 'Failed to process request'
            })
        }
