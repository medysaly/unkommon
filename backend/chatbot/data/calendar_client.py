"""HTTP client for the calendar_api Lambda.

This module wraps HTTP calls to the calendar_api Lambda function. The
service layer calls check_availability() and book_appointment() instead of
constructing HTTP requests directly. Exceptions propagate to the caller for
handling (the service layer decides what to show the user).
"""

import os
import requests


CALENDAR_API_URL = os.environ['CALENDAR_API_URL']

def check_availability(date_str):
    """Get available appointment slots for the given date.

    Returns a list of available time slot strings.
    """
    response = requests.get(
        f"{CALENDAR_API_URL}/availability",
        params={"date": date_str},
        timeout=15
    )
    response.raise_for_status()
    return response.json().get("availableSlots", [])

def book_appointment(booking_data):
    """Book a 30-minute consultation appointment.

    booking_data is a dict with keys: date, time, name, email, phone.
    Returns the parsed response dict from the calendar_api.
    """
    response = requests.post(
        f"{CALENDAR_API_URL}/book",
        json=booking_data,
        timeout=30
    )
    response.raise_for_status()
    return response.json()
