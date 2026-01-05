import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { v4 as uuidv4 } from 'uuid';

// ===== AWS CLIENTS =====
// AWS Learning: Clients are reused across Lambda invocations for performance
const bedrockClient = new BedrockRuntimeClient({ region: process.env.AWS_REGION || 'us-east-1' });
const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const sesClient = new SESClient({ region: process.env.AWS_REGION || 'us-east-1' });

// ===== CONFIGURATION =====
const TABLE_NAME = process.env.CHATBOT_TABLE_NAME || 'chatbot_conversations';
const APPOINTMENTS_TABLE = process.env.APPOINTMENTS_TABLE_NAME || 'chatbot_appointments';
const MODEL_ID = process.env.BEDROCK_MODEL_ID || 'anthropic.claude-3-haiku-20240307-v1:0';
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || 'contact@unkommon.ai';

// ===== SYSTEM PROMPT =====
// AWS Learning: This defines the AI's personality and knowledge
const SYSTEM_PROMPT = `You are an AI assistant for Unkommon, a company that provides AI automation services in New York, NY.

Your role is to help potential customers learn about our services and book appointments. Be friendly, professional, and concise.

Our Services:
1. AI Receptionist - 24/7 phone answering, appointment booking, and intelligent call routing
2. Speed-to-Lead - Instant automated responses to customer inquiries with AI-generated personalized messages
3. AI Booking System - WhatsApp & SMS appointment scheduling with smart calendar management
4. Social Media Bot - Automated Instagram and Facebook DM responses with lead capture

Contact Information:
- Phone: 718-500-1191
- Email: contact@unkommon.ai
- Office: New York, NY

APPOINTMENT BOOKING:
When someone wants to book an appointment, consultation, or demo, collect this information in order:
1. Full name
2. Email address
3. Phone number
4. Which service they're interested in (AI Receptionist, Speed-to-Lead, AI Booking System, or Social Media Bot)
5. Preferred date and time

Once you have ALL 5 pieces of information, respond with EXACTLY this format:
BOOKING_CONFIRMED: [name] | [email] | [phone] | [service] | [preferred_date_time]

Example: BOOKING_CONFIRMED: John Smith | john@example.com | 555-1234 | AI Receptionist | Tomorrow at 2pm

Guidelines:
- Keep responses under 150 words
- Use emojis sparingly (one per message max)
- Be enthusiastic but not pushy
- Ask for missing information one step at a time
- If you don't know something, be honest and offer to connect them with the team`;

// ===== CORS HEADERS =====
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
};

/**
 * Main Lambda Handler
 * AWS Learning: Lambda functions receive event and context objects
 */
export async function handler(event) {
  console.log('Chatbot request:', JSON.stringify(event, null, 2));

  try {
    // Parse request body
    const body = JSON.parse(event.body || '{}');
    const { message, conversationId } = body;

    // Validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    // Generate or use existing conversation ID
    // AWS Learning: Each conversation gets a unique ID to group messages
    const currentConversationId = conversationId || uuidv4();
    const timestamp = Date.now();

    // Step 1: Retrieve conversation history from DynamoDB
    const conversationHistory = await getConversationHistory(currentConversationId);
    console.log(`Retrieved ${conversationHistory.length} previous messages`);

    // Step 2: Build messages array for Claude
    // AWS Learning: Claude needs the full conversation context
    const messages = [
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.message,
      })),
      {
        role: 'user',
        content: message,
      },
    ];

    // Step 3: Call Amazon Bedrock (Claude AI)
    console.log('Calling Bedrock with model:', MODEL_ID);
    const aiResponse = await invokeBedrockModel(messages);
    console.log('Bedrock response received');

    // Step 4: Save user message to DynamoDB
    await saveMessage(currentConversationId, timestamp, 'user', message);

    // Step 5: Save AI response to DynamoDB
    await saveMessage(currentConversationId, timestamp + 1, 'assistant', aiResponse);

    // Step 6: Check if this is a lead capture scenario
    // AWS Learning: Simple pattern matching to detect when user provides contact info
    const leadCaptured = detectLeadCapture(message, conversationHistory);
    if (leadCaptured) {
      console.log('Lead captured, sending notification email');
      await sendLeadNotification(currentConversationId, conversationHistory, message, aiResponse);
    }

    // Step 7: Check if AI confirmed a booking
    let finalResponse = aiResponse;
    if (detectBookingConfirmation(aiResponse)) {
      console.log('Booking confirmation detected');
      const bookingDetails = parseBookingDetails(aiResponse);

      if (bookingDetails) {
        console.log('Parsed booking details:', bookingDetails);

        // Save appointment to database
        const appointmentId = await saveAppointment(bookingDetails, currentConversationId);

        // Send confirmation emails
        await sendAppointmentEmails(bookingDetails, appointmentId);

        // Replace the technical response with a user-friendly one
        finalResponse = `Perfect! 🎉 Your appointment has been confirmed!

I've sent a confirmation email to ${bookingDetails.email} with all the details. Our team will reach out within 24 hours to finalize the exact time.

Your confirmation number is: ${appointmentId.substring(0, 8).toUpperCase()}

Is there anything else you'd like to know about our ${bookingDetails.service} service?`;
      }
    }

    // Step 8: Return response to frontend
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: finalResponse,
        conversationId: currentConversationId,
        timestamp,
      }),
    };
  } catch (error) {
    console.error('Chatbot error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to process chat message',
        message: error.message,
      }),
    };
  }
}

