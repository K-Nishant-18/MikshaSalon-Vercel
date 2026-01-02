import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL must be set. Did you forget to provision a database?");
}

export const sql = neon(process.env.DATABASE_URL || "postgres://user:pass@host/db");
export const db = drizzle(sql, { schema });
