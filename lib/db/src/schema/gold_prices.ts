import { pgTable, text, serial, timestamp, numeric, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const goldPriceHistoryTable = pgTable("gold_price_history", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(), // ALTIN, AYAR22, USDTRY vb.
  buyPrice: numeric("buy_price", { precision: 20, scale: 4 }).notNull(),
  sellPrice: numeric("sell_price", { precision: 20, scale: 4 }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertGoldPriceSchema = createInsertSchema(goldPriceHistoryTable).omit({ id: true });
export const selectGoldPriceSchema = createSelectSchema(goldPriceHistoryTable);

export type InsertGoldPrice = z.infer<typeof insertGoldPriceSchema>;
export type GoldPriceRecord = typeof goldPriceHistoryTable.$inferSelect;
