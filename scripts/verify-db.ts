import { db } from "../server/db";
import { sql } from "drizzle-orm";

async function main() {
    try {
        console.log("Checking database connection...");
        const result = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);

        console.log("Tables found:", JSON.stringify(result.rows, null, 2));

    } catch (err) {
        console.error("Database check failed:", err);
    }
    process.exit(0);
}

main();
