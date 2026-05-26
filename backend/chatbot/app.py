"""Lambda entry point for the chatbot API.

This is a thin shim. All real logic lives in the layered architecture
under handlers/, services/, data/, and domain/.

SAM is configured to call lambda_handler in this file
(see backend/template.yaml: Handler: app.lambda_handler), so we keep
this entry point at the same path to preserve the existing deployment
with zero infrastructure changes.
"""

from handlers.chat_handler import handle_chat_request


def lambda_handler(event, context):
    return handle_chat_request(event, context)
