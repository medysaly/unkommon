"""Tests for the FAQ intent Trie (domain/intent_trie.py).

Pure unit tests for the data structure and matching logic. No mocks are
needed because the Trie has no external dependencies: it only maps known
phrasings to fixed answers in memory.
"""

from domain.intent_trie import IntentTrie, build_intent_trie, normalize


def test_normalize_lowercases_and_strips_punctuation():
    """Casing and punctuation are flattened so matching is forgiving."""
    assert normalize("Where ARE you, based?!") == "where are you based"


def test_insert_and_exact_match():
    """A pattern that was inserted is found exactly."""
    trie = IntentTrie()
    trie.insert("where are you", "We are in Stamford.")
    assert trie.match("where are you") == "We are in Stamford."


def test_match_is_case_and_punctuation_insensitive():
    """The same question with different casing and a '?' still matches."""
    trie = IntentTrie()
    trie.insert("where are you", "We are in Stamford.")
    assert trie.match("Where are you?") == "We are in Stamford."


def test_unknown_message_returns_none():
    """A message with no known prefix returns None (will go to the LLM)."""
    trie = IntentTrie()
    trie.insert("where are you", "We are in Stamford.")
    assert trie.match("can you migrate my database") is None


def test_longest_prefix_wins():
    """A longer, more specific pattern overrides a shorter one."""
    trie = IntentTrie()
    trie.insert("what do you do", "Short answer.")
    trie.insert("what do you do for healthcare", "Healthcare answer.")
    assert trie.match("what do you do for healthcare") == "Healthcare answer."


def test_extra_trailing_words_keep_the_match():
    """Unknown words after a full match do not discard the match."""
    trie = IntentTrie()
    trie.insert("where are you based", "We are in Stamford.")
    assert trie.match("where are you based exactly") == "We are in Stamford."


def test_built_trie_answers_real_faqs():
    """The production Trie answers real FAQs and misses non-FAQs."""
    trie = build_intent_trie()
    assert "Stamford" in trie.match("where are you based")
    assert "contact@unkommon.ai" in trie.match("how do I contact you")
    assert trie.match("hello there") is None


def test_exact_faq_match_accepts_case_and_punctuation():
    trie = build_intent_trie()
    assert "modern websites" in trie.match("What services do you offer?", exact=True)


def test_exact_faq_match_preserves_project_qualifiers():
    trie = build_intent_trie()
    assert trie.match("what do you do for customer portals", exact=True) is None
    assert trie.match("how much does it cost to connect our CRM", exact=True) is None


def test_exact_match_does_not_return_a_shorter_prefix():
    trie = IntentTrie()
    trie.insert("what do you do", "General services")
    trie.insert("what do you do for healthcare", "Healthcare services")
    assert trie.match("what do you do for", exact=True) is None
    assert trie.match("what do you do for healthcare", exact=True) == "Healthcare services"






