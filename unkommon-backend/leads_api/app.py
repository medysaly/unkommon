import json
import os
import boto3
from datetime import datetime, timedelta
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
leads_table = dynamodb.Table('unkommon-leads')

ADMIN_API_KEY = os.environ.get('ADMIN_API_KEY', '')
ALLOWED_ORIGIN = 'https://unkommon.ai'

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
    # Verify API key
    headers = event.get('headers', {})
    auth = headers.get('Authorization') or headers.get('authorization') or ''
    token = auth.replace('Bearer ', '') if auth.startswith('Bearer ') else ''
    if not ADMIN_API_KEY or token != ADMIN_API_KEY:
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
