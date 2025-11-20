import {
  type User, type InsertUser,
  type Booking, type InsertBooking,
  type Artist, type InsertArtist,
  type Service, type InsertService,
  type Customer, type InsertCustomer,
  type GalleryItem, type InsertGallery,
  type Testimonial, type InsertTestimonial,
  type ContentItem, type InsertContent
} from "@shared/schema";

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private bookings: Map<number, Booking>;
  private artists: Map<number, Artist>;
  private services: Map<number, Service>;
  private customers: Map<number, Customer>;
  private gallery: Map<number, GalleryItem>;
  private testimonials: Map<number, Testimonial>;
  private content: Map<number, ContentItem>;

  private currentId: { [key: string]: number };

  constructor() {
    this.users = new Map();
    this.bookings = new Map();
    this.artists = new Map();
    this.services = new Map();
    this.customers = new Map();
    this.gallery = new Map();
    this.testimonials = new Map();
    this.content = new Map();

    this.currentId = {
      users: 1,
      bookings: 1,
      artists: 1,
      services: 1,
      customers: 1,
      gallery: 1,
      testimonials: 1,
      content: 1,
    };
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Booking methods
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentId.bookings++;
    const booking: Booking = {
      ...insertBooking,
      id,
      createdAt: new Date(),
      customerEmail: insertBooking.customerEmail || null,
      artistName: insertBooking.artistName || null,
      notes: insertBooking.notes || null,
      price: insertBooking.price || null,
      status: insertBooking.status || "pending",
      serviceCategory: insertBooking.serviceCategory
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBooking(id: number, update: Partial<Booking>): Promise<Booking> {
    const booking = await this.getBooking(id);
    if (!booking) throw new Error("Booking not found");
    const updatedBooking = { ...booking, ...update };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  // Artist methods
  async getArtists(): Promise<Artist[]> {
    return Array.from(this.artists.values());
  }

  async getArtist(id: number): Promise<Artist | undefined> {
    return this.artists.get(id);
  }

  async createArtist(insertArtist: InsertArtist): Promise<Artist> {
    const id = this.currentId.artists++;
    const artist: Artist = {
      ...insertArtist,
      id,
      rating: "5.0",
      bio: insertArtist.bio || null,
      phone: insertArtist.phone || null,
      email: insertArtist.email || null,
      imageUrl: insertArtist.imageUrl || null,
      isAvailable: insertArtist.isAvailable ?? true
    };
    this.artists.set(id, artist);
    return artist;
  }

  async updateArtist(id: number, update: Partial<Artist>): Promise<Artist> {
    const artist = await this.getArtist(id);
    if (!artist) throw new Error("Artist not found");
    const updatedArtist = { ...artist, ...update };
    this.artists.set(id, updatedArtist);
    return updatedArtist;
  }

  // Service methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentId.services++;
    const service: Service = {
      ...insertService,
      id,
      description: insertService.description || null,
      duration: insertService.duration || null,
      isVisible: insertService.isVisible ?? true
    };
    this.services.set(id, service);
    return service;
  }

  async updateService(id: number, update: Partial<Service>): Promise<Service> {
    const service = await this.getService(id);
    if (!service) throw new Error("Service not found");
    const updatedService = { ...service, ...update };
    this.services.set(id, updatedService);
    return updatedService;
  }

  // Customer methods
  async getCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values());
  }

  async getCustomer(id: number): Promise<Customer | undefined> {
    return this.customers.get(id);
  }

  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const id = this.currentId.customers++;
    const customer: Customer = {
      ...insertCustomer,
      id,
      totalBookings: 0,
      lastVisit: null,
      email: insertCustomer.email || null,
      notes: insertCustomer.notes || null,
      loyaltyStatus: insertCustomer.loyaltyStatus || "regular"
    };
    this.customers.set(id, customer);
    return customer;
  }

  async updateCustomer(id: number, update: Partial<Customer>): Promise<Customer> {
    const customer = await this.getCustomer(id);
    if (!customer) throw new Error("Customer not found");
    const updatedCustomer = { ...customer, ...update };
    this.customers.set(id, updatedCustomer);
    return updatedCustomer;
  }

  // Gallery methods
  async getGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.gallery.values());
  }

  async getGalleryItem(id: number): Promise<GalleryItem | undefined> {
    return this.gallery.get(id);
  }

  async createGalleryItem(insertGallery: InsertGallery): Promise<GalleryItem> {
    const id = this.currentId.gallery++;
    const galleryItem: GalleryItem = {
      ...insertGallery,
      id,
      createdAt: new Date(),
      caption: insertGallery.caption || null,
      tags: insertGallery.tags || null,
      isVisible: insertGallery.isVisible ?? true
    };
    this.gallery.set(id, galleryItem);
    return galleryItem;
  }

  async deleteGalleryItem(id: number): Promise<void> {
    this.gallery.delete(id);
  }

  async updateGalleryItem(id: number, update: Partial<GalleryItem>): Promise<GalleryItem> {
    const item = await this.getGalleryItem(id);
    if (!item) throw new Error("Gallery item not found");
    const updatedItem = { ...item, ...update };
    this.gallery.set(id, updatedItem);
    return updatedItem;
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentId.testimonials++;
    const testimonial: Testimonial = {
      ...insertTestimonial,
      id,
      createdAt: new Date(),
      service: insertTestimonial.service || null,
      isVisible: insertTestimonial.isVisible ?? true,
      isApproved: insertTestimonial.isApproved ?? false
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async deleteTestimonial(id: number): Promise<void> {
    this.testimonials.delete(id);
  }

  async updateTestimonial(id: number, update: Partial<Testimonial>): Promise<Testimonial> {
    const testimonial = await this.getTestimonial(id);
    if (!testimonial) throw new Error("Testimonial not found");
    const updatedTestimonial = { ...testimonial, ...update };
    this.testimonials.set(id, updatedTestimonial);
    return updatedTestimonial;
  }

  // Content methods
  async getContent(): Promise<ContentItem[]> {
    return Array.from(this.content.values());
  }

  async getContentByKey(key: string): Promise<ContentItem | undefined> {
    return Array.from(this.content.values()).find(item => item.key === key);
  }

  async createContent(insertContent: InsertContent): Promise<ContentItem> {
    const id = this.currentId.content++;
    const contentItem: ContentItem = {
      ...insertContent,
      id,
      updatedAt: new Date(),
      banglaText: insertContent.banglaText || null
    };
    this.content.set(id, contentItem);
    return contentItem;
  }

  async updateContent(id: number, update: Partial<ContentItem>): Promise<ContentItem> {
    const content = this.content.get(id);
    if (!content) throw new Error("Content not found");
    const updatedContent = { ...content, ...update, updatedAt: new Date() };
    this.content.set(id, updatedContent);
    return updatedContent;
  }
}

export const storage = new MemStorage();
