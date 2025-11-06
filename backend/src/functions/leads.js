import { desc, eq } from 'drizzle-orm';
import { getDb } from './db.js';
import { leads } from './schema.js';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

export async function getAllLeads(event) {
  try {
    const db = getDb();
    const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(allLeads),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}

export async function getLeadById(event) {
  try {
    const id = event.pathParameters?.id;
    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing lead ID' }),
      };
    }

    const db = getDb();
    const [lead] = await db
      .select()
      .from(leads)
      .where(eq(leads.id, parseInt(id)))
      .limit(1);

    if (!lead) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Lead not found' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(lead),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}

export async function deleteLead(event) {
  try {
    const id = event.pathParameters?.id;
    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing lead ID' }),
      };
    }

    const db = getDb();
    const [deletedLead] = await db
      .delete(leads)
      .where(eq(leads.id, parseInt(id)))
      .returning();

    if (!deletedLead) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Lead not found' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Lead deleted successfully', lead: deletedLead }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
