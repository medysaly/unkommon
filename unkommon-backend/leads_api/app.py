import json
import boto3
from datetime import datetime, timedelta
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
leads_table = dynamodb.Table('unkommon-leads')

# Helper to convert Decimal to int/float for JSON
def decimal_default(obj):
    if isinstance(obj, Decimal):
        return int(obj) if obj % 1 == 0 else float(obj)
    raise TypeError

def lambda_handler(event, context):
    """
    GET /api/leads - Return all leads with stats
    """
    
    try:
        # Scan all leads from DynamoDB
        response = leads_table.scan()
        leads = response.get('Items', [])
        
        # Sort by createdAt descending (newest first)
        leads.sort(key=lambda x: x.get('createdAt', 0), reverse=True)
                # Convert createdAt from seconds to milliseconds for frontend
        for lead in leads:
            if 'createdAt' in lead:
                lead['createdAt'] = lead['createdAt'] * 1000

        
        # Calculate stats
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
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'GET,OPTIONS'
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
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
