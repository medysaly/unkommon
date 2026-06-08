"""DynamoDB repository for booked appointments.

Wraps all reads and writes for the unkommon-appointments table so the service
layer never touches boto3 directly (same pattern as conversations_repo.py).

Table schema:
    Partition key: appointmentId (string, UUID)
    GSI "ByCustomerEmail":
        Partition key: customerEmail
        Sort key:      appointmentDate (ISO, e.g. "2026-06-15T10:00")
        -> "all appointments for one customer, in date order"
    GSI "ByDate":
        Partition key: entityType (constant "APPT")
        Sort key:      appointmentDate
        -> "all appointments in a date range, across customers"
"""

import uuid
from datetime import datetime, timezone

import boto3
from boto3.dynamodb.conditions import Key


dynamodb = boto3.resource('dynamodb')
appointments_table = dynamodb.Table('unkommon-appointments')

# Constant partition-key value for the ByDate GSI so all appointments live under
# one partition and can be range-queried by date.
APPT_ENTITY = "APPT"


def save_appointment(name, email, phone, date, time, conversation_id,
                     source="chatbot", status="booked"):
    """Persist a booked appointment and return its generated appointmentId.

    `date` is "YYYY-MM-DD" and `time` is "HH:MM"; we combine them into a single
    sortable appointmentDate like "2026-06-15T10:00" so both GSIs can sort and
    range-query on it.

    Returns the new appointmentId string, or None on failure.
    """
    appointment_id = str(uuid.uuid4())
    appointment_date = f"{date}T{time}"
    try:
        appointments_table.put_item(Item={
            'appointmentId': appointment_id,
            'entityType': APPT_ENTITY,
            'customerEmail': email,
            'appointmentDate': appointment_date,
            'customerName': name,
            'customerPhone': phone,
            'conversationId': conversation_id,
            'source': source,
            'status': status,
            'createdAt': datetime.now(timezone.utc).isoformat(),
        })
        return appointment_id
    except Exception as e:
        print(f"Error saving appointment: {e}")
        return None


def get_appointments_by_customer(email):
    """Return all appointments for one customer, earliest first.

    Queries the ByCustomerEmail GSI: partition key customerEmail = the email.
    Results come back sorted by the GSI sort key (appointmentDate).
    """
    try:
        response = appointments_table.query(
            IndexName='ByCustomerEmail',
            KeyConditionExpression=Key('customerEmail').eq(email),
        )
        return response.get('Items', [])
    except Exception as e:
        print(f"Error querying appointments by customer: {e}")
        return []


def get_appointments_in_range(start_date, end_date):
    """Return all appointments between start_date and end_date (inclusive).

    Queries the ByDate GSI: partition key entityType = "APPT" plus a BETWEEN
    condition on appointmentDate. start_date / end_date are ISO strings like
    "2026-06-01" and "2026-06-30".
    """
    try:
        response = appointments_table.query(
            IndexName='ByDate',
            KeyConditionExpression=Key('entityType').eq(APPT_ENTITY) & Key('appointmentDate').between(start_date, end_date),
        )
        return response.get('Items', [])
    except Exception as e:
        print(f"Error querying appointments in range: {e}")
        return []
