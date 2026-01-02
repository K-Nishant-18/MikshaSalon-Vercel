import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Only keep bookings table
export const bookings = sqliteTable("bookings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email"),
  serviceName: text("service_name").notNull(),
  serviceCategory: text("service_category").notNull(),
  bookingDate: integer("booking_date", { mode: "timestamp" }).notNull(),
  status: text("status").default("pending").notNull(),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const insertBookingSchema = createInsertSchema(bookings, {
  bookingDate: z.coerce.date(),
}).omit({
  id: true,
  createdAt: true,
});

export const updateBookingSchema = z.object({
  status: z.enum(["pending", "confirmed", "completed"]).optional(),
  notes: z.string().optional(),
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type UpdateBooking = z.infer<typeof updateBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
