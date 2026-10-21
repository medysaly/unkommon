"""Keep approved website knowledge and the chatbot's limits aligned."""

from domain.system_prompt import SYSTEM_PROMPT


def test_prompt_covers_current_homepage_faq_delivery_details():
    for fact in (
        "Hosting, software subscriptions, and any ongoing support are discussed separately",
        "access, content, and decisions needed from the client",
        "not included indefinitely by default",
        "do not need a technical brief",
        "design and implementation with client input",
    ):
        assert fact in SYSTEM_PROMPT


def test_prompt_explains_all_document_intake_examples_without_claiming_live_tools():
    for example in ("invoices (", "customer emails (", "contracts (", "form submissions ("):
        assert example in SYSTEM_PROMPT
    assert "not automated legal approval" in SYSTEM_PROMPT
    assert "not a live upload, functioning product demo, or evidence of past client results" in SYSTEM_PROMPT


def test_prompt_keeps_current_services_and_conversation_rules():
    for service in (
        "AI Knowledge Search &amp; RAG Systems",
        "AI Agents &amp; Agentic Workflows",
        "Private AI Deployment & Model Operations",
        "Automated Estimates &amp; Proposals",
        "Customer Support That Takes Action",
    ):
        assert service in SYSTEM_PROMPT
    assert 'The offer is "Book a free 30-minute call."' in SYSTEM_PROMPT
    assert "Never use em dashes" in SYSTEM_PROMPT
    assert "Do not invent prices, price ranges, delivery dates, or fixed packages" in SYSTEM_PROMPT
