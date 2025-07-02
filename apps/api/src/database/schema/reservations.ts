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

export const reservations = pgTable("reservations", {
  id: uuid("id").primaryKey().notNull(),
  vehicle_id: uuid("vehicle_id")
    .references(() => vehicles.id)
    .notNull(),
  customer_id: uuid("customer_id")
    .references(() => customers.id)
    .notNull(),
  checkin_date: date("checkin_date", { mode: "string" }),
  checkout_date: date("checkout_date", { mode: "string" }),
  daily_rate: integer("daily_rate"),
  total_days: integer("total_days"),
  total_price: integer("total_price"),
  notes: text("notes"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  deleted_at: timestamp("deleted_at"),
});

export const reservationRelations = relations(reservations, ({ one }) => ({
  vehicle: one(vehicles, {
    fields: [reservations.vehicle_id],
    references: [vehicles.id],
  }),
  customer: one(customers, {
    fields: [reservations.customer_id],
    references: [customers.id],
  }), 
}));
