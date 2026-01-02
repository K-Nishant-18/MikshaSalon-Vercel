import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from "../shared/schema";

const databaseUrl = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

if (!databaseUrl || !authToken) {
  console.error("DATABASE_URL and DATABASE_AUTH_TOKEN must be set!");
} else {
  console.log("Initializing Turso DB...");
  console.log("Database URL: " + databaseUrl.substring(0, 20) + "...");
}

const client = createClient({
  url: databaseUrl || "file:local.db",
  authToken: authToken,
});

export const db = drizzle(client, { schema });

console.log("Turso DB client initialized successfully");
