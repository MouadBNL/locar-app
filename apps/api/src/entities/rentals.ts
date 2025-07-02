import { createInsertSchema } from "drizzle-zod";
import { rentals } from "../database/schema";
import { z } from "zod";
import { CustomerData } from "./customers";
import { VehicleData } from "./vehicles";

export const RentalSchema = createInsertSchema(rentals, {
  id: (field) => field.uuid().nullish(),
  vehicle_id: (field) => field.uuid().min(1, "Vehicle ID is required"),
  customer_id: (field) => field.uuid().min(1, "Customer ID is required"),
  code: (field) => field.min(1, "Code is required"),
  total_days: (field) => field.min(1),
})
  .omit({
    created_at: true,
    updated_at: true,
    deleted_at: true,
  })
  .refine(
    (data) =>
      data.started_at && data.finished_at && data.started_at < data.finished_at,
    {
      message: "The start date must be before the finish date",
      path: ["started_at"],
    }
  );

export type RentalData = z.infer<typeof RentalSchema> & {
  vehicle?: VehicleData;
  customer?: CustomerData;
};
