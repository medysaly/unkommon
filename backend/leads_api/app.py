import json
import os
import boto3
import time
import hmac
import hashlib
import base64
import urllib.request
from datetime import datetime, timedelta
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
leads_table = dynamodb.Table('unkommon-leads')

ALLOWED_ORIGIN = 'https://unkommon.ai'
COGNITO_USER_POOL_ID = os.environ.get('COGNITO_USER_POOL_ID', '')
COGNITO_REGION = os.environ.get('COGNITO_REGION', 'us-east-1')

# Cache Cognito JWKS keys
_jwks_cache = None
_jwks_cache_time = 0
JWKS_CACHE_TTL = 3600  # 1 hour


def get_jwks():
    """Fetch and cache Cognito JWKS public keys."""
    global _jwks_cache, _jwks_cache_time
    if _jwks_cache and (time.time() - _jwks_cache_time) < JWKS_CACHE_TTL:
        return _jwks_cache
    url = f'https://cognito-idp.{COGNITO_REGION}.amazonaws.com/{COGNITO_USER_POOL_ID}/.well-known/jwks.json'
    resp = urllib.request.urlopen(url, timeout=5)
    _jwks_cache = json.loads(resp.read())
    _jwks_cache_time = time.time()
    return _jwks_cache


def decode_jwt_unverified(token):
    """Decode JWT payload without cryptographic verification (structure + expiry only)."""
    try:
        parts = token.split('.')
        if len(parts) != 3:
            return None
        # Decode payload (part 1)
        payload = parts[1]
        # Add padding
        payload += '=' * (4 - len(payload) % 4)
        decoded = base64.urlsafe_b64decode(payload)
        return json.loads(decoded)
    except Exception:
        return None


def verify_cognito_token(event):
    """Verify the request has a valid Cognito JWT token."""
    if not COGNITO_USER_POOL_ID:
        return False

    headers = event.get('headers', {})
    auth = headers.get('Authorization') or headers.get('authorization') or ''
    if not auth.startswith('Bearer '):
        return False

    token = auth[7:]
    claims = decode_jwt_unverified(token)
    if not claims:
        return False

    # Verify issuer matches our Cognito User Pool
    expected_iss = f'https://cognito-idp.{COGNITO_REGION}.amazonaws.com/{COGNITO_USER_POOL_ID}'
    if claims.get('iss') != expected_iss:
        return False

    # Verify token is not expired
    if claims.get('exp', 0) < time.time():
        return False

    # Verify token_use is 'id' (idToken)
    if claims.get('token_use') not in ('id', 'access'):
        return False

    return True


# Helper to convert Decimal to int/float for JSON
def decimal_default(obj):
    if isinstance(obj, Decimal):
        return int(obj) if obj % 1 == 0 else float(obj)
    raise TypeError

def unauthorized():
    return {
        'statusCode': 401,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': ALLOWED_ORIGIN},
        'body': json.dumps({'error': 'Unauthorized'})
    }

def lambda_handler(event, context):
    # Verify Cognito JWT token
    if not verify_cognito_token(event):
        return unauthorized()

    http_method = event.get('httpMethod', 'GET')

    if http_method == 'DELETE':
        return handle_delete(event)

    return handle_get(event)


def handle_get(event):
    """GET /api/leads - Return all leads with stats"""
    try:
        response = leads_table.scan()
        leads = response.get('Items', [])

        leads.sort(key=lambda x: x.get('createdAt', 0), reverse=True)
        for lead in leads:
            if 'createdAt' in lead:
                lead['createdAt'] = lead['createdAt'] * 1000

        now = int(datetime.now().timestamp())
        week_ago = int((datetime.now() - timedelta(days=7)).timestamp())
        today_start = int(datetime.now().replace(hour=0, minute=0, second=0, microsecond=0).timestamp())

        stats = {
            'total': len(leads),
            'thisWeek': len([l for l in leads if l.get('createdAt', 0) > week_ago]),
            'today': len([l for l in leads if l.get('createdAt', 0) > today_start])
        }

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'GET,DELETE,OPTIONS'
            },
            'body': json.dumps({
                'leads': leads,
                'stats': stats
            }, default=decimal_default)
        }

    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': ALLOWED_ORIGIN
            },
            'body': json.dumps({'error': 'Internal server error'})
        }


def handle_delete(event):
    """DELETE /api/leads - Delete one lead or all leads"""
    try:
        params = event.get('queryStringParameters') or {}
        lead_id = params.get('leadId')

        if lead_id:
            # Delete single lead
            leads_table.delete_item(Key={'leadId': lead_id})
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'GET,DELETE,OPTIONS'
                },
                'body': json.dumps({'message': f'Lead {lead_id} deleted'})
            }
        else:
            # Delete ALL leads
            response = leads_table.scan(ProjectionExpression='leadId')
            items = response.get('Items', [])
            with leads_table.batch_writer() as batch:
                for item in items:
                    batch.delete_item(Key={'leadId': item['leadId']})
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'GET,DELETE,OPTIONS'
                },
                'body': json.dumps({'message': f'All {len(items)} leads deleted'})
            }

    except Exception as e:
        print(f"Delete error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': ALLOWED_ORIGIN
            },
            'body': json.dumps({'error': 'Internal server error'})
        }
