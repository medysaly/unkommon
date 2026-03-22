import json
import os
import boto3
import requests
from datetime import datetime, timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build

# Initialize AWS clients
secrets_client = boto3.client('secretsmanager', region_name='us-east-1')

RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')

# Calendar settings
CALENDAR_ID = 'contact@unkommon.ai'
CALENDAR_SECRET_ID = os.environ.get('GOOGLE_CALENDAR_SECRET', 'unkommon/google-calendar')
SCOPES = ['https://www.googleapis.com/auth/calendar']


def get_calendar_service():
    """Get authenticated Google Calendar service using domain-wide delegation"""
    secret = secrets_client.get_secret_value(SecretId=CALENDAR_SECRET_ID)
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


def send_email(to, subject, text, html=None):
    """Send email via Resend API. Supports optional HTML body."""
    payload = {
        'from': 'Unkommon <info@unkommon.ai>',
        'to': [to],
        'subject': subject,
        'text': text,
    }
    if html:
        payload['html'] = html

    resp = requests.post(
        'https://api.resend.com/emails',
        headers={
            'Authorization': f'Bearer {RESEND_API_KEY}',
            'Content-Type': 'application/json',
        },
        json=payload,
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json()


def send_confirmation_email(name, email, date_str, time_str, meet_link=''):
    """Send booking notification to sales team and branded confirmation to customer."""
    time_formatted = datetime.strptime(time_str, '%H:%M').strftime('%-I:%M %p')
    date_formatted = datetime.strptime(date_str, '%Y-%m-%d').strftime('%A, %B %d, %Y')
    first_name = name.split()[0] if name.strip() else name

    # ── Internal notification to sales team ──
    meet_info = f"\nGoogle Meet: {meet_link}" if meet_link else ""
    send_email(
        'sales@unkommon.ai',
        f'New Booking: {name}',
        f"New consultation booked:\n\nName: {name}\nEmail: {email}\nDate: {date_formatted}\nTime: {time_formatted} ET{meet_info}",
    )

    # ── Branded HTML confirmation to customer ──
    meet_section = ''
    if meet_link:
        meet_section = f'''
                <!-- Meet link -->
                <tr><td style="padding:0 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                        <tr><td style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:20px 24px;">
                            <table cellpadding="0" cellspacing="0"><tr>
                                <td style="padding-right:14px;">
                                    <div style="width:40px; height:40px; background:#22c55e; border-radius:10px;
                                                text-align:center; line-height:40px;">
                                        <span style="color:#fff; font-size:18px;">&#9654;</span>
                                    </div>
                                </td>
                                <td>
                                    <span style="font-size:12px; color:#888; text-transform:uppercase;
                                                 letter-spacing:0.5px; font-weight:600;">Join via</span><br>
                                    <a href="{meet_link}" style="color:#16a34a; font-size:15px;
                                       font-weight:600; text-decoration:none;">Google Meet</a>
                                </td>
                            </tr></table>
                        </td></tr>
                    </table>
                </td></tr>

                <!-- CTA button -->
                <tr><td style="padding:24px 40px 0; text-align:center;">
                    <a href="{meet_link}"
                       style="display:inline-block; background:#000; color:#ffffff;
                              padding:16px 48px; border-radius:10px; text-decoration:none;
                              font-weight:700; font-size:15px; letter-spacing:0.3px;">
                        Join Meeting
                    </a>
                </td></tr>'''

    html = f'''<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Booking Confirmed</title></head>
<body style="margin:0; padding:0; background:#f4f4f5;
             font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">

    <!-- Wrapper -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5; padding:40px 16px;">
    <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0"
           style="background:#ffffff; border-radius:16px; overflow:hidden;
                  box-shadow:0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04);">

        <!-- Header -->
        <tr><td style="background:#000; padding:32px 40px; text-align:center;">
            <img src="https://unkommon.ai/favicon-96x96.png" width="44" height="44"
                 alt="Unkommon" style="border-radius:10px; margin-bottom:12px;">
            <h1 style="margin:0; color:#fff; font-size:20px; font-weight:800;
                       letter-spacing:1px; text-transform:uppercase;">UNKOMMON</h1>
        </td></tr>

        <!-- Confirmation badge -->
        <tr><td style="padding:36px 40px 0; text-align:center;">
            <div style="display:inline-block; background:#f0fdf4; border:1px solid #bbf7d0;
                        border-radius:50px; padding:8px 20px;">
                <span style="color:#16a34a; font-size:14px; font-weight:600;">&#10003; Confirmed</span>
            </div>
        </td></tr>

        <!-- Greeting -->
        <tr><td style="padding:24px 40px 0; text-align:center;">
            <h2 style="margin:0 0 8px; font-size:24px; font-weight:700; color:#111;">
                You're all set, {first_name}!
            </h2>
            <p style="margin:0; color:#6b7280; font-size:15px; line-height:1.6;">
                Your 30-minute Efficiency Audit has been booked.<br>
                Here are your appointment details.
            </p>
        </td></tr>

        <!-- Appointment details card -->
        <tr><td style="padding:28px 40px 0;">
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="background:#fafafa; border:1px solid #e5e7eb; border-radius:12px;">

                <tr><td style="padding:20px 24px; border-bottom:1px solid #e5e7eb;">
                    <table cellpadding="0" cellspacing="0"><tr>
                        <td style="padding-right:14px;">
                            <div style="width:40px; height:40px; background:#f3f4f6; border-radius:10px;
                                        text-align:center; line-height:40px;">
                                <span style="font-size:18px;">&#128197;</span>
                            </div>
                        </td>
                        <td>
                            <span style="font-size:12px; color:#9ca3af; text-transform:uppercase;
                                         letter-spacing:0.5px; font-weight:600;">Date</span><br>
                            <span style="font-size:15px; font-weight:600; color:#111;">{date_formatted}</span>
                        </td>
                    </tr></table>
                </td></tr>

                <tr><td style="padding:20px 24px; border-bottom:1px solid #e5e7eb;">
                    <table cellpadding="0" cellspacing="0"><tr>
                        <td style="padding-right:14px;">
                            <div style="width:40px; height:40px; background:#f3f4f6; border-radius:10px;
                                        text-align:center; line-height:40px;">
                                <span style="font-size:18px;">&#128340;</span>
                            </div>
                        </td>
                        <td>
                            <span style="font-size:12px; color:#9ca3af; text-transform:uppercase;
                                         letter-spacing:0.5px; font-weight:600;">Time</span><br>
                            <span style="font-size:15px; font-weight:600; color:#111;">{time_formatted} Eastern Time</span>
                        </td>
                    </tr></table>
                </td></tr>

                <tr><td style="padding:20px 24px;">
                    <table cellpadding="0" cellspacing="0"><tr>
                        <td style="padding-right:14px;">
                            <div style="width:40px; height:40px; background:#f3f4f6; border-radius:10px;
                                        text-align:center; line-height:40px;">
                                <span style="font-size:18px;">&#9202;</span>
                            </div>
                        </td>
                        <td>
                            <span style="font-size:12px; color:#9ca3af; text-transform:uppercase;
                                         letter-spacing:0.5px; font-weight:600;">Duration</span><br>
                            <span style="font-size:15px; font-weight:600; color:#111;">30 minutes</span>
                        </td>
                    </tr></table>
                </td></tr>

            </table>
        </td></tr>

        {meet_section}

        <!-- What to expect -->
        <tr><td style="padding:32px 40px 0;">
            <h3 style="margin:0 0 12px; font-size:15px; font-weight:700; color:#111;">What to expect</h3>
            <table cellpadding="0" cellspacing="0" style="width:100%;">
                <tr><td style="padding:6px 0; color:#4b5563; font-size:14px; line-height:1.6;">
                    <span style="color:#000; font-weight:600;">1.</span> We'll review your current workflows and bottlenecks
                </td></tr>
                <tr><td style="padding:6px 0; color:#4b5563; font-size:14px; line-height:1.6;">
                    <span style="color:#000; font-weight:600;">2.</span> Identify where AI agents can save you time and money
                </td></tr>
                <tr><td style="padding:6px 0; color:#4b5563; font-size:14px; line-height:1.6;">
                    <span style="color:#000; font-weight:600;">3.</span> Get a custom plan tailored to your business
                </td></tr>
            </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:36px 40px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="border-top:1px solid #e5e7eb; padding-top:24px;">
                <tr><td style="padding-top:24px; text-align:center;">
                    <p style="margin:0 0 4px; color:#9ca3af; font-size:13px;">
                        Need to reschedule? Reply to this email.
                    </p>
                    <p style="margin:0; color:#9ca3af; font-size:13px;">
                        <a href="mailto:contact@unkommon.ai" style="color:#6b7280; text-decoration:underline;">contact@unkommon.ai</a>
                        &nbsp;&middot;&nbsp;
                        <a href="tel:+12036809629" style="color:#6b7280; text-decoration:underline;">(203) 680-9629</a>
                        &nbsp;&middot;&nbsp;
                        <a href="https://unkommon.ai" style="color:#6b7280; text-decoration:underline;">unkommon.ai</a>
                    </p>
                </td></tr>
            </table>
        </td></tr>

    </table>
    </td></tr></table>

</body></html>'''

    # Plain text fallback
    meet_line = f"\nJoin the call: {meet_link}" if meet_link else ""
    plain_text = (
        f"Hi {first_name},\n\n"
        f"Your 30-minute Efficiency Audit is confirmed!\n\n"
        f"Date: {date_formatted}\n"
        f"Time: {time_formatted} ET\n"
        f"Duration: 30 minutes\n"
        f"{meet_line}\n\n"
        f"What to expect:\n"
        f"1. We'll review your current workflows and bottlenecks\n"
        f"2. Identify where AI agents can save you time and money\n"
        f"3. Get a custom plan tailored to your business\n\n"
        f"Need to reschedule? Reply to this email.\n\n"
        f"— The Unkommon Team\n"
        f"unkommon.ai | contact@unkommon.ai | (203) 680-9629"
    )

    send_email(
        email,
        'Your Efficiency Audit is Confirmed',
        plain_text,
        html=html,
    )
    print(f"Confirmation emails sent for {name}")
    return True



def book_appointment(date_str, time_str, name, email, phone):
    """Book a 30-minute appointment. Returns (event_id, email_sent) tuple."""
    service = get_calendar_service()

    # Parse date and time
    start_datetime = datetime.strptime(f'{date_str} {time_str}', '%Y-%m-%d %H:%M')
    end_datetime = start_datetime + timedelta(minutes=30)

    event = {
        'summary': f'Unkommon Efficiency Audit - {name}',
        'description': f'30-Minute Efficiency Audit\n\nName: {name}\nEmail: {email}\nPhone: {phone}\n\nBooked via AI assistant',
        'start': {
            'dateTime': start_datetime.isoformat(),
            'timeZone': 'America/New_York',
        },
        'end': {
            'dateTime': end_datetime.isoformat(),
            'timeZone': 'America/New_York',
        },
        'attendees': [
            {'email': email, 'displayName': name},
            {'email': CALENDAR_ID, 'organizer': True},
        ],
        'conferenceData': {
            'createRequest': {
                'requestId': f'unkommon-{date_str}-{time_str}-{phone}',
                'conferenceSolutionKey': {'type': 'hangoutsMeet'},
            }
        },
    }

    created_event = service.events().insert(
        calendarId=CALENDAR_ID, body=event,
        conferenceDataVersion=1, sendUpdates='none',
    ).execute()
    event_id = created_event.get('id')
    meet_link = created_event.get('hangoutLink', '')

    # Send confirmation emails
    email_sent = False
    try:
        send_confirmation_email(name, email, date_str, time_str, meet_link)
        email_sent = True
    except requests.exceptions.HTTPError as e:
        print(f"Failed to send confirmation email: {e} | Response: {e.response.text}")
    except Exception as e:
        print(f"Failed to send confirmation email: {e}")

    return event_id, email_sent


def lambda_handler(event, context):
    """
    Calendar API endpoints:
    - GET /api/calendar/availability?date=2025-01-22
    - POST /api/calendar/book { date, time, name, email, phone }
    """

    # CORS headers (defined outside try so error handler can use them)
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    }

    try:
        http_method = event.get('httpMethod', '')
        path = event.get('path', '')

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

            # Validate date format (YYYY-MM-DD)
            import re
            if not re.match(r'^\d{4}-\d{2}-\d{2}$', body['date']):
                return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Invalid date format'})}
            try:
                datetime.strptime(body['date'], '%Y-%m-%d')
            except ValueError:
                return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Invalid date'})}

            # Validate time format (HH:MM)
            if not re.match(r'^\d{2}:\d{2}$', body['time']):
                return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Invalid time format'})}

            # Validate email
            if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', body['email']):
                return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Invalid email'})}

            # Sanitize name (max 100 chars, no special chars)
            body['name'] = body['name'][:100].strip()
            body['phone'] = re.sub(r'[^\d+\-() ]', '', body['phone'])[:20]

            event_id, email_sent = book_appointment(
                body['date'], body['time'], body['name'], body['email'], body['phone']
            )

            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'success': True,
                    'eventId': event_id,
                    'emailSent': email_sent,
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
            'body': json.dumps({'error': 'Internal server error'})
        }
