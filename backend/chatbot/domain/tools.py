"""Tool schemas for the Unkommon chatbot.

These define the tools that Claude can call during a conversation:
- check_availability: query open appointment slots for a given date
- prepare_booking: prepare a server-owned confirmation, without booking

The schemas follow the Anthropic Tool Use format using JSON Schema for the
input specs. Keeping them in their own file makes it easy to add or modify
tools without touching the chat service logic.
"""

# Define tools for the AI to use
TOOLS = [

    {
        "name": "check_availability",
        "description": "Check available free 30-minute call slots for a date in Eastern Time (America/New_York). Use only when the visitor asks about availability or wants to arrange a call. Returned HH:MM times are the available slots for that date; do not invent alternatives.",
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
        "name": "prepare_booking",
        "description": "Prepare a free 30-minute call for the visitor to review. This does NOT create an appointment. Use only when the visitor wants to book and has supplied their full name, email, phone, and a selected available date and time. The server verifies the details and returns an exact recap and confirmation code; the visitor must confirm that code in a later message. Do not invent contact details or claim that preparation means the call is booked.",
        "input_schema": {
            "type": "object",
            "properties": {
                "date": {"type": "string", "description": "Date in YYYY-MM-DD format"},
                "time": {"type": "string", "description": "An available slot returned by check_availability for the selected date, in HH:MM format (24-hour), Eastern Time (America/New_York)"},
                "name": {"type": "string", "description": "Customer's full name"},
                "email": {"type": "string", "description": "Customer's email address"},
                "phone": {"type": "string", "description": "Customer's phone number"}
            },
            "required": ["date", "time", "name", "email", "phone"]
        }
    }
]
