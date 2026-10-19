"""Tests for the chat service business logic.

Five tests covering the highest-value behaviors of services/chat_service.py:
- Normal message flow (happy path)
- Tool-calling flow (multi-turn)
- Booking limit enforcement (business rule)
- Lead notification deduplication (business rule)
- Tool parameter validation (input validation)

All external dependencies (Bedrock, DynamoDB, calendar API, Resend) are mocked
via fixtures in conftest.py. These tests exercise only the service-layer logic.
"""

from services import chat_service


def test_process_chat_message_returns_response(
    mock_invoke_chat_model,
    mock_get_conversation_history,
    mock_save_conversation_history,
    mock_send_lead_email,
):
    """Happy path: Bedrock returns plain text, service returns it and saves the conversation."""
    # ARRANGE
    mock_invoke_chat_model.return_value = {
        'stop_reason': 'end_turn',
        'content': [{'type': 'text', 'text': 'Hello! How can I help?'}],
    }

    # ACT
    result = chat_service.process_chat_message(
        user_message="hi",
        conversation_id="11111111-1111-1111-1111-111111111111",
    )

    # ASSERT
    assert result == 'Hello! How can I help?'
    mock_invoke_chat_model.assert_called_once()
    mock_save_conversation_history.assert_called_once()


def test_process_chat_message_handles_tool_call(
    mock_invoke_chat_model,
    mock_get_conversation_history,
    mock_save_conversation_history,
    mock_check_availability,
    mock_send_lead_email,
):
    """Bedrock returns tool_use, service executes the tool, Bedrock returns final text."""
    # ARRANGE: first Bedrock call returns tool_use, second returns end_turn
    mock_invoke_chat_model.side_effect = [
        {
            'stop_reason': 'tool_use',
            'content': [
                {
                    'type': 'tool_use',
                    'id': 'tool-call-1',
                    'name': 'check_availability',
                    'input': {'date': '2026-06-15'},
                },
            ],
        },
        {
            'stop_reason': 'end_turn',
            'content': [{'type': 'text', 'text': 'I have 10am and 2pm open. Which works?'}],
        },
    ]
    mock_check_availability.return_value = ['10:00', '14:00']

    # ACT
    result = chat_service.process_chat_message(
        user_message="when can I meet?",
        conversation_id="22222222-2222-2222-2222-222222222222",
    )

    # ASSERT
    assert result == 'I have 10am and 2pm open. Which works?'
    assert mock_invoke_chat_model.call_count == 2
    mock_check_availability.assert_called_once_with('2026-06-15')


def test_execute_tool_enforces_booking_limit(mock_book_appointment):
    """Second booking attempt in the same conversation is blocked before any API call."""
    # ARRANGE: simulate a previous successful booking for this conversation
    conversation_id = "33333333-3333-3333-3333-333333333333"
    chat_service._conversation_bookings[conversation_id] = 1

    booking_input = {
        'date': '2026-06-15',
        'time': '10:00',
        'name': 'Jane Doe',
        'email': 'jane@example.com',
        'phone': '203-555-1212',
    }

    # ACT
    result = chat_service.execute_tool('book_appointment', booking_input, conversation_id)

    # ASSERT
    assert 'already have an appointment booked' in result
    mock_book_appointment.assert_not_called()


def test_notify_chatbot_lead_dedupes_per_conversation(mock_send_lead_email, mock_save_lead):

    """A second lead notification for the same conversation does not send another email."""
    # ARRANGE
    user_message = "interested! my email is jane@example.com"
    ai_response = "Great, let's set up a call."
    conversation_id = "44444444-4444-4444-4444-444444444444"

    # ACT: call twice
    chat_service.notify_chatbot_lead(user_message, ai_response, conversation_id)
    chat_service.notify_chatbot_lead(user_message, ai_response, conversation_id)

    # ASSERT: only one email sent total
    mock_send_lead_email.assert_called_once()


def test_validate_tool_params_rejects_invalid_email():
    """Booking with a malformed email is rejected before any tool runs."""
    invalid_input = {
        'date': '2026-06-15',
        'time': '10:00',
        'name': 'Jane Doe',
        'email': 'not-a-real-email',
        'phone': '203-555-1212',
    }

    result = chat_service.validate_tool_params('book_appointment', invalid_input)

    assert result == 'Invalid email address.'

def test_non_faq_message_uses_bedrock(
    mock_invoke_chat_model,
    mock_get_conversation_history,
    mock_save_conversation_history,
    mock_send_lead_email,
):
    """A message with no FAQ match falls through to the Bedrock path."""
    # ARRANGE
    mock_invoke_chat_model.return_value = {
        'stop_reason': 'end_turn',
        'content': [{'type': 'text', 'text': 'Sure, here is how we would approach that.'}],
    }

    # ACT
    result = chat_service.process_chat_message(
        user_message="can you migrate my postgres database to AWS?",
        conversation_id="66666666-6666-6666-6666-666666666666",
    )

    # ASSERT: Bedrock handled it
    assert result == 'Sure, here is how we would approach that.'
    mock_invoke_chat_model.assert_called_once()



