```
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "../shared/schema";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL must be set. Did you forget to provision a database?");
} else {
  console.log("Initializing Neon DB...");
  // Log masked URL for debugging Vercel logs
  console.log("Database URL starts with: " + databaseUrl.substring(0, 15) + "...");
}

export const sql = neon(databaseUrl || "postgres://user:pass@host/db");
export const db = drizzle(sql, { schema });
```
