"""Request-level security guards for the chatbot.

Three guards run before the chat service is called:
- check_prompt_injection: matches user messages against known injection patterns
- check_global_budget: enforces an hourly cap on total chatbot requests
- get_cors_origin: resolves the CORS Access-Control-Allow-Origin header

If a guard fails, the handler should short-circuit the request without
spending Bedrock tokens or hitting DynamoDB.
"""

import re
import time




# Prompt injection detection patterns
INJECTION_PATTERNS = [
    r'ignore\s+(all\s+)?(previous|prior|above|earlier)\s+(instructions|prompts|rules)',
    r'disregard\s+(your|all|any)\s+(instructions|rules|guidelines|prompt)',
    r'(you\s+are|act\s+as|pretend\s+(to\s+be|you\'?re)|role\s*-?\s*play\s+as)\s+(DAN|evil|unfiltered|jailbreak)',
    r'(reveal|show|output|print|display|repeat|echo)\s+(your|the)\s+(system\s+)?(prompt|instructions|rules)',
    r'translate\s+(your|the)\s+(system\s+)?(prompt|instructions)\s+(to|into)',
    r'(what|tell\s+me)\s+(are|were)\s+your\s+(initial|system|original)\s+(instructions|prompt|rules)',
    r'(encode|base64|hex|rot13|reverse)\s+(your|the)\s+(prompt|instructions)',
    r'\bsystem\s*:\s*',
    r'\b(ADMIN|OVERRIDE|SUDO|ROOT)\s*(MODE|ACCESS|COMMAND)',
]
_compiled_injection_patterns = [re.compile(p, re.IGNORECASE) for p in INJECTION_PATTERNS]


def check_prompt_injection(message):
    """Return True if the message contains prompt injection patterns."""
    for pattern in _compiled_injection_patterns:
        if pattern.search(message):
            return True
    return False


# Global hourly request budget (prevents multi-IP cost abuse)
HOURLY_REQUEST_BUDGET = 200  # max total chatbot requests per hour across all users
_request_counter = {'count': 0, 'window_start': 0}


def check_global_budget():
    """Return True if within budget, False if hourly budget is exceeded."""
    now = time.time()
    window = 3600  # 1 hour
    if now - _request_counter['window_start'] > window:
        _request_counter['count'] = 0
        _request_counter['window_start'] = now
    if _request_counter['count'] >= HOURLY_REQUEST_BUDGET:
        return False
    _request_counter['count'] += 1
    return True


ALLOWED_ORIGINS = {'https://unkommon.ai', 'https://www.unkommon.ai'}

def get_cors_origin(event):
    """Return the matching CORS origin for the request, or the default."""
    headers = event.get('headers', {}) if event else {}
    origin = headers.get('origin', '') or headers.get('Origin', '')
    if origin in ALLOWED_ORIGINS:
        return origin
    return 'https://unkommon.ai'