import { createInsertSchema } from "drizzle-zod";
import { vehicles } from "../database/schema";
import { z } from "zod";

export const VehicleSchema = createInsertSchema(vehicles, {
  make: (field) => field.min(1).trim(),
  model: (field) => field.min(1).trim(),
  license_plate: (field) => field.min(1).trim(),
  year: (field) => field.min(1900),
  number_of_seats: (field) => field.min(1),
  number_of_doors: (field) => field.min(1),
}).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type VehicleData = z.infer<typeof VehicleSchema>;
