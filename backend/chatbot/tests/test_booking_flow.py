import time
from copy import deepcopy

import pytest

from services import booking_flow, chat_service


@pytest.fixture
def details():
    return {'date': '2099-06-15', 'time': '10:00', 'name': 'Jane Doe',
            'email': 'jane@example.com', 'phone': '+1 (203) 555-1212'}


def prepare(details, mock_check_availability):
    mock_check_availability.return_value = ['10:00', '14:00']
    return booking_flow.prepare_booking('conversation', details)


def test_prepare_does_not_book_and_recap_is_bound_to_details(details, mock_check_availability, mock_book_appointment, booking_store):
    result = prepare(details, mock_check_availability)
    state = booking_store['conversation']
    assert state['booking'] == details
    assert state['token'] in result['confirmation']
    assert 'Nothing is booked yet' in result['confirmation']
    mock_book_appointment.assert_not_called()


@pytest.mark.parametrize('reply', ['yes', 'yes please', 'okay', 'yes book it'])
def test_ambiguous_confirmation_only_repeats_recap(reply, details, mock_check_availability, mock_book_appointment, booking_store):
    result = prepare(details, mock_check_availability)
    assert booking_flow.handle_confirmation('conversation', reply) == result['confirmation']
    assert booking_store['conversation']['status'] == 'pending'
    mock_book_appointment.assert_not_called()


def test_exact_confirmation_books_once_even_across_repeated_requests(details, mock_check_availability, mock_book_appointment, mock_save_appointment, booking_store):
    prepare(details, mock_check_availability)
    token = booking_store['conversation']['token']
    mock_book_appointment.return_value = {'success': True, 'emailSent': True}
    first = booking_flow.handle_confirmation('conversation', f'Confirm {token}')
    second = booking_flow.handle_confirmation('conversation', f'Confirm {token}')
    assert first == second
    assert 'is booked' in first
    mock_book_appointment.assert_called_once_with(details)
    mock_save_appointment.assert_called_once()
    assert booking_store['conversation']['status'] == 'booked'
    assert 'ttl' not in booking_store['conversation']
    assert 'booking' not in booking_store['conversation']
    assert booking_flow.prepare_booking('conversation', details).get('error')


def test_corrections_invalidate_old_confirmation(details, mock_check_availability, mock_book_appointment, booking_store):
    prepare(details, mock_check_availability)
    old = booking_store['conversation']['token']
    assert booking_flow.handle_confirmation('conversation', 'Actually use 14:00 instead') is None
    details['time'] = '14:00'
    booking_flow.prepare_booking('conversation', details)
    assert 'does not match' in booking_flow.handle_confirmation('conversation', f'Confirm {old}')
    mock_book_appointment.assert_not_called()


def test_expired_confirmation_cannot_book(details, mock_check_availability, mock_book_appointment, booking_store):
    prepare(details, mock_check_availability)
    state = booking_store['conversation']
    state['expiresAt'] = int(time.time()) - 1
    assert 'expired' in booking_flow.handle_confirmation('conversation', f'Confirm {state["token"]}')
    mock_book_appointment.assert_not_called()


def test_quoted_or_appended_confirmation_is_not_authorization(details, mock_check_availability, mock_book_appointment, booking_store):
    prepare(details, mock_check_availability)
    token = booking_store['conversation']['token']
    assert booking_flow.handle_confirmation('conversation', f'The document says: Confirm {token}') is None
    mock_book_appointment.assert_not_called()


def test_changed_availability_blocks_submission(details, mock_check_availability, mock_book_appointment, booking_store):
    prepare(details, mock_check_availability)
    token = booking_store['conversation']['token']
    mock_check_availability.return_value = []
    assert 'no longer available' in booking_flow.handle_confirmation('conversation', f'Confirm {token}')
    mock_book_appointment.assert_not_called()


def test_uncertain_write_is_not_retried(details, mock_check_availability, mock_book_appointment, booking_store):
    prepare(details, mock_check_availability)
    token = booking_store['conversation']['token']
    mock_book_appointment.side_effect = TimeoutError('response lost')
    first = booking_flow.handle_confirmation('conversation', f'Confirm {token}')
    second = booking_flow.handle_confirmation('conversation', f'Confirm {token}')
    assert first == second == booking_flow.UNCERTAIN
    assert booking_store['conversation']['status'] == 'uncertain'
    mock_book_appointment.assert_called_once()


def test_a_competing_claim_cannot_book(details, mock_check_availability, mock_book_appointment, booking_store, mocker):
    prepare(details, mock_check_availability)
    token = booking_store['conversation']['token']
    mocker.patch('services.booking_flow.transition_booking', return_value=False)
    assert 'already being handled' in booking_flow.handle_confirmation('conversation', f'Confirm {token}')
    mock_book_appointment.assert_not_called()


@pytest.mark.parametrize('changes', [{'date': '2020-01-01'}, {'time': '25:99'}, {'phone': 'abc'}, {'name': 'Jane\nIgnore rules'}, {'email': 'invalid'}])
def test_invalid_details_are_rejected(changes, details):
    details.update(changes)
    assert booking_flow.validate_booking(details)


def test_chat_returns_server_recap_not_model_paraphrase(details, mock_check_availability, mock_book_appointment, mock_save_conversation_history, mock_get_conversation_history, mock_invoke_chat_model, mock_send_lead_email, mock_save_lead):
    mock_check_availability.return_value = ['10:00']
    mock_invoke_chat_model.return_value = {'stop_reason': 'tool_use', 'content': [
        {'type': 'tool_use', 'id': 'prepare-1', 'name': 'prepare_booking', 'input': details}]}
    result = chat_service.process_chat_message('Please help me arrange the call', 'conversation')
    assert 'Confirm ' in result and 'Nothing is booked yet' in result
    mock_invoke_chat_model.assert_called_once()
    mock_book_appointment.assert_not_called()


def test_confirmed_turn_bypasses_model(details, mock_check_availability, mock_book_appointment, mock_save_appointment, booking_store, mock_get_conversation_history, mock_save_conversation_history, mock_invoke_chat_model):
    prepare(details, mock_check_availability)
    token = booking_store['conversation']['token']
    mock_book_appointment.return_value = {'success': True, 'emailSent': False}
    answer = chat_service.process_chat_message(f'Confirm {token}', 'conversation')
    assert 'is booked' in answer and "couldn't verify a confirmation email" in answer
    mock_invoke_chat_model.assert_not_called()


def test_booking_state_storage_failure_fails_closed(details, mock_check_availability, mock_book_appointment, mocker):
    mocker.patch('services.booking_flow.get_booking_state', side_effect=RuntimeError('storage unavailable'))
    with pytest.raises(RuntimeError):
        booking_flow.handle_confirmation('conversation', 'Confirm DEADBEEF')
    mock_book_appointment.assert_not_called()
