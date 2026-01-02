import { createClient } from '@libsql/client';
import 'dotenv/config';

async function main() {
    console.log('🚀 Starting Turso schema migration...\n');

    const client = createClient({
        url: process.env.DATABASE_URL!,
        authToken: process.env.DATABASE_AUTH_TOKEN!,
    });

    console.log('📦 Creating tables...\n');

    // Create all tables one by one
    const tables = [
        {
            name: 'users',
            sql: `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )`
        },
        {
            name: 'bookings',
            sql: `CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        customer_email TEXT,
        service_name TEXT NOT NULL,
        service_category TEXT NOT NULL,
        artist_name TEXT,
        booking_date INTEGER NOT NULL,
        status TEXT DEFAULT 'pending' NOT NULL,
        notes TEXT,
        price REAL,
        created_at INTEGER
      )`
        },
        {
            name: 'artists',
            sql: `CREATE TABLE IF NOT EXISTS artists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        specialty TEXT NOT NULL,
        bio TEXT,
        phone TEXT,
        email TEXT,
        is_available INTEGER DEFAULT 1 NOT NULL,
        rating REAL DEFAULT 5.0,
        image_url TEXT
      )`
        },
        {
            name: 'services',
            sql: `CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        type TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        duration INTEGER,
        is_visible INTEGER DEFAULT 1 NOT NULL
      )`
        },
        {
            name: 'customers',
            sql: `CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        total_bookings INTEGER DEFAULT 0,
        loyalty_status TEXT DEFAULT 'regular',
        notes TEXT,
        last_visit INTEGER
      )`
        },
        {
            name: 'gallery',
            sql: `CREATE TABLE IF NOT EXISTS gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image_url TEXT NOT NULL,
        category TEXT NOT NULL,
        caption TEXT,
        tags TEXT,
        is_visible INTEGER DEFAULT 1 NOT NULL,
        created_at INTEGER
      )`
        },
        {
            name: 'testimonials',
            sql: `CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        text TEXT NOT NULL,
        rating INTEGER NOT NULL,
        service TEXT,
        is_approved INTEGER DEFAULT 0 NOT NULL,
        is_visible INTEGER DEFAULT 1 NOT NULL,
        created_at INTEGER
      )`
        },
        {
            name: 'content',
            sql: `CREATE TABLE IF NOT EXISTS content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT NOT NULL UNIQUE,
        section TEXT NOT NULL,
        english_text TEXT NOT NULL,
        bangla_text TEXT,
        updated_at INTEGER
      )`
        },
    ];

    for (const table of tables) {
        try {
            await client.execute(table.sql);
            console.log(`  ✓ Created table: ${table.name}`);
        } catch (err: any) {
            console.error(`  ✗ Failed to create ${table.name}:`, err.message);
        }
    }

    console.log('\n📊 Verifying tables...');

    const result = await client.execute(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name NOT LIKE 'sqlite_%'
    ORDER BY name
  `);

    console.log('\nTables in database:');
    result.rows.forEach((row: any) => {
        console.log(`  ✓ ${row.name}`);
    });

    console.log(`\n🎉 Migration completed! Created ${result.rows.length} tables.`);
    process.exit(0);
}

main().catch((err) => {
    console.error('\n❌ Migration failed:', err);
    process.exit(1);
});
