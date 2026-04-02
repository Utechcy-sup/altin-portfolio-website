import { pgTable, text, serial, timestamp, numeric, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(), // "women", "men", "investment", "custom"
  price: numeric("price", { precision: 20, scale: 2 }), //Opsiyonel fiyat
  imageUrl: text("image_url").notNull(),
  
  // Vitrin ve Yönetim alanları
  displayLocation: text("display_location").default("collection"), // "hero", "featured", "banner", "collection"
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

export const selectProductSchema = createSelectSchema(productsTable);

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;
