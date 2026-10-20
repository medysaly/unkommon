"""Intent classification via a Trie (prefix tree).

This module is the Algorithms and Data Structures enhancement for the
Unkommon chatbot. It adds a fast, deterministic FAQ layer that runs BEFORE
the Bedrock LLM call in services/chat_service.py.

Why a Trie:
- Common questions ("where are you based", "what services do you offer")
  have fixed, correct answers that never need an LLM.
- A Trie matches a normalized message against known FAQ patterns in O(m)
  time, where m is the number of words in the message. Each step is a single
  dictionary lookup, so matching does not slow down as we add more patterns.
- Routing these messages to a precomputed answer skips a 200-400 ms Bedrock
  call and its per-token cost, and removes LLM variability for questions that
  should always get the same answer.

This file holds only static knowledge (the patterns and their answers) plus
the data structure, so it lives in the domain layer alongside system_prompt.py
and tools.py. It has no AWS, HTTP, or I/O dependencies.
"""

import re


def normalize(text):
    """Lowercase, strip punctuation, and collapse whitespace to single spaces.

    Normalizing both the stored patterns and the incoming message means small
    differences like capitalization or a trailing question mark do not break a
    match. "Where are you based?" and "where are you based" become identical.
    """
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s]", " ", text)  # drop punctuation
    text = re.sub(r"\s+", " ", text)          # collapse runs of whitespace
    return text.strip()


class TrieNode:
    """A single node in the Trie.

    children maps a word (token) to the next TrieNode. response holds the
    canned answer if a complete FAQ pattern ends at this node, else None.
    """

    def __init__(self):
        self.children = {}
        self.response = None


class IntentTrie:
    """A word-level Trie mapping known FAQ phrasings to fixed answers."""

    def __init__(self):
        self.root = TrieNode()

    def insert(self, pattern, response):
        """Store one FAQ pattern and the answer it should return.

        Walks the pattern token by token, creating nodes as needed, then marks
        the final node with the response. Runs in O(k) for a k-word pattern.
        """
        node = self.root
        for token in normalize(pattern).split():
            if token not in node.children:
                node.children[token] = TrieNode()
            node = node.children[token]
        node.response = response

    def match(self, message, *, exact=False):
        """Return the answer for the longest known pattern the message starts
        with, or None if nothing matches. With exact=True, require the entire
        normalized message to match so a canned FAQ cannot swallow a qualifier.

        Walks the message token by token. Each time we land on a node that ends
        a known pattern, we remember its response, then keep going so a longer,
        more specific pattern can override a shorter one. We stop as soon as a
        token is not a known continuation. Runs in O(m) for an m-word message,
        each step a single dict lookup.
        """
        node = self.root
        last_match = None
        for token in normalize(message).split():
            if token in node.children:
                node = node.children[token]
                if node.response is not None:
                    last_match = node.response
            else:
                if exact:
                    return None
                break
        return node.response if exact else last_match


# FAQ patterns grouped by intent. Each answer matches Riley's house style:
# short, plain sentences, no markdown, no lists. Every fact is taken straight
# from domain/system_prompt.py so the canned answers stay honest and
# consistent with what the LLM would otherwise say.
FAQ_INTENTS = [
    {
        "answer": (
            "We're based in Stamford, Connecticut, and work with clients "
            "locally and remotely."
        ),
        "patterns": [
            "where are you based",
            "where are you located",
            "where are you",
            "what is your location",
            "where is unkommon based",
            "are you remote",
        ],
    },
    {
        "answer": (
            "You can email contact@unkommon.ai or call +1 (203) 680-9629. "
            "If you'd like to talk through a project, you can book a free "
            "30-minute call at https://www.unkommon.ai/book-a-call."
        ),
        "patterns": [
            "how do i contact you",
            "how can i contact you",
            "how do i reach you",
            "what is your email",
            "how do i get in touch",
            "contact info",
        ],
    },
    {
        "answer": (
            "We build modern websites, custom software, AI applications, "
            "internal tools, customer portals, and cloud backends. We also "
            "automate workflows, document and email processing, and connect "
            "business systems, including CRM tools, chatbots, and voice agents."
        ),
        "patterns": [
            "what services do you offer",
            "what services do you provide",
            "what do you offer",
            "what do you do",
            "what can you do",
            "tell me about your services",
        ],
    },
    {
        "answer": (
            "Pricing depends on what you need built and which systems are "
            "involved. Scope and pricing are agreed before work starts. "
            "What are you looking to build or improve?"
        ),
        "patterns": [
            "how much does it cost",
            "how much do you charge",
            "what does it cost",
            "what are your prices",
            "what is the price",
            "how much is it",
        ],
    },
]


def build_intent_trie():
    """Build and return the FAQ Trie with every pattern inserted.

    Called once when the chat service module loads, so the Trie is built a
    single time per warm Lambda instance and reused across requests.
    """
    trie = IntentTrie()
    for intent in FAQ_INTENTS:
        for pattern in intent["patterns"]:
            trie.insert(pattern, intent["answer"])
    return trie
