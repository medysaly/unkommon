"""DynamoDB repository for captured leads.

Wraps all reads and writes for the unkommon-leads table so the service layer
never touches boto3 directly (same pattern as conversations_repo.py).

Table schema:
    Partition key: leadId (string, UUID)
    GSI "LeadsByDate":
        Partition key: entityType (constant "LEAD")
        Sort key:      createdAt (ISO 8601 timestamp)
    The GSI lets us query "all leads in the last N days, newest first"
    without scanning the whole table.
"""

import uuid
from datetime import datetime, timedelta, timezone

import boto3
from boto3.dynamodb.conditions import Key


dynamodb = boto3.resource('dynamodb')
leads_table = dynamodb.Table('unkommon-leads')

# Constant partition-key value for the LeadsByDate GSI. Every lead shares it so
# the index gathers all leads under one partition, sorted by createdAt.
LEAD_ENTITY = "LEAD"


def save_lead(email, phone, conversation_id, source, last_user_message, assistant_response=""):
    """Persist a captured lead and return its generated leadId.

    Args:
        email: lead's email if captured, else None
        phone: lead's phone if captured, else None
        conversation_id: the conversation this lead came from
        source: where it came from, e.g. "chatbot" or "vapi"
        last_user_message: the user's message that triggered capture
        assistant_response: the assistant's reply (optional)

    Returns:
        the new leadId string, or None on failure
    """
    lead_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()
    try:
        leads_table.put_item(Item={
            'leadId': lead_id,
            'entityType': LEAD_ENTITY,
            'createdAt': created_at,
            'email': email or 'not provided',
            'phone': phone or 'not provided',
            'conversationId': conversation_id,
            'source': source,
            'lastUserMessage': last_user_message[:500],
            'assistantResponse': assistant_response[:500],
        })
        return lead_id
    except Exception as e:
        print(f"Error saving lead: {e}")
        return None


def get_recent_leads(days=30):
    """Return leads created in the last `days` days, newest first.

    Queries the LeadsByDate GSI instead of scanning the table: we ask for
    entityType = "LEAD" and createdAt >= the cutoff timestamp. ScanIndexForward
    is False so DynamoDB returns them in descending (newest-first) order.
    """
    cutoff = (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()
    try:
        response = leads_table.query(
            IndexName='LeadsByDate',
            KeyConditionExpression=Key('entityType').eq(LEAD_ENTITY) & Key('createdAt').gte(cutoff),
            ScanIndexForward=False,
        )
        return response.get('Items', [])
    except Exception as e:
        print(f"Error querying recent leads: {e}")
        return []