/**
 * Retrieve conversation history from DynamoDB
 * AWS Learning: Query operation finds all items with the same partition key
 */
async function getConversationHistory(conversationId) {
  try {
    const command = new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'conversationId = :convId',
      ExpressionAttributeValues: {
        ':convId': conversationId,
      },
      ScanIndexForward: true, // Sort by timestamp ascending (oldest first)
      Limit: 20, // Only keep last 20 messages for context (cost optimization)
    });

    const result = await dynamoClient.send(command);
    return result.Items || [];
  } catch (error) {
    console.error('Error fetching conversation history:', error);
    return [];
  }
}

/**
 * Save a message to DynamoDB
 * AWS Learning: PutCommand adds a new item to the table
 */
async function saveMessage(conversationId, timestamp, role, message, metadata = {}) {
  try {
    const ttl = Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60); // 30 days from now

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        conversationId,
        timestamp,
        role, // 'user' or 'assistant'
        message,
        metadata,
        ttl, // DynamoDB will auto-delete after this timestamp
      },
    });

    await dynamoClient.send(command);
  } catch (error) {
    console.error('Error saving message:', error);
    // Don't throw - we don't want to fail the chatbot if DynamoDB has issues
  }
}

/**
 * Call Amazon Bedrock to get AI response
 * AWS Learning: Bedrock API uses JSON request/response format
 */
async function invokeBedrockModel(messages) {
  try {
    // Prepare request payload for Claude
    // AWS Learning: Different models have different API formats
    const payload = {
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 500, // Limit response length for cost control
      temperature: 0.7, // Balance between creative and predictable (0-1)
      system: SYSTEM_PROMPT,
      messages,
    };

    const command = new InvokeModelCommand({
      modelId: MODEL_ID,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(payload),
    });

    const response = await bedrockClient.send(command);

    // Parse response
    // AWS Learning: Bedrock returns response as Uint8Array, need to decode
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    // Extract text from Claude's response
    const aiMessage = responseBody.content[0].text;

    return aiMessage;
  } catch (error) {
    console.error('Bedrock invocation error:', error);

    // Fallback response if Bedrock fails
    return "I'm having trouble connecting right now. Please try again in a moment, or reach out directly at support@unkommon.ai or 718-500-1191.";
  }
}

/**
 * Detect if user has provided contact information (lead capture)
 * AWS Learning: Simple pattern matching - could be improved with NLP
 */
function detectLeadCapture(message, history) {
  // Check if message contains email pattern
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const hasEmail = emailPattern.test(message);

  // Check if conversation has enough context (at least 3 exchanges)
  const hasContext = history.length >= 6;

  return hasEmail && hasContext;
}

/**
 * Send email notification when a lead is captured
 * AWS Learning: SES can send transactional emails
 */
