"""Small, deterministic plain-text guarantees, not a substitute for model evals."""

import re


def format_response(text):
    text = re.sub(r"\s*\u2014\s*", ", ", text)
    text = re.sub(r"\*\*(.+?)\*\*", r"\1", text, flags=re.DOTALL)
    return text.strip()
