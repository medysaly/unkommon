import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { leads } from '../../../shared-types/schema.js';

let pool: Pool | null = null;

export function getDb() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 1, // Lambda: use single connection per container
    });
  }
  return drizzle(pool, { schema: { leads } });
}