async function sendLeadNotification(conversationId, history, latestMessage, latestResponse) {
  try {
    // Extract potential lead info from conversation
    const conversationText = history
      .map(msg => `${msg.role}: ${msg.message}`)
      .join('\n');

    const emailBody = `
New chatbot lead captured!

Conversation ID: ${conversationId}

Full Conversation:
${conversationText}

Latest User Message: ${latestMessage}
Latest AI Response: ${latestResponse}

---
This lead was automatically captured by the chatbot system.
Please follow up within 24 hours.
    `;

    const command = new SendEmailCommand({
      Source: process.env.AWS_SES_FROM_EMAIL,
      Destination: {
        ToAddresses: [process.env.AWS_SES_TO_EMAIL],
      },
      Message: {
        Subject: {
          Data: `🤖 New Chatbot Lead - Conversation ${conversationId.substring(0, 8)}`,
        },
        Body: {
          Text: {
            Data: emailBody,
          },
        },
      },
    });

    await sesClient.send(command);
    console.log('Lead notification email sent');
  } catch (error) {
    console.error('Error sending lead notification:', error);
    // Don't throw - email failure shouldn't break the chatbot
  }
}

/**
 * Detect if AI has confirmed a booking (using special format)
 */
function detectBookingConfirmation(aiResponse) {
  return aiResponse.includes('BOOKING_CONFIRMED:');
}

/**
 * Parse booking details from AI response
 */
function parseBookingDetails(aiResponse) {
  try {
    const match = aiResponse.match(/BOOKING_CONFIRMED:\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+)/);
    if (!match) return null;

    return {
      name: match[1].trim(),
      email: match[2].trim(),
      phone: match[3].trim(),
      service: match[4].trim(),
      preferredDateTime: match[5].trim(),
    };
  } catch (error) {
    console.error('Error parsing booking details:', error);
    return null;
  }
}

/**
 * Save appointment to DynamoDB
 */
async function saveAppointment(bookingDetails, conversationId) {
  const appointmentId = uuidv4();
  const now = Date.now();

  const appointment = {
    appointmentId,
    conversationId,
    ...bookingDetails,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };

  const command = new PutCommand({
    TableName: APPOINTMENTS_TABLE,
    Item: appointment,
  });

  await dynamoClient.send(command);
  console.log('Appointment saved:', appointmentId);

  return appointmentId;
}

/**
 * Send appointment confirmation emails to both client and company
 */
async function sendAppointmentEmails(bookingDetails, appointmentId) {
  try {
    // Email to client
    const clientEmailBody = `Hi ${bookingDetails.name},

Thank you for booking a consultation with Unkommon! We're excited to discuss how our AI automation solutions can transform your business.

Appointment Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Service: ${bookingDetails.service}
📅 Requested Time: ${bookingDetails.preferredDateTime}
👤 Name: ${bookingDetails.name}
📧 Email: ${bookingDetails.email}
📞 Phone: ${bookingDetails.phone}
🆔 Confirmation #: ${appointmentId.substring(0, 8).toUpperCase()}

Next Steps:
Our team will review your request and send you a calendar invite within 24 hours to confirm the exact time.

Questions?
Feel free to call us at 718-500-1191 or reply to this email.

Best regards,
Unkommon Team
New York, NY
contact@unkommon.ai`;

    const clientCommand = new SendEmailCommand({
      Source: COMPANY_EMAIL,
      Destination: {
        ToAddresses: [bookingDetails.email],
      },
      Message: {
        Subject: {
          Data: `✅ Appointment Confirmed - Unkommon`,
        },
        Body: {
          Text: {
            Data: clientEmailBody,
          },
        },
      },
    });

    // Email to company
    const companyEmailBody = `🎉 NEW APPOINTMENT BOOKED VIA CHATBOT

Appointment Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Name: ${bookingDetails.name}
📧 Email: ${bookingDetails.email}
📞 Phone: ${bookingDetails.phone}
📋 Service Interest: ${bookingDetails.service}
📅 Requested Time: ${bookingDetails.preferredDateTime}
🆔 Appointment ID: ${appointmentId}

ACTION REQUIRED:
1. Review the requested time slot
2. Send calendar invite to ${bookingDetails.email}
3. Follow up within 24 hours

The customer has received an automatic confirmation email.`;

    const companyCommand = new SendEmailCommand({
      Source: COMPANY_EMAIL,
      Destination: {
        ToAddresses: [COMPANY_EMAIL],
      },
      Message: {
        Subject: {
          Data: `🎯 New Appointment: ${bookingDetails.name} - ${bookingDetails.service}`,
        },
        Body: {
          Text: {
            Data: companyEmailBody,
          },
        },
      },
    });

    // Send both emails
    await Promise.all([
      sesClient.send(clientCommand),
      sesClient.send(companyCommand),
    ]);

    console.log('Appointment confirmation emails sent');
  } catch (error) {
    console.error('Error sending appointment emails:', error);
    // Don't throw - email failure shouldn't break the booking
  }
}
