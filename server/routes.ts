import type { Express } from "express";
import { storage } from "./storage";
import { insertBookingSchema, insertArtistSchema, insertServiceSchema, insertCustomerSchema, insertGallerySchema, insertTestimonialSchema, insertContentSchema } from "../shared/schema";

export async function registerRoutes(app: Express): Promise<void> {
  // Bookings
  // Health check with DB verification
  app.get("/api/health", async (_req, res) => {
    try {
      const result = await storage.getBookings(); // Test DB connection
      res.json({
        status: "ok",
        database: "connected",
        bookingCount: result.length,
        env: process.env.NODE_ENV,
        hasDbUrl: !!process.env.DATABASE_URL
      });
    } catch (error) {
      console.error("Health check failed:", error);
      res.status(500).json({
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
        hasDbUrl: !!process.env.DATABASE_URL
      });
    }
  });

  app.get("/api/admin/bookings", async (_req, res) => {
    const bookings = await storage.getBookings();
    res.json(bookings);
  });

  app.post("/api/admin/bookings", async (req, res) => {
    try {
      console.log("Received booking body:", JSON.stringify(req.body, null, 2));
      const parsed = insertBookingSchema.safeParse(req.body);
      if (!parsed.success) {
        console.log("Validation error:", JSON.stringify(parsed.error, null, 2));
        return res.status(400).json(parsed.error);
      }
      const booking = await storage.createBooking(parsed.data);
      res.json(booking);
    } catch (error) {
      console.error("Failed to create booking:", error);
      res.status(500).json({ message: "Failed to create booking", error: String(error) });
    }
  });

  app.patch("/api/admin/bookings/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const booking = await storage.updateBooking(id, req.body);
    res.json(booking);
  });

  // Artists
  app.get("/api/admin/artists", async (_req, res) => {
    const artists = await storage.getArtists();
    res.json(artists);
  });

  app.post("/api/admin/artists", async (req, res) => {
    const parsed = insertArtistSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }
    const artist = await storage.createArtist(parsed.data);
    res.json(artist);
  });

  app.patch("/api/admin/artists/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const artist = await storage.updateArtist(id, req.body);
    res.json(artist);
  });

  // Services
  app.get("/api/admin/services", async (_req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  app.post("/api/admin/services", async (req, res) => {
    const parsed = insertServiceSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }
    const service = await storage.createService(parsed.data);
    res.json(service);
  });

  app.patch("/api/admin/services/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const service = await storage.updateService(id, req.body);
    res.json(service);
  });

  // Customers
  app.get("/api/admin/customers", async (_req, res) => {
    const customers = await storage.getCustomers();
    res.json(customers);
  });

  app.post("/api/admin/customers", async (req, res) => {
    const parsed = insertCustomerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }
    const customer = await storage.createCustomer(parsed.data);
    res.json(customer);
  });

  // Gallery
  app.get("/api/admin/gallery", async (_req, res) => {
    const items = await storage.getGalleryItems();
    res.json(items);
  });

  app.post("/api/admin/gallery", async (req, res) => {
    const parsed = insertGallerySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }
    const item = await storage.createGalleryItem(parsed.data);
    res.json(item);
  });

  app.delete("/api/admin/gallery/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteGalleryItem(id);
    res.status(204).end();
  });

  app.patch("/api/admin/gallery/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const item = await storage.updateGalleryItem(id, req.body);
    res.json(item);
  });

  // Testimonials
  app.get("/api/admin/testimonials", async (_req, res) => {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
  });

  app.post("/api/admin/testimonials", async (req, res) => {
    const parsed = insertTestimonialSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }
    const testimonial = await storage.createTestimonial(parsed.data);
    res.json(testimonial);
  });

  app.delete("/api/admin/testimonials/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteTestimonial(id);
    res.status(204).end();
  });

  app.patch("/api/admin/testimonials/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const testimonial = await storage.updateTestimonial(id, req.body);
    res.json(testimonial);
  });

  // Content
  app.get("/api/admin/content", async (_req, res) => {
    const content = await storage.getContent();
    res.json(content);
  });

  app.post("/api/admin/content", async (req, res) => {
    const parsed = insertContentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }
    const content = await storage.createContent(parsed.data);
    res.json(content);
  });

  app.patch("/api/admin/content/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const content = await storage.updateContent(id, req.body);
    res.json(content);
  });
}
