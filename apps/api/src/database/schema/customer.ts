import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
  id: uuid("id").primaryKey().notNull(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  license_number: text("license_number"),
  license_expiration_date: timestamp("license_expiration_date", {
    mode: "string",
  }),
  license_issuing_date: timestamp("license_issuing_date", {
    mode: "string",
  }),
  license_photo_url: text("license_photo_url"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  deleted_at: timestamp("deleted_at"),
});     
