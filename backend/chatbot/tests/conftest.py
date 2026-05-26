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

    chat_service holds two in-memory state containers:
    - _conversation_bookings: dict tracking bookings per conversation
    - _notified_conversations: set of conversation IDs already notified

    Without resetting between tests, state from one test would leak into
    the next, causing flaky and order-dependent results.

    autouse=True means pytest runs this for every test automatically.
    """
    chat_service._conversation_bookings.clear()
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
    return mocker.patch('services.chat_service.check_availability')


@pytest.fixture
def mock_book_appointment(mocker):
    """Replace the calendar API booking with a mock."""
    return mocker.patch('services.chat_service.book_appointment')


@pytest.fixture
def mock_send_lead_email(mocker):
    """Replace the Resend email send with a mock that returns True."""
    mock = mocker.patch('services.chat_service.send_lead_email')
    mock.return_value = True
    return mock
