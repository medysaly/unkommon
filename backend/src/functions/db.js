import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { leads } from './schema.js';

let pool = null;

export function getDb() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 1, // Lambda: use single connection per container
    });
  }
  return drizzle(pool, { schema: { leads } });
}
