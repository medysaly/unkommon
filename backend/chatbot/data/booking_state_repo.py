"""Durable booking intents and at-most-once claims in the conversations table.

Separate prefixed keys prevent history saves from overwriting booking state.
Processing/uncertain/booked records have no TTL: an ambiguous calendar write
must not become retryable merely because a lock expired.
"""

import os
import time

import boto3
from boto3.dynamodb.conditions import Attr

table = boto3.resource("dynamodb").Table(
    os.environ.get("CONVERSATIONS_TABLE_NAME", "unkommon-conversations")
)


def get_booking_state(conversation_id):
    return table.get_item(
        Key={"conversationId": f"booking:{conversation_id}"}, ConsistentRead=True
    ).get("Item")


def save_pending_booking(conversation_id, pending, previous=None):
    condition = Attr("conversationId").not_exists()
    if previous:
        condition = (
            Attr("intentId").eq(previous["intentId"])
            & Attr("status").is_in(["pending", "cancelled"])
        )
    item = dict(pending, conversationId=f"booking:{conversation_id}", status="pending")
    try:
        table.put_item(Item=item, ConditionExpression=condition)
        return True
    except table.meta.client.exceptions.ConditionalCheckFailedException:
        return False


def transition_booking(conversation_id, intent_id, expected, status, response=None):
    """CAS transition; only one invocation can claim pending -> processing."""
    names = {"#status": "status", "#updated": "updatedAt"}
    values = {":status": status, ":now": int(time.time())}
    update = "SET #status = :status, #updated = :now"
    if response is not None:
        update += ", #response = :response"
        names["#response"] = "response"
        values[":response"] = response
    if status in ("processing", "uncertain", "booked"):
        update += " REMOVE #ttl"
        names["#ttl"] = "ttl"
        if status in ("uncertain", "booked"):
            update += ", #booking, #recap, #token"
            names.update({"#booking": "booking", "#recap": "recap", "#token": "token"})
    try:
        table.update_item(
            Key={"conversationId": f"booking:{conversation_id}"},
            UpdateExpression=update,
            ExpressionAttributeNames=names,
            ExpressionAttributeValues=values,
            ConditionExpression=Attr("intentId").eq(intent_id) & Attr("status").eq(expected),
        )
        return True
    except table.meta.client.exceptions.ConditionalCheckFailedException:
        return False
