import json
import os
import re
import hmac
import boto3
import uuid
import requests
from datetime import datetime

# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb')
leads_table = dynamodb.Table('unkommon-leads')

VAPI_WEBHOOK_SECRET = os.environ.get('VAPI_WEBHOOK_SECRET', '')
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
CALENDAR_API_URL = os.environ.get('CALENDAR_API_URL', '')

CORS_HEADERS = {'Content-Type': 'application/json'}


def send_email(to, subject, body, html=None):
    """Send email via Resend API"""
    payload = {
        'from': 'Unkommon <info@unkommon.ai>',
        'to': [to],
        'subject': subject,
        'text': body,
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
    print(f"📧 Confirmation emails sent for {name}")
    return True


def extract_booking_from_artifact(message):
    """Extract booking details from Vapi end-of-call artifact messages."""
    artifact = message.get('artifact', {})
    messages = artifact.get('messages', [])

    book_args = None
    book_result = None

    for msg in messages:
        # Find the book_appointment tool call
        if msg.get('role') == 'tool_calls':
            for tc in msg.get('toolCalls', []):
                fn = tc.get('function', {})
                if fn.get('name') == 'book_appointment':
                    args = fn.get('arguments', '{}')
                    if isinstance(args, str):
                        try:
                            book_args = json.loads(args)
                        except json.JSONDecodeError:
                            book_args = {}
                    else:
                        book_args = args

        # Find the book_appointment result
        if msg.get('role') == 'tool_call_result' and msg.get('name') == 'book_appointment':
            result = msg.get('result', '{}')
            if isinstance(result, str):
                try:
                    book_result = json.loads(result)
                except json.JSONDecodeError:
                    book_result = {}
            else:
                book_result = result

    if not book_args:
        return None

    # Extract date and time from startDateTime (e.g. "2026-03-24T14:00:00")
    start_dt = book_args.get('startDateTime', '')
    if not start_dt:
        return None

    try:
        dt = datetime.fromisoformat(start_dt.replace('Z', '+00:00').split('-04:00')[0].split('-05:00')[0])
        date_str = dt.strftime('%Y-%m-%d')
        time_str = dt.strftime('%H:%M')
    except (ValueError, IndexError):
        return None

    # Extract attendee email
    attendees = book_args.get('attendees', [])
    email = attendees[0] if attendees else None

    # Extract name from summary (e.g. "Free Efficiency Audit - Mehdi Salih")
    summary = book_args.get('summary', '')
    name = summary.split(' - ', 1)[1] if ' - ' in summary else ''

    # Extract meet link from result if available
    meet_link = ''
    if book_result:
        meet_link = book_result.get('hangoutLink', '') or ''

    return {
        'date': date_str,
        'time': time_str,
        'name': name,
        'email': email,
        'meet_link': meet_link,
    }


def verify_vapi_signature(event):
    """Verify the webhook request came from Vapi using the secret token."""
    if not VAPI_WEBHOOK_SECRET:
        return True
    headers = event.get('headers', {})
    auth = headers.get('x-vapi-secret') or headers.get('X-Vapi-Secret') or ''
    return hmac.compare_digest(auth, VAPI_WEBHOOK_SECRET)


# ── Tool call handlers ──────────────────────────────────────────────

def handle_check_availability(args):
    """Check available appointment slots via Calendar API."""
    date = args.get('date', '')
    if not date:
        return 'Error: date is required in YYYY-MM-DD format'

    try:
        resp = requests.get(
            f"{CALENDAR_API_URL}/availability",
            params={"date": date},
            timeout=15,
        )
        resp.raise_for_status()
        data = resp.json()
        slots = data.get('availableSlots', [])
        if slots:
            return f"Available times on {date}: {', '.join(slots)}"
        return f"No available slots on {date}"
    except Exception as e:
        print(f"check_availability error: {e}")
        return f"Error checking availability: {str(e)}"


def handle_book_appointment(args):
    """Book appointment via Calendar API."""
    required = ['date', 'time', 'name', 'email', 'phone']
    missing = [f for f in required if not args.get(f)]
    if missing:
        return f"Error: missing required fields: {', '.join(missing)}"

    try:
        resp = requests.post(
            f"{CALENDAR_API_URL}/book",
            json=args,
            timeout=30,
        )
        resp.raise_for_status()
        data = resp.json()
        if data.get('success'):
            return f"Appointment booked successfully for {args['name']} on {args['date']} at {args['time']}. A confirmation email has been sent."
        return f"Failed to book: {data.get('error', 'Unknown error')}"
    except Exception as e:
        print(f"book_appointment error: {e}")
        return f"Error booking appointment: {str(e)}"


TOOL_HANDLERS = {
    'check_availability': handle_check_availability,
    'checkAvailability': handle_check_availability,
    'check_calendar_availability': handle_check_availability,
    'book_appointment': handle_book_appointment,
    'bookAppointment': handle_book_appointment,
}


# ── Message type handlers ───────────────────────────────────────────

def handle_tool_calls(body):
    """Process Vapi tool-calls and return results."""
    message = body.get('message', {})
    tool_calls = message.get('toolCallList', [])

    results = []
    for tc in tool_calls:
        tool_call_id = tc.get('id', '')
        function = tc.get('function', {})
        fn_name = function.get('name', '')
        fn_args = function.get('arguments', {})

        # Parse args if they arrive as a JSON string
        if isinstance(fn_args, str):
            try:
                fn_args = json.loads(fn_args)
            except json.JSONDecodeError:
                fn_args = {}

        handler = TOOL_HANDLERS.get(fn_name)
        if handler:
            result = handler(fn_args)
        else:
            result = f"Unknown tool: {fn_name}"

        print(f"🔧 Tool call: {fn_name} | Args: {fn_args} | Result: {result}")
        results.append({
            'toolCallId': tool_call_id,
            'result': result,
        })

    return {
        'statusCode': 200,
        'headers': CORS_HEADERS,
        'body': json.dumps({'results': results}),
    }


def handle_end_of_call(body):
    """Process end-of-call report — save lead and send notification."""
    message = body.get('message', {})
    call_data = message.get('call', {})

    phone_number = call_data.get('customer', {}).get('number', 'Unknown')
    transcript = message.get('transcript', '') or message.get('artifact', {}).get('transcript', '')
    call_duration = int(message.get('durationSeconds', 0) or 0)

    # Extract structured data from Vapi analysis
    analysis = message.get('analysis', {})
    call_summary = message.get('summary', '') or analysis.get('summary', '')
    structured_data = analysis.get('structuredData', {})

    caller_name = structured_data.get('name', '')
    caller_email = structured_data.get('email', '')

    # Fallback: extract email from transcript
    if not caller_email and transcript:
        email_match = re.search(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', transcript)
        if email_match:
            caller_email = email_match.group(0)

    if not call_summary:
        call_summary = transcript[:500] if transcript else 'No summary available'

    # Check if an appointment was booked during the call
    booking = extract_booking_from_artifact(message)
    appointment_booked = booking is not None

    # Use booking email/name if available and not already extracted
    if booking:
        if not caller_email and booking.get('email'):
            caller_email = booking['email']
        if not caller_name and booking.get('name'):
            caller_name = booking['name']

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
        'appointmentBooked': appointment_booked,
        'appointmentTime': f"{booking['date']} {booking['time']}" if booking else None,
        'metadata': {
            'callDuration': call_duration,
            'transcript': transcript[:1000] if transcript else '',
            'vapiCallId': call_data.get('id', ''),
        },
    }

    leads_table.put_item(Item=item)

    # Send branded confirmation email if appointment was booked
    if booking and booking.get('email'):
        try:
            send_confirmation_email(
                booking.get('name', caller_name or 'there'),
                booking['email'],
                booking['date'],
                booking['time'],
                booking.get('meet_link', ''),
            )
        except Exception as conf_err:
            print(f"⚠️ Confirmation email failed: {conf_err}")
    else:
        # Send internal notification only (no booking)
        try:
            send_email(
                'sales@unkommon.ai',
                f'New Call Lead: {phone_number}',
                f"New phone call received:\n\nPhone: {phone_number}\nDuration: {call_duration} seconds\n\nSummary:\n{call_summary}",
            )
            print(f"📧 Email notification sent for call from {phone_number}")
        except Exception as email_err:
            print(f"⚠️ Email notification failed: {email_err}")

    print(f"✅ Vapi lead saved: {lead_id} | Phone: {phone_number} | Booked: {appointment_booked}")

    return {
        'statusCode': 200,
        'headers': CORS_HEADERS,
        'body': json.dumps({'status': 'success', 'leadId': lead_id}),
    }


# ── Lambda entry point ──────────────────────────────────────────────

def lambda_handler(event, context):
    """
    Webhook endpoint for Vapi phone calls.
    Handles:
      - tool-calls: execute check_availability / book_appointment
      - end-of-call-report: save lead + send notification
    """

    try:
        if not verify_vapi_signature(event):
            print("Unauthorized webhook request - invalid signature")
            return {
                'statusCode': 401,
                'headers': CORS_HEADERS,
                'body': json.dumps({'error': 'Unauthorized'}),
            }

        body = json.loads(event['body']) if isinstance(event.get('body'), str) else event.get('body', {})

        print(f"📞 Vapi webhook received: {json.dumps(body)}")

        message_type = body.get('message', {}).get('type', '')

        if message_type == 'tool-calls':
            return handle_tool_calls(body)

        if message_type == 'end-of-call-report':
            return handle_end_of_call(body)

        # Acknowledge other message types (status-update, etc.)
        return {
            'statusCode': 200,
            'headers': CORS_HEADERS,
            'body': json.dumps({'status': 'ok'}),
        }

    except Exception as e:
        print(f"❌ Vapi webhook error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': CORS_HEADERS,
            'body': json.dumps({'error': 'Internal server error'}),
        }
