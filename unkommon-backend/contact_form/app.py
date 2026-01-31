import json
import boto3
import uuid
from datetime import datetime
from botocore.exceptions import ClientError

# Initialize AWS SES client
ses_client = boto3.client('ses', region_name='us-east-1')

# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb')
leads_table = dynamodb.Table('unkommon-leads')

def save_lead_to_db(data):
    """Save lead to DynamoDB"""
    lead_id = str(uuid.uuid4())
    timestamp = int(datetime.now().timestamp())
    
    item = {
        'leadId': lead_id,
        'createdAt': timestamp,
        'name': data.get('name', 'Unknown'),
        'email': data.get('email', ''),
        'phone': data.get('phone', 'N/A'),
        'message': data.get('message', ''),
        'primaryBottleneck': data.get('primaryBottleneck', 'N/A'),
        'source': 'contact_form',
        'appointmentBooked': False,
        'appointmentTime': None,
        'metadata': {}
    }
    
    leads_table.put_item(Item=item)
    print(f"✅ Lead saved to DB: {lead_id}")
    return lead_id


def lambda_handler(event, context):
    """
    Contact form handler - receives form data and sends email via SES
    
    Expected POST body:
    {
        "name": "John Doe",
        "email": "john@example.com",
        "companyUrl": "https://example.com",
        "primaryBottleneck": "Lead Response Time",
        "message": "I want to learn more..."
    }
    """
    
    # Parse request body
    try:
        if isinstance(event.get('body'), str):
            body = json.loads(event['body'])
        else:
            body = event.get('body', {})
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            'body': json.dumps({'error': 'Invalid JSON in request body'})
        }
    
    # Extract form fields
    name = body.get('name', '')
    email = body.get('email', '')
    company_url = body.get('companyUrl', 'Not provided')
    bottleneck = body.get('primaryBottleneck', 'Not specified')
    message = body.get('message', '')
    
    # Validate required fields
    if not name or not email or not message:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            'body': json.dumps({'error': 'Missing required fields: name, email, or message'})
        }

    # Save to database first
    try:
        lead_id = save_lead_to_db(body)
    except Exception as db_error:
        print(f"❌ DB Error: {db_error}")
        # Continue anyway - don't fail the whole request
    

    # Prepare email content
    email_subject = f"🚀 New Contact Form Submission from {name}"
    email_body = f"""
New Contact Form Submission from Unkommon.ai

Contact Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: {name}
Email: {email}
Company URL: {company_url}
Primary Bottleneck: {bottleneck}

Message:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
{message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
This lead was submitted via the Unkommon website contact form.
Respond within 24 hours for best conversion rates!
"""
    
    # Send email via SES
    try:
        response = ses_client.send_email(
            Source='contact@unkommon.ai',  # FROM address (must be verified in SES)
            Destination={
                'ToAddresses': ['sales@unkommon.ai']  # TO address (where you receive leads)
            },
            Message={
                'Subject': {
                    'Data': email_subject,
                    'Charset': 'UTF-8'
                },
                'Body': {
                    'Text': {
                        'Data': email_body,
                        'Charset': 'UTF-8'
                    }
                }
            }
        )
        
        print(f"Email sent successfully! Message ID: {response['MessageId']}")
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            'body': json.dumps({
                'message': 'Contact form submitted successfully!',
                'messageId': response['MessageId']
            })
        }
        
    except ClientError as e:
        print(f"Error sending email: {e}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            'body': json.dumps({
                'error': 'Failed to send email',
                'details': str(e)
            })
        }
