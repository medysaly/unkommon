from domain.response_format import format_response


def test_em_dashes_and_literal_bold_are_removed():
    assert format_response('Hello — **here is the answer**.') == 'Hello, here is the answer.'


def test_urls_and_confirmation_codes_are_preserved():
    text = 'Confirm ABCD1234. See https://www.unkommon.ai/book-a-call.'
    assert format_response(text) == text
