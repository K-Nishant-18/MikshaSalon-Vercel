import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { bookings, insertBookingSchema, updateBookingSchema } from '../../shared/schema';
import { eq } from 'drizzle-orm';

// Initialize database connection
const getDb = () => {
    const client = createClient({
        url: process.env.DATABASE_URL!,
        authToken: process.env.DATABASE_AUTH_TOKEN!,
    });
    return drizzle(client, { schema: { bookings } });
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const db = getDb();

    try {
        // GET - Fetch all bookings
        if (req.method === 'GET') {
            const allBookings = await db.select().from(bookings).orderBy(bookings.createdAt);
            return res.status(200).json(allBookings);
        }

        // POST - Create new booking
        if (req.method === 'POST') {
            console.log('Creating booking...', req.body);

            const parsed = insertBookingSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ error: 'Validation failed', details: parsed.error });
            }

            await db.insert(bookings).values(parsed.data);
            console.log('Booking created successfully');

            return res.status(200).json({
                success: true,
                message: 'Booking created successfully'
            });
        }

        // PATCH - Update booking status
        if (req.method === 'PATCH') {
            const { id } = req.query;
            if (!id || Array.isArray(id)) {
                return res.status(400).json({ error: 'Invalid booking ID' });
            }

            const parsed = updateBookingSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ error: 'Validation failed', details: parsed.error });
            }

            await db
                .update(bookings)
                .set(parsed.data)
                .where(eq(bookings.id, parseInt(id)));

            return res.status(200).json({ success: true, message: 'Booking updated' });
        }

        // DELETE - Delete booking
        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id || Array.isArray(id)) {
                return res.status(400).json({ error: 'Invalid booking ID' });
            }

            await db.delete(bookings).where(eq(bookings.id, parseInt(id)));

            return res.status(200).json({ success: true, message: 'Booking deleted' });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Booking API error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
