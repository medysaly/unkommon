# Chatbot conversation evaluations

`cases.json` covers service knowledge, pricing follow-ups, avoiding unnecessary
AI, RAG permissions, private deployment claims, declined calls, unsupported
compliance/ROI claims, pasted instructions, unavailable browsing, handover,
calendar failures, and booking preparation.

`harness.py` runs against the configured model through an injected async Bedrock
Converse callable. Use the current `SYSTEM_PROMPT`, `TOOLS`, and production model
ID. Run two trials per case and review the response text as well as automated
checks. Model output varies: this is a regression sample, not proof of safety.
Pass the production `format_response` function as the harness's `formatter`
argument so checks measure the delivered response. Reports retain `raw_text`
alongside the formatted text to make formatting corrections visible.

These cases use an explicit evaluation date of 2026-10-21 and synthetic contact
details. Update the date and future booking scenarios when repeating later.

All tools are simulated. The harness never calls the real calendar, sends email,
or writes customer data. `prepare_booking` is inspected as a proposed tool call;
the server's confirmation and at-most-once behavior are tested separately in
`tests/test_booking_flow.py` and `tests/test_booking_state_repo.py`.

Run deterministic tests from `backend/chatbot` with `python -m pytest -q`.
Live evaluations incur model inference charges. Record the exact model, prompt
hash, date, trial count, and results when running them.

The dated initial and final result files document this release's before/after
regression runs. These are synthetic samples, not customer conversations.
