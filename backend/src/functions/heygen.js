import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const CONVERSATIONS_TABLE = process.env.CONVERSATIONS_TABLE_NAME || "heygen_conversations";
const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY;

/**
 * Generate HeyGen streaming token
 */
export async function createToken(event) {
  try {
    if (!HEYGEN_API_KEY) {
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ error: "HeyGen API key not configured" }),
      };
    }

    // Call HeyGen API to create a streaming token
    const response = await fetch("https://api.heygen.com/v1/streaming.create_token", {
      method: "POST",
      headers: {
        "x-api-key": HEYGEN_API_KEY,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HeyGen API error:", errorText);
      return {
        statusCode: response.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: "Failed to create HeyGen token",
          details: errorText,
        }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error creating HeyGen token:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
}

/**
 * Clear conversation history
 */
export async function clearConversation(event) {
  try {
    const body = JSON.parse(event.body || "{}");
    const { sessionId } = body;

    if (!sessionId || sessionId === "default") {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ error: "Valid session ID is required" }),
      };
    }

    // Delete conversation from DynamoDB
    await docClient.send(
      new DeleteCommand({
        TableName: CONVERSATIONS_TABLE,
        Key: {
          sessionId,
        },
      })
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: true,
        message: "Conversation history cleared",
      }),
    };
  } catch (error) {
    console.error("Error clearing conversation:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: "Failed to clear conversation history" }),
    };
  }
}

/**
 * Handle conversation - This uses the existing chatbot Lambda
 * This is just a placeholder that redirects to the chatbot endpoint
 */
export async function handleConversation(event) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      message: "Please use the /api/chat endpoint for conversations",
      redirect: "/api/chat",
    }),
  };
}
