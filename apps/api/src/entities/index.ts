import { createInsertSchema } from "drizzle-zod";
import { customers, vehicles } from "../database/schema";
import { z } from "zod";

export const VehicleSchema = createInsertSchema(vehicles, {
  id: (field) => field.nullish(),
  make: (field) => field.min(1).trim(),
  model: (field) => field.min(1).trim(),
  license_plate: (field) => field.min(1).trim(),
  year: (field) => field.min(1900),
  number_of_seats: (field) => field.min(1),
  number_of_doors: (field) => field.min(1),
}).omit({
  created_at: true,
  updated_at: true,
});

export type VehicleData = z.infer<typeof VehicleSchema>;

export const CustomerSchema = createInsertSchema(customers, {
  id: (field) => field.uuid().nullish(),
  license_expiration_date: (field) => field.date().nullish(),
}).omit({
  created_at: true,
  updated_at: true,
  deleted_at: true,
});

export type CustomerData = z.infer<typeof CustomerSchema>;
