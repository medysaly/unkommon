"""Tool schemas for the Unkommon chatbot.

These define the tools that Claude can call during a conversation:
- check_availability: query open appointment slots for a given date
- book_appointment: book a 30-minute consultation

The schemas follow the Anthropic Tool Use format using JSON Schema for the
input specs. Keeping them in their own file makes it easy to add or modify
tools without touching the chat service logic.
"""

# Define tools for the AI to use
TOOLS = [

    {
        "name": "check_availability",
        "description": "Check available appointment slots for a specific date. Use this when someone wants to book a call or see when you're available.",
        "input_schema": {
            "type": "object",
            "properties": {
                "date": {
                    "type": "string",
                    "description": "The date to check in YYYY-MM-DD format"
                }
            },
            "required": ["date"]
        }
    },
    {
        "name": "book_appointment",
        "description": "Book a 30-minute consultation appointment. Use this after getting the customer's name, email, phone, and preferred time.",
        "input_schema": {
            "type": "object",
            "properties": {
                "date": {"type": "string", "description": "Date in YYYY-MM-DD format"},
                "time": {"type": "string", "description": "Time in HH:MM format (24-hour)"},
                "name": {"type": "string", "description": "Customer's full name"},
                "email": {"type": "string", "description": "Customer's email address"},
                "phone": {"type": "string", "description": "Customer's phone number"}
            },
            "required": ["date", "time", "name", "email", "phone"]
        }
    }
]