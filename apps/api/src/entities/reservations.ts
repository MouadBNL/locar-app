import { createInsertSchema } from "drizzle-zod";
import { reservations } from "../database/schema";
import { z } from "zod";

export const ReservationSchema = createInsertSchema(reservations, {
  id: (field) => field.uuid().nullish(),
  vehicle_id: (field) => field.uuid().min(1, "Vehicle ID is required"),
  customer_id: (field) => field.uuid().min(1, "Customer ID is required"),
  total_days: (field) => field.min(1),
})
  .omit({
    created_at: true,
    updated_at: true,
    deleted_at: true,
  })
  .refine(
    (data) =>
      data.checkin_date &&
      data.checkout_date &&
      data.checkin_date < data.checkout_date,
    {
      message: "Checkin date must be before checkout date",
      path: ["checkin_date"],
    }
  );

export type ReservationData = z.infer<typeof ReservationSchema>;
