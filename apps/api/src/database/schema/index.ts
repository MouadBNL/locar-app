import { pgTable, text, integer, timestamp, uuid } from "drizzle-orm/pg-core";

export const vehicles = pgTable("vehicles", {
  id: uuid("id").primaryKey().notNull(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  license_plate: text("license_plate").notNull().unique(),
  mileage: integer("mileage").default(0).notNull(),
  fuel_type: text("fuel_type", {
    enum: ["gasoline", "diesel", "electric", "hybrid"],
  }).notNull(),
  transmission: text("transmission", { enum: ["AT", "MT"] }).notNull(),
  number_of_seats: integer("number_of_seats").notNull(),
  number_of_doors: integer("number_of_doors").notNull(),
  color: text("color"),
  photo_url: text("photo_url"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
