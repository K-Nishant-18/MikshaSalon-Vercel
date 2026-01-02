import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { bookings } from '../../shared/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        console.log('Creating booking...', req.body);

        // Connect to Turso
        const client = createClient({
            url: process.env.DATABASE_URL!,
            authToken: process.env.DATABASE_AUTH_TOKEN!,
        });

        const db = drizzle(client);

        // Insert booking
        const bookingData = {
            customerName: req.body.customerName,
            customerPhone: req.body.customerPhone,
            customerEmail: req.body.customerEmail || null,
            serviceName: req.body.serviceName,
            serviceCategory: req.body.serviceCategory,
            bookingDate: new Date(req.body.bookingDate),
            status: req.body.status || 'pending',
            notes: req.body.notes || null,
        };

        await db.insert(bookings).values(bookingData);

        console.log('Booking created successfully');

        return res.status(200).json({
            success: true,
            message: 'Booking created successfully'
        });

    } catch (error) {
        console.error('Booking error:', error);
        return res.status(500).json({
            error: 'Failed to create booking',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
