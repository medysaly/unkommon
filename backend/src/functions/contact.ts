import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { getDb } from './db.js';
import { leads } from '../../../shared-types/schema.js';

const ses = new SESClient({ region: 'us-east-1' });

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const body = JSON.parse(event.body || '{}');
    const { name, email, phone, company, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Save to database
    const db = getDb();
    const [newLead] = await db
      .insert(leads)
      .values({
        name,
        email,
        phone: phone || null,
        company: company || null,
        message,
      })
      .returning();

    // Send email notification via SES
    await ses.send(
      new SendEmailCommand({
        Source: process.env.AWS_SES_FROM_EMAIL!,
        Destination: {
          ToAddresses: [process.env.AWS_SES_TO_EMAIL!],
        },
        Message: {
          Subject: {
            Data: `New Contact Form Submission from ${name}`,
          },
          Body: {
            Text: {
              Data: `
New contact form submission:

Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Company: ${company || 'N/A'}

Message:
${message}
              `,
            },
          },
        },
      })
    );

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Contact form submitted successfully',
        lead: newLead,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
