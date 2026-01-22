import json
import boto3
from datetime import datetime, timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build

# Initialize AWS clients
secrets_client = boto3.client('secretsmanager', region_name='us-east-1')

# Calendar settings
CALENDAR_ID = 'contact@unkommon.ai'
SCOPES = ['https://www.googleapis.com/auth/calendar']


def get_calendar_service():
    """Get authenticated Google Calendar service using domain-wide delegation"""
    secret = secrets_client.get_secret_value(SecretId='unkommon/google-calendar')
    creds_dict = json.loads(secret['SecretString'])

    credentials = service_account.Credentials.from_service_account_info(
        creds_dict, scopes=SCOPES
    )

    # Use domain-wide delegation to impersonate the calendar owner
    delegated_credentials = credentials.with_subject(CALENDAR_ID)

    return build('calendar', 'v3', credentials=delegated_credentials)


def get_available_slots(date_str):
    """Get available 30-min slots for a given date"""
    service = get_calendar_service()
    
    # Parse date
    target_date = datetime.strptime(date_str, '%Y-%m-%d')
    
    # Business hours: 9 AM to 5 PM Eastern
    start_of_day = target_date.replace(hour=9, minute=0, second=0)
    end_of_day = target_date.replace(hour=17, minute=0, second=0)
    
    # Get existing events
    events_result = service.events().list(
        calendarId=CALENDAR_ID,
        timeMin=start_of_day.isoformat() + 'Z',
        timeMax=end_of_day.isoformat() + 'Z',
        singleEvents=True,
        orderBy='startTime'
    ).execute()
    
    busy_times = []
    for event in events_result.get('items', []):
        start = event['start'].get('dateTime', event['start'].get('date'))
        end = event['end'].get('dateTime', event['end'].get('date'))
        busy_times.append((
            datetime.fromisoformat(start.replace('Z', '+00:00')),
            datetime.fromisoformat(end.replace('Z', '+00:00'))
        ))
    
    # Generate 30-min slots
    available_slots = []
    current_slot = start_of_day
    
    while current_slot < end_of_day:
        slot_end = current_slot + timedelta(minutes=30)
        is_available = True
        
        for busy_start, busy_end in busy_times:
            if not (slot_end <= busy_start.replace(tzinfo=None) or current_slot >= busy_end.replace(tzinfo=None)):
                is_available = False
                break
        
        if is_available:
            available_slots.append(current_slot.strftime('%H:%M'))
        
        current_slot = slot_end
    
    return available_slots


def book_appointment(date_str, time_str, name, email, phone):
    """Book a 30-minute appointment"""
    service = get_calendar_service()
    
    # Parse date and time
    start_datetime = datetime.strptime(f'{date_str} {time_str}', '%Y-%m-%d %H:%M')
    end_datetime = start_datetime + timedelta(minutes=30)
    
    event = {
        'summary': f'Unkommon Consultation - {name}',
        'description': f'Name: {name}\nEmail: {email}\nPhone: {phone}\n\nBooked via AI assistant',
        'start': {
            'dateTime': start_datetime.isoformat(),
            'timeZone': 'America/New_York',
        },
        'end': {
            'dateTime': end_datetime.isoformat(),
            'timeZone': 'America/New_York',
        },
    }
    
    created_event = service.events().insert(calendarId=CALENDAR_ID, body=event).execute()
    return created_event.get('id')


def lambda_handler(event, context):
    """
    Calendar API endpoints:
    - GET /api/calendar/availability?date=2025-01-22
    - POST /api/calendar/book { date, time, name, email, phone }
    """
    
    try:
        http_method = event.get('httpMethod', '')
        path = event.get('path', '')
        
        # CORS headers
        headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        }
        
        # Handle OPTIONS preflight
        if http_method == 'OPTIONS':
            return {'statusCode': 200, 'headers': headers, 'body': ''}
        
        # GET availability
        if http_method == 'GET' and 'availability' in path:
            params = event.get('queryStringParameters', {}) or {}
            date_str = params.get('date')
            
            if not date_str:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'date parameter required (YYYY-MM-DD)'})
                }
            
            slots = get_available_slots(date_str)
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'date': date_str, 'availableSlots': slots})
            }
        
        # POST book appointment
        if http_method == 'POST' and 'book' in path:
            body = json.loads(event['body']) if isinstance(event.get('body'), str) else event.get('body', {})
            
            required = ['date', 'time', 'name', 'email', 'phone']
            missing = [f for f in required if not body.get(f)]
            
            if missing:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': f'Missing fields: {", ".join(missing)}'})
                }
            
            event_id = book_appointment(
                body['date'], body['time'], body['name'], body['email'], body['phone']
            )
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'success': True,
                    'eventId': event_id,
                    'message': f"Appointment booked for {body['date']} at {body['time']}"
                })
            }
        
        return {
            'statusCode': 404,
            'headers': headers,
            'body': json.dumps({'error': 'Not found'})
        }
        
    except Exception as e:
        print(f"Calendar API error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }
