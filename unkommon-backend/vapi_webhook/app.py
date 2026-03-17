import json
import os
import re
import hmac
import hashlib
import boto3
import uuid
from datetime import datetime

# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb')
leads_table = dynamodb.Table('unkommon-leads')

# Initialize SES
ses_client = boto3.client('ses', region_name='us-east-1')

VAPI_WEBHOOK_SECRET = os.environ.get('VAPI_WEBHOOK_SECRET', '')

def verify_vapi_signature(event):
    """Verify the webhook request came from Vapi using the secret token."""
    if not VAPI_WEBHOOK_SECRET:
        return True  # Skip validation if no secret configured (log warning)
    headers = event.get('headers', {})
    auth = headers.get('x-vapi-secret') or headers.get('X-Vapi-Secret') or ''
    return hmac.compare_digest(auth, VAPI_WEBHOOK_SECRET)

def lambda_handler(event, context):
    """
    Webhook endpoint for Vapi phone calls
    Vapi sends call data when a call ends
    """

    try:
        # Verify webhook authenticity
        if not verify_vapi_signature(event):
            print("Unauthorized webhook request - invalid signature")
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Unauthorized'})
            }

        # Parse the webhook payload from Vapi
        body = json.loads(event['body']) if isinstance(event.get('body'), str) else event.get('body', {})
        
        print(f"📞 Vapi webhook received: {json.dumps(body)}")
        
        # Extract call data from Vapi payload
        message_type = body.get('message', {}).get('type', '')
        
        # Only process end-of-call reports
        if message_type != 'end-of-call-report':
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'status': 'ignored', 'reason': 'Not an end-of-call-report'})
            }
        
        # Extract relevant data
        message = body.get('message', {})
        call_data = message.get('call', {})
        # Extract call details
        phone_number = call_data.get('customer', {}).get('number', 'Unknown')
        transcript = message.get('transcript', '') or message.get('artifact', {}).get('transcript', '')
        call_duration = int(message.get('durationSeconds', 0) or 0)

        # Extract structured data from Vapi analysis
        analysis = message.get('analysis', {})
        call_summary = message.get('summary', '') or analysis.get('summary', '')
        structured_data = analysis.get('structuredData', {})

        # Get name and email from structured data
        caller_name = structured_data.get('name', '')
        caller_email = structured_data.get('email', '')

        # Fallback: extract email from transcript using regex
        if not caller_email and transcript:
            email_match = re.search(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', transcript)
            if email_match:
                caller_email = email_match.group(0)

        # Fallback: use transcript as summary if no summary available
        if not call_summary:
            call_summary = transcript[:500] if transcript else 'No summary available'

        
        # Save to DynamoDB
        lead_id = str(uuid.uuid4())
        timestamp = int(datetime.now().timestamp())
        
        item = {
            'leadId': lead_id,
            'createdAt': timestamp,
            'name': caller_name if caller_name else 'Phone Caller',
            'email': caller_email if caller_email else 'N/A (phone call)',
            'phone': phone_number,
            'message': call_summary,
            'primaryBottleneck': 'N/A',
            'source': 'vapi',
            'appointmentBooked': False,
            'appointmentTime': None,
            'metadata': {
                'callDuration': call_duration,
                'transcript': transcript[:1000] if transcript else '',
                'vapiCallId': call_data.get('id', '')
            }
        }
        
        leads_table.put_item(Item=item)
                # Send email notification
        try:
            ses_client.send_email(
                Source='contact@unkommon.ai',
                Destination={'ToAddresses': ['sales@unkommon.ai']},
                Message={
                    'Subject': {'Data': f'New Call Lead: {phone_number}'},
                    'Body': {
                        'Text': {'Data': f"New phone call received:\n\nPhone: {phone_number}\nDuration: {call_duration} seconds\n\nSummary:\n{call_summary}"}
                    }
                }
            )
            print(f"📧 Email notification sent for call from {phone_number}")
        except Exception as email_err:
            print(f"⚠️ Email notification failed: {email_err}")

        print(f"✅ Vapi lead saved: {lead_id} | Phone: {phone_number}")
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'status': 'success', 'leadId': lead_id})
        }
        
    except Exception as e:
        print(f"❌ Vapi webhook error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Internal server error'})
        }
