from unittest.mock import MagicMock

import boto3
from boto3.dynamodb.conditions import ConditionExpressionBuilder

from data import booking_state_repo as repo


def test_pending_records_are_separate_and_conditionally_created(mocker):
    table = mocker.patch.object(repo, 'table')
    assert repo.save_pending_booking('cid', {'intentId': 'id', 'ttl': 123})
    call = table.put_item.call_args.kwargs
    assert call['Item']['conversationId'] == 'booking:cid'
    built = ConditionExpressionBuilder().build_expression(call['ConditionExpression'])
    assert 'attribute_not_exists' in built.condition_expression


def test_claim_uses_atomic_status_and_intent_condition_and_removes_ttl(mocker):
    table = mocker.patch.object(repo, 'table')
    assert repo.transition_booking('cid', 'intent', 'pending', 'processing')
    call = table.update_item.call_args.kwargs
    assert call['Key'] == {'conversationId': 'booking:cid'}
    assert 'REMOVE #ttl' in call['UpdateExpression']
    built = ConditionExpressionBuilder().build_expression(call['ConditionExpression'])
    assert set(built.attribute_value_placeholders.values()) == {'intent', 'pending'}
    assert 'AND' in built.condition_expression


def test_competing_write_returns_false_not_success(mocker):
    table = mocker.patch.object(repo, 'table')
    error_class = boto3.client('dynamodb', region_name='us-east-1').exceptions.ConditionalCheckFailedException
    table.meta.client.exceptions.ConditionalCheckFailedException = error_class
    table.update_item.side_effect = error_class({'Error': {'Code': 'ConditionalCheckFailedException'}}, 'UpdateItem')
    assert repo.transition_booking('cid', 'intent', 'pending', 'processing') is False


def test_booked_tombstone_removes_contact_details_and_keeps_dedupe(mocker):
    table = mocker.patch.object(repo, 'table')
    repo.transition_booking('cid', 'intent', 'processing', 'booked', 'Booked for the selected time.')
    expression = table.update_item.call_args.kwargs['UpdateExpression']
    assert 'REMOVE #ttl, #booking, #recap, #token' in expression


def test_state_reads_are_strongly_consistent(mocker):
    table = mocker.patch.object(repo, 'table')
    table.get_item.return_value = {'Item': {'status': 'processing'}}
    assert repo.get_booking_state('cid')['status'] == 'processing'
    table.get_item.assert_called_once_with(Key={'conversationId': 'booking:cid'}, ConsistentRead=True)
