"""DynamoDB repository for chatbot conversation history.

This module wraps all DynamoDB reads and writes for the unkommon-conversations
table. The service layer calls get_conversation_history() and
save_conversation_history() without touching boto3 directly.

Table schema:
    Partition key: conversationId (string, UUID format)
    TTL attribute: ttl (24 hours after each write)
"""

import boto3
import os
from datetime import datetime


# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb')
conversations_table = dynamodb.Table(os.environ.get('CONVERSATIONS_TABLE_NAME', 'unkommon-conversations'))

def get_conversation_history(conversation_id):
    """Retrieve conversation history from DynamoDB"""
    try:
        response = conversations_table.get_item(Key={'conversationId': conversation_id}, ConsistentRead=True)
        item = response.get('Item')
        if item:
            return item.get('messages', [])
        return []
    except Exception as e:
        print(f"Error getting conversation history: {e}")
        return []
    

def save_conversation_history(conversation_id, messages):
    """Save conversation history to DynamoDB with 24-hour TTL"""
    try:
        ttl = int(datetime.now().timestamp()) + 86400  # 24 hours from now
        conversations_table.put_item(Item={
            'conversationId': conversation_id,
            'messages': messages,
            'ttl': ttl,
            'updatedAt': int(datetime.now().timestamp())
        })
    except Exception as e:
        print(f"Error saving conversation history: {e}")
