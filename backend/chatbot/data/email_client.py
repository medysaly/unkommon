"""Resend API client for outbound emails.

This module wraps calls to the Resend API for sending plain-text lead
notification emails. The service layer calls send_lead_email() instead of
constructing HTTP requests to Resend directly.

This module uses the "fail soft" pattern: failures are caught and logged
(returning False) so that a lead email failure never crashes the main chat
flow. Lead notifications are non-critical background work.
"""

import os
import requests


RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
LEADS_NOTIFICATION_EMAIL = os.environ.get('LEADS_NOTIFICATION_EMAIL', 'sales@unkommon.ai')


def send_lead_email(subject, body):
    """Send a plain-text lead notification email via Resend."""
    if not RESEND_API_KEY:
        print("RESEND_API_KEY not configured, skipping lead email")
        return False
    try:
        resp = requests.post(
            'https://api.resend.com/emails',
            headers={
                'Authorization': f'Bearer {RESEND_API_KEY}',
                'Content-Type': 'application/json',
            },
            json={
                'from': 'Unkommon <info@unkommon.ai>',
                'to': [LEADS_NOTIFICATION_EMAIL],
                'subject': subject,
                'text': body,
            },
            timeout=10,
        )
        resp.raise_for_status()
        return True
    except Exception as e:
        print(f"Lead email failed: status={getattr(getattr(e, 'response', None), 'status_code', 'unknown')}")
        return False