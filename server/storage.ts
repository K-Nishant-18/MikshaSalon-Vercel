import {
  type User, type InsertUser,
  type Booking, type InsertBooking,
  type Artist, type InsertArtist,
  type Service, type InsertService,
  type Customer, type InsertCustomer,
  type GalleryItem, type InsertGallery,
  type Testimonial, type InsertTestimonial,
  type ContentItem, type InsertContent
} from "../shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { users, bookings, artists, services, customers, gallery, testimonials, content } from "../shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Bookings
  getBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: number, booking: Partial<Booking>): Promise<Booking>;

  // Artists
  getArtists(): Promise<Artist[]>;
  getArtist(id: number): Promise<Artist | undefined>;
  createArtist(artist: InsertArtist): Promise<Artist>;
  updateArtist(id: number, artist: Partial<Artist>): Promise<Artist>;

  // Services
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<Service>): Promise<Service>;

  // Customers
  getCustomers(): Promise<Customer[]>;
  getCustomer(id: number): Promise<Customer | undefined>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  updateCustomer(id: number, customer: Partial<Customer>): Promise<Customer>;

  // Gallery
  getGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItem(id: number): Promise<GalleryItem | undefined>;
  createGalleryItem(item: InsertGallery): Promise<GalleryItem>;
  deleteGalleryItem(id: number): Promise<void>;
  updateGalleryItem(id: number, item: Partial<GalleryItem>): Promise<GalleryItem>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  deleteTestimonial(id: number): Promise<void>;
  updateTestimonial(id: number, testimonial: Partial<Testimonial>): Promise<Testimonial>;

  // Content
  getContent(): Promise<ContentItem[]>;
  getContentByKey(key: string): Promise<ContentItem | undefined>;
  createContent(content: InsertContent): Promise<ContentItem>;
  updateContent(id: number, content: Partial<ContentItem>): Promise<ContentItem>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Bookings
  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings);
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db.insert(bookings).values(insertBooking).returning();
    return booking;
  }

  async updateBooking(id: number, update: Partial<Booking>): Promise<Booking> {
    await db.update(bookings).set(update).where(eq(bookings.id, id));
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    if (!booking) throw new Error("Booking not found");
    return booking;
  }

  // Artists
  async getArtists(): Promise<Artist[]> {
    return await db.select().from(artists);
  }

  async getArtist(id: number): Promise<Artist | undefined> {
    const [artist] = await db.select().from(artists).where(eq(artists.id, id));
    return artist;
  }

  async createArtist(insertArtist: InsertArtist): Promise<Artist> {
    const [artist] = await db.insert(artists).values(insertArtist).returning();
    return artist;
  }

  async updateArtist(id: number, update: Partial<Artist>): Promise<Artist> {
    await db.update(artists).set(update).where(eq(artists.id, id));
    const [artist] = await db.select().from(artists).where(eq(artists.id, id));
    return artist!;
  }

  // Services
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db.insert(services).values(insertService).returning();
    return service;
  }

  async updateService(id: number, update: Partial<Service>): Promise<Service> {
    await db.update(services).set(update).where(eq(services.id, id));
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service!;
  }

  // Customers
  async getCustomers(): Promise<Customer[]> {
    return await db.select().from(customers);
  }

  async getCustomer(id: number): Promise<Customer | undefined> {
    const [customer] = await db.select().from(customers).where(eq(customers.id, id));
    return customer;
  }

  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const [customer] = await db.insert(customers).values(insertCustomer).returning();
    return customer;
  }

  async updateCustomer(id: number, update: Partial<Customer>): Promise<Customer> {
    await db.update(customers).set(update).where(eq(customers.id, id));
    const [customer] = await db.select().from(customers).where(eq(customers.id, id));
    return customer!;
  }

  // Gallery
  async getGalleryItems(): Promise<GalleryItem[]> {
    return await db.select().from(gallery);
  }

  async getGalleryItem(id: number): Promise<GalleryItem | undefined> {
    const [item] = await db.select().from(gallery).where(eq(gallery.id, id));
    return item;
  }

  async createGalleryItem(insertGallery: InsertGallery): Promise<GalleryItem> {
    const [item] = await db.insert(gallery).values(insertGallery).returning();
    return item;
  }

  async deleteGalleryItem(id: number): Promise<void> {
    await db.delete(gallery).where(eq(gallery.id, id));
  }

  async updateGalleryItem(id: number, update: Partial<GalleryItem>): Promise<GalleryItem> {
    await db.update(gallery).set(update).where(eq(gallery.id, id));
    const [item] = await db.select().from(gallery).where(eq(gallery.id, id));
    return item!;
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial;
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    return testimonial;
  }

  async deleteTestimonial(id: number): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  async updateTestimonial(id: number, update: Partial<Testimonial>): Promise<Testimonial> {
    await db.update(testimonials).set(update).where(eq(testimonials.id, id));
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial!;
  }

  // Content
  async getContent(): Promise<ContentItem[]> {
    return await db.select().from(content);
  }

  async getContentByKey(key: string): Promise<ContentItem | undefined> {
    const [item] = await db.select().from(content).where(eq(content.key, key));
    return item;
  }

  async createContent(insertContent: InsertContent): Promise<ContentItem> {
    const [item] = await db.insert(content).values(insertContent).returning();
    return item;
  }

  async updateContent(id: number, update: Partial<ContentItem>): Promise<ContentItem> {
    await db.update(content).set(update).where(eq(content.id, id));
    const [item] = await db.select().from(content).where(eq(content.id, id));
    return item!;
  }
}

export const storage = new DatabaseStorage();
