import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const bookings = sqliteTable("bookings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email"),
  serviceName: text("service_name").notNull(),
  serviceCategory: text("service_category").notNull(),
  artistName: text("artist_name"),
  bookingDate: integer("booking_date", { mode: "timestamp" }).notNull(),
  status: text("status").default("pending").notNull(),
  notes: text("notes"),
  price: real("price"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const artists = sqliteTable("artists", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  specialty: text("specialty").notNull(),
  bio: text("bio"),
  phone: text("phone"),
  email: text("email"),
  isAvailable: integer("is_available", { mode: "boolean" }).default(true).notNull(),
  rating: real("rating").default(5.0),
  imageUrl: text("image_url"),
});

export const services = sqliteTable("services", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  category: text("category").notNull(),
  type: text("type").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  duration: integer("duration"), // in minutes
  isVisible: integer("is_visible", { mode: "boolean" }).default(true).notNull(),
});

export const customers = sqliteTable("customers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  totalBookings: integer("total_bookings").default(0),
  loyaltyStatus: text("loyalty_status").default("regular"),
  notes: text("notes"),
  lastVisit: integer("last_visit", { mode: "timestamp" }),
});

export const gallery = sqliteTable("gallery", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  caption: text("caption"),
  tags: text("tags", { mode: "json" }),
  isVisible: integer("is_visible", { mode: "boolean" }).default(true).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const testimonials = sqliteTable("testimonials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerName: text("customer_name").notNull(),
  text: text("text").notNull(),
  rating: integer("rating").notNull(),
  service: text("service"),
  isApproved: integer("is_approved", { mode: "boolean" }).default(false).notNull(),
  isVisible: integer("is_visible", { mode: "boolean" }).default(true).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const content = sqliteTable("content", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  key: text("key").notNull().unique(),
  section: text("section").notNull(),
  englishText: text("english_text").notNull(),
  banglaText: text("bangla_text"),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBookingSchema = createInsertSchema(bookings, {
  bookingDate: z.coerce.date(),
  price: z.union([z.string(), z.number()]).transform(val => val ? Number(val) : null).optional().nullable(),
}).omit({
  id: true,
  createdAt: true,
});

export const insertArtistSchema = createInsertSchema(artists).omit({
  id: true,
  rating: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export const insertCustomerSchema = createInsertSchema(customers).omit({
  id: true,
  totalBookings: true,
  lastVisit: true,
});

export const insertGallerySchema = createInsertSchema(gallery).omit({
  id: true,
  createdAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

export const insertContentSchema = createInsertSchema(content).omit({
  id: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

export type InsertArtist = z.infer<typeof insertArtistSchema>;
export type Artist = typeof artists.$inferSelect;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type Customer = typeof customers.$inferSelect;

export type InsertGallery = z.infer<typeof insertGallerySchema>;
export type GalleryItem = typeof gallery.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertContent = z.infer<typeof insertContentSchema>;
export type ContentItem = typeof content.$inferSelect;
