import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// Leads table - stores contact form submissions
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Admin users table - stores admin credentials
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
