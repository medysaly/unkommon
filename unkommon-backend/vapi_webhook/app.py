import json
import boto3
import uuid
from datetime import datetime

# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb')
leads_table = dynamodb.Table('unkommon-leads')

def lambda_handler(event, context):
    """
    Webhook endpoint for Vapi phone calls
    Vapi sends call data when a call ends
    """
    
    try:
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

        phone_number = call_data.get('customer', {}).get('number', 'Unknown')
        call_summary = message.get('summary', '') or 'No summary available'
        transcript = message.get('transcript', '') or message.get('artifact', {}).get('transcript', '')
        call_duration = int(message.get('durationSeconds', 0) or 0)  # Convert to int for DynamoDB
        
        # Save to DynamoDB
        lead_id = str(uuid.uuid4())
        timestamp = int(datetime.now().timestamp())
        
        item = {
            'leadId': lead_id,
            'createdAt': timestamp,
            'name': 'Phone Caller',
            'email': 'pending',
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
            'body': json.dumps({'error': str(e)})
        }
