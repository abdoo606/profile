import { pgTable, text, serial, integer, timestamp, jsonb, boolean, numeric } from "drizzle-orm/pg-core";

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  externalId: text("external_id").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  price: integer("price").notNull(),
  previewUrl: text("preview_url").notNull().default("#"),
  features: jsonb("features").notNull().$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  externalId: text("external_id").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  link: text("link").notNull().default("#"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  externalId: text("external_id").notNull().unique(),
  templateId: text("template_id").notNull(),
  templateName: text("template_name").notNull(),
  email: text("email").notNull(),
  txHash: text("tx_hash").notNull(),
  amount: integer("amount").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const visitors = pgTable("visitors", {
  id: serial("id").primaryKey(),
  page: text("page").notNull(),
  device: text("device"),
  referrer: text("referrer"),
  createdAt: timestamp("created_at").defaultNow(),
});
