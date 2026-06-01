"""Benchmark for the FAQ intent Trie enhancement.

Standalone measurement script (NOT part of the deployed Lambda, NOT a test).
Run it by hand to produce the before/after numbers for the capstone narrative:

  1. Trie lookup latency  -> measured here (real microseconds)
  2. Share of a sample the Trie handles -> measured here (on this sample)
  3. Bedrock latency and cost saved -> computed from documented assumptions

Run from backend/chatbot:
    python benchmark_intent_trie.py
"""

import time

from domain.intent_trie import build_intent_trie


# --- Assumptions, stated explicitly so the narrative stays honest -----------
# Typical end-to-end Bedrock call latency for this chatbot. In production this
# would come from CloudWatch; here it is a documented assumption based on the
# observed 200-400 ms range.
BEDROCK_LATENCY_MS = 300.0

# Approximate Bedrock cost per chat turn (cached system prompt + short message).
# A documented assumption; the real figure comes from the AWS Cost Explorer
# line item for Bedrock.
BEDROCK_COST_PER_CALL_USD = 0.004


# A representative mix of inbound messages: common FAQs plus questions that
# genuinely need the LLM. The handled share depends on this mix, so it is
# reported "on this sample", not as a universal number.
SAMPLE_MESSAGES = [
    # FAQ-style (expected to be handled by the Trie)
    "where are you based?",
    "Where are you located",
    "what services do you offer",
    "what do you do",
    "how do I contact you",
    "what is your email",
    "how much does it cost",
    "what are your prices",
    # Real questions (expected to fall through to Bedrock)
    "can you migrate my postgres database to AWS?",
    "do you build HIPAA-aware pipelines for a clinic?",
    "I need a multi-agent system for document processing",
    "can we book a call next Tuesday?",
    "what models do you use for RAG?",
    "how would you reduce our inference costs?",
]


def measure_trie_latency(trie, iterations=100_000):
    """Average Trie lookup time in microseconds over many iterations."""
    msg = "where are you based?"
    start = time.perf_counter()
    for _ in range(iterations):
        trie.match(msg)
    elapsed = time.perf_counter() - start
    return (elapsed / iterations) * 1_000_000  # seconds -> microseconds


def measure_handled_share(trie, messages):
    """How many sample messages the Trie answers without the LLM."""
    handled = sum(1 for m in messages if trie.match(m) is not None)
    return handled, len(messages)


def main():
    trie = build_intent_trie()

    avg_us = measure_trie_latency(trie)
    handled, total = measure_handled_share(trie, SAMPLE_MESSAGES)
    share = handled / total

    trie_ms = avg_us / 1000.0
    before_ms = BEDROCK_LATENCY_MS
    after_ms = share * trie_ms + (1 - share) * BEDROCK_LATENCY_MS

    before_cost = 1000 * BEDROCK_COST_PER_CALL_USD
    after_cost = 1000 * (1 - share) * BEDROCK_COST_PER_CALL_USD

    print("=== Intent Trie benchmark ===")
    print(f"Measured Trie lookup latency:  {avg_us:.2f} microseconds ({trie_ms:.4f} ms)")
    print(f"Sample messages:               {total}")
    print(f"Handled by Trie (no LLM):      {handled} ({share*100:.0f}% of sample)")
    print()
    print("--- Assumptions (documented) ---")
    print(f"Bedrock call latency:          {BEDROCK_LATENCY_MS:.0f} ms")
    print(f"Bedrock cost per call:         ${BEDROCK_COST_PER_CALL_USD:.4f}")
    print()
    print("--- Average latency per request ---")
    print(f"Before (all to Bedrock):       {before_ms:.1f} ms")
    print(f"After (Trie + Bedrock):        {after_ms:.1f} ms")
    print(f"Reduction:                     {(1 - after_ms / before_ms) * 100:.0f}%")
    print()
    print("--- Cost per 1,000 conversations ---")
    print(f"Before:                        ${before_cost:.2f}")
    print(f"After:                         ${after_cost:.2f}")
    print(f"Saved:                         ${before_cost - after_cost:.2f}")


if __name__ == "__main__":
    main()
