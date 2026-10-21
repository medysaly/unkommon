"""Shared pytest fixtures for the chatbot test suite.

This file is auto-discovered by pytest. Fixtures defined here are
available to every test file under tests/ without needing imports.
"""

import os

# Set required environment variables BEFORE importing service or data modules.
# data/calendar_client.py reads CALENDAR_API_URL at module load time and will
# raise KeyError if it's missing. setdefault doesn't overwrite existing env vars,
# so this won't interfere if real values happen to be set in the shell.
os.environ.setdefault('CALENDAR_API_URL', 'http://test-calendar-api.invalid')
os.environ.setdefault('RESEND_API_KEY', 'test-resend-key')
os.environ.setdefault('LEADS_NOTIFICATION_EMAIL', 'test@example.com')
os.environ.setdefault('AWS_DEFAULT_REGION', 'us-east-1')

import pytest

# Import service AFTER env vars are set. This triggers the data layer imports
# which need CALENDAR_API_URL above.
from services import chat_service


@pytest.fixture(autouse=True)
def reset_module_state():
    """Reset chat_service's module-level state between tests.

    Booking state is persisted separately; only lead-notification state is local.

    Without resetting between tests, state from one test would leak into
    the next, causing flaky and order-dependent results.

    autouse=True means pytest runs this for every test automatically.
    """
    chat_service._notified_conversations.clear()
    yield  # the test runs here; nothing to clean up after


@pytest.fixture
def mock_invoke_chat_model(mocker):
    """Replace the Bedrock invoke wrapper with a mock.

    Tests set the mock's return_value (single response) or side_effect
    (sequence of responses for multi-turn flows like tool use).
    """
    return mocker.patch('services.chat_service.invoke_chat_model')


@pytest.fixture
def mock_get_conversation_history(mocker):
    """Replace the DynamoDB read with a mock that returns an empty list."""
    mock = mocker.patch('services.chat_service.get_conversation_history')
    mock.return_value = []
    return mock


@pytest.fixture
def mock_save_conversation_history(mocker):
    """Replace the DynamoDB write with a no-op mock."""
    return mocker.patch('services.chat_service.save_conversation_history')


@pytest.fixture
def mock_check_availability(mocker):
    """Replace the calendar API availability check with a mock."""
    mock = mocker.patch('services.chat_service.check_availability')
    mocker.patch('services.booking_flow.check_availability', mock)
    return mock


@pytest.fixture
def mock_book_appointment(mocker):
    """Replace the calendar API booking with a mock."""
    return mocker.patch('services.booking_flow.book_appointment')


@pytest.fixture
def mock_send_lead_email(mocker):
    """Replace the Resend email send with a mock that returns True."""
    mock = mocker.patch('services.chat_service.send_lead_email')
    mock.return_value = True
    return mock



@pytest.fixture
def mock_save_lead(mocker):
    """Replace the leads-table write with a no-op mock."""
    return mocker.patch('services.chat_service.save_lead')


@pytest.fixture
def mock_save_appointment(mocker):
    """Replace the appointments-table write with a no-op mock."""
    return mocker.patch('services.booking_flow.save_appointment')


@pytest.fixture(autouse=True)
def booking_store(mocker):
    """Persistent-store contract fake, shared across simulated cold starts."""
    from copy import deepcopy
    store = {}

    def get(cid):
        return deepcopy(store.get(cid))

    def pending(cid, item, previous=None):
        current = store.get(cid)
        if current and (not previous or current['intentId'] != previous['intentId'] or current['status'] not in ('pending', 'cancelled')):
            return False
        store[cid] = dict(deepcopy(item), status='pending')
        return True

    def transition(cid, intent_id, expected, status, response=None):
        current = store.get(cid)
        if not current or current['intentId'] != intent_id or current['status'] != expected:
            return False
        current['status'] = status
        if response is not None:
            current['response'] = response
        if status in ('processing', 'uncertain', 'booked'):
            current.pop('ttl', None)
        if status in ('uncertain', 'booked'):
            for key in ('booking', 'recap', 'token'):
                current.pop(key, None)
        return True

    mocker.patch('services.booking_flow.get_booking_state', side_effect=get)
    mocker.patch('services.booking_flow.save_pending_booking', side_effect=pending)
    mocker.patch('services.booking_flow.transition_booking', side_effect=transition)
    return store
