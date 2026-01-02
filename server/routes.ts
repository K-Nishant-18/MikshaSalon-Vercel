import type { Express } from "express";
import { db } from "./db";
import { bookings } from "../shared/schema";
import { insertBookingSchema, updateBookingSchema } from "../shared/schema";
import { eq } from "drizzle-orm";

export async function registerRoutes(app: Express): Promise<void> {
  // GET - Fetch all bookings
  app.get("/api/bookings", async (_req, res) => {
    try {
      const allBookings = await db.select().from(bookings).orderBy(bookings.createdAt);
      res.json(allBookings);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  // POST - Create new booking
  app.post("/api/bookings", async (req, res) => {
    try {
      console.log("Creating booking:", req.body);
      const parsed = insertBookingSchema.safeParse(req.body);

      if (!parsed.success) {
        console.log("Validation error:", parsed.error);
        return res.status(400).json({ error: "Validation failed", details: parsed.error });
      }

      await db.insert(bookings).values(parsed.data);
      console.log("Booking created successfully");

      res.json({ success: true, message: "Booking created successfully" });
    } catch (error) {
      console.error("Failed to create booking:", error);
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  // PATCH - Update booking status
  app.patch("/api/bookings", async (req, res) => {
    try {
      const { id } = req.query;
      if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: "Invalid booking ID" });
      }

      const parsed = updateBookingSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Validation failed", details: parsed.error });
      }

      await db
        .update(bookings)
        .set(parsed.data)
        .where(eq(bookings.id, parseInt(id)));

      res.json({ success: true, message: "Booking updated" });
    } catch (error) {
      console.error("Failed to update booking:", error);
      res.status(500).json({ error: "Failed to update booking" });
    }
  });

  // DELETE - Delete booking
  app.delete("/api/bookings", async (req, res) => {
    try {
      const { id } = req.query;
      if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: "Invalid booking ID" });
      }

      await db.delete(bookings).where(eq(bookings.id, parseInt(id)));

      res.json({ success: true, message: "Booking deleted" });
    } catch (error) {
      console.error("Failed to delete booking:", error);
      res.status(500).json({ error: "Failed to delete booking" });
    }
  });
}
