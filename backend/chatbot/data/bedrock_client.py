"""Bedrock client wrapper for the chatbot.

This module wraps calls to AWS Bedrock for the Claude language model. The
service layer calls invoke_chat_model() to get a parsed model response
without needing to touch boto3 or know the model ID.
"""

import json
import boto3



# Initialize Bedrock client
bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-east-1')


MODEL_ID = 'global.anthropic.claude-sonnet-4-5-20250929-v1:0'

def invoke_chat_model(request_body):
    """Invoke the Claude model on Bedrock with the given request body.

    Returns the parsed response body as a dict.
    """
    response = bedrock_runtime.invoke_model(
        modelId=MODEL_ID,
        body=json.dumps(request_body)
    )
    return json.loads(response['body'].read())