def test_faq_message_skips_bedrock(
    mock_invoke_chat_model,
    mock_get_conversation_history,
    mock_save_conversation_history,
    mock_send_lead_email,
):
    """An FAQ message is answered from the Trie and never calls Bedrock."""
    # ACT
    result = chat_service.process_chat_message(
        user_message="where are you based?",
        conversation_id="55555555-5555-5555-5555-555555555555",
    )

    # ASSERT: answered from the Trie, Bedrock was never called, turn was saved
    assert "Stamford" in result
    mock_invoke_chat_model.assert_not_called()
    mock_save_conversation_history.assert_called_once()


def test_qualified_faq_reaches_model_with_full_question(
    mock_invoke_chat_model,
    mock_get_conversation_history,
    mock_save_conversation_history,
):
    mock_invoke_chat_model.return_value = {
        'stop_reason': 'end_turn',
        'content': [{'type': 'text', 'text': 'A portal could give customers access to their documents.'}],
    }
    question = "what do you do for customer portals"

    result = chat_service.process_chat_message(question, "qualified-faq")

    assert result == 'A portal could give customers access to their documents.'
    mock_invoke_chat_model.assert_called_once()
    request = mock_invoke_chat_model.call_args.args[0]
    assert request['messages'][0] == {'role': 'user', 'content': question}


def test_followup_faq_reaches_model_with_prior_context(
    mock_invoke_chat_model,
    mock_get_conversation_history,
    mock_save_conversation_history,
):
    history = [
        {'role': 'user', 'content': 'We need a portal connected to our existing CRM.'},
        {'role': 'assistant', 'content': 'What would customers need to do inside it?'},
    ]
    mock_get_conversation_history.return_value = history.copy()
    mock_invoke_chat_model.return_value = {
        'stop_reason': 'end_turn',
        'content': [{'type': 'text', 'text': 'The portal scope and CRM connections determine the price.'}],
    }

    result = chat_service.process_chat_message('how much does it cost', 'followup-faq')

    assert result == 'The portal scope and CRM connections determine the price.'
    mock_invoke_chat_model.assert_called_once()
    request = mock_invoke_chat_model.call_args.args[0]
    assert request['messages'][:2] == history



def test_lead_message_is_saved(
    mock_invoke_chat_model,
    mock_get_conversation_history,
    mock_save_conversation_history,
    mock_send_lead_email,
    mock_save_lead,
):
    """A message containing contact info is persisted to the leads table."""
    # ARRANGE
    mock_invoke_chat_model.return_value = {
        'stop_reason': 'end_turn',
        'content': [{'type': 'text', 'text': 'Thanks, we will reach out.'}],
    }

    # ACT
    chat_service.process_chat_message(
        user_message="I'm interested, my email is jane@example.com",
        conversation_id="77777777-7777-7777-7777-777777777777",
    )

    # ASSERT: the lead was saved, with the captured email
    mock_save_lead.assert_called_once()
    assert mock_save_lead.call_args.kwargs['email'] == 'jane@example.com'


def test_successful_booking_is_saved(
    mock_invoke_chat_model,
    mock_get_conversation_history,
    mock_save_conversation_history,
    mock_book_appointment,
    mock_send_lead_email,
    mock_save_lead,
    mock_save_appointment,
):
    """A successful booking is persisted to the appointments table."""
    # ARRANGE: Bedrock asks to book, the booking succeeds, then Bedrock replies
    mock_invoke_chat_model.side_effect = [
        {
            'stop_reason': 'tool_use',
            'content': [{
                'type': 'tool_use',
                'id': 'tool-1',
                'name': 'book_appointment',
                'input': {
                    'date': '2026-06-20',
                    'time': '14:00',
                    'name': 'Jane Doe',
                    'email': 'jane@example.com',
                    'phone': '203-555-1212',
                },
            }],
        },
        {
            'stop_reason': 'end_turn',
            'content': [{'type': 'text', 'text': 'You are booked.'}],
        },
    ]
    mock_book_appointment.return_value = {'success': True, 'emailSent': True}

    # ACT
    chat_service.process_chat_message(
        user_message="book me for June 20 at 2pm",
        conversation_id="88888888-8888-8888-8888-888888888888",
    )

    # ASSERT: the appointment was saved, with the booked date
    mock_save_appointment.assert_called_once()
    assert mock_save_appointment.call_args.kwargs['date'] == '2026-06-20'
