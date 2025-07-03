import {
  date,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { vehicles } from "./vehicles";
import { customers } from "./customer";
import { relations } from "drizzle-orm";

export const rentals = pgTable("rentals", {
  id: uuid("id").primaryKey().notNull(),
  // vehicle_id: uuid("vehicle_id")
  //   .references(() => vehicles.id)
  //   .notNull(),
  // customer_id: uuid("customer_id")
  //   .references(() => customers.id)
  //   .notNull(),
  code: text("code").notNull().unique(),
  // started_at: date("started_at", { mode: "string" }),
  // finished_at: date("finished_at", { mode: "string" }),
  // daily_rate: integer("daily_rate"),
  // total_days: integer("total_days"),
  // total_price: integer("total_price"),
  notes: text("notes"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  deleted_at: timestamp("deleted_at"),
});

export const rental_periods = pgTable("rental_periods", {
  id: uuid("id").primaryKey().notNull(),
  rental_id: uuid("rental_id")
    .references(() => rentals.id)
    .notNull(),
  pickup_date: date("pickup_date", { mode: "string" }),
  return_date: date("return_date", { mode: "string" }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const rental_customers = pgTable("rental_customers", {
  id: uuid("id").primaryKey().notNull(),
  rental_id: uuid("rental_id")
    .references(() => rentals.id)
    .notNull(),
  customer_id: uuid("customer_id").references(() => customers.id),
  full_name: text("full_name"),
  phone: text("phone"),
  address1: text("address1"),
  address2: text("address2"),
  id_number: text("id_number").notNull(),
  id_issued_at: date("id_issued_at", { mode: "string" }),
  id_expired_at: date("id_expired_at", { mode: "string" }),
  id_document: text("id_document"),
  license_number: text("license_number").notNull(),
  license_issued_at: date("license_issued_at", { mode: "string" }),
  license_expired_at: date("license_expired_at", { mode: "string" }),
  license_document: text("license_document"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const rental_vehicles = pgTable("rental_vehicles", {
  id: uuid("id").primaryKey().notNull(),
  rental_id: uuid("rental_id")
    .references(() => rentals.id)
    .notNull(),
  vehicle_id: uuid("vehicle_id")
    .notNull()
    .references(() => vehicles.id),
  plate_number: text("plate_number"),
  brand: text("brand"),
  model: text("model"),
  year: integer("year"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const rental_rates = pgTable("rental_rates", {
  id: uuid("id").primaryKey().notNull(),
  rental_id: uuid("rental_id")
    .references(() => rentals.id)
    .notNull(),
  unit: text("unit", { enum: ["daily", "weekly", "monthly", "km", "yearly"] }),
  price_per_unit: integer("price_per_unit"),
  number_of_units: integer("number_of_units"),
  total_price: integer("total_price"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const rentalRelations = relations(rentals, ({ one }) => ({
  period: one(rental_periods, {
    fields: [rentals.id],
    references: [rental_periods.rental_id],
  }),
  customer: one(rental_customers, {
    fields: [rentals.id],
    references: [rental_customers.rental_id],
  }),
  vehicle: one(rental_vehicles, {
    fields: [rentals.id],
    references: [rental_vehicles.rental_id],
  }),
  rate: one(rental_rates, {
    fields: [rentals.id],
    references: [rental_rates.rental_id],
  }),
}));

export const rentalVehiclesRelations = relations(
  rental_vehicles,
  ({ one }) => ({
    rental: one(rentals, {
      fields: [rental_vehicles.rental_id],
      references: [rentals.id],
    }),
  })
);

export const rentalCustomersRelations = relations(
  rental_customers,
  ({ one }) => ({
    rental: one(rentals, {
      fields: [rental_customers.rental_id],
      references: [rentals.id],
    }),
  })
);
