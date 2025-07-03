import { createInsertSchema } from "drizzle-zod";
import { rentals } from "../database/schema";
import { z } from "zod";

export const RentalSchema = createInsertSchema(rentals, {
  id: (field) => field.uuid().nullish(),
  code: (field) => field.min(1, "Code is required"),
  notes: (field) => field.nullish(),
}).omit({
  created_at: true,
  updated_at: true,
  deleted_at: true,
});

export type RentalData = z.infer<typeof RentalSchema> & {
  vehicle?: RentalVehicleData;
  customer?: RentalCustomerData;
  rate?: RentalRateData;
  period?: RentalPeriodData;
  payments?: RentalPaymentData[];
};

export const RentalPeriodSchema = z.object({
  pickup_date: z.string().date(),
  return_date: z.string().date(),
});
export type RentalPeriodData = z.infer<typeof RentalPeriodSchema>;

export const RentalCustomerSchema = z.object({
  customer_id: z.string().uuid().nullish(),
  full_name: z.string(),
  phone: z.string().nullish(),
  address1: z.string(),
  address2: z.string().nullish(),
  id_number: z.string().min(1, "ID number is required"),
  id_issued_at: z.string().date(),
  id_expired_at: z.string().date(),
  id_document: z.string().nullish(),
  license_number: z.string().min(1, "License number is required"),
  license_issued_at: z.string().date(),
  license_expired_at: z.string().date(),
  license_document: z.string().nullish(),
});
export type RentalCustomerData = z.infer<typeof RentalCustomerSchema>;

export const RentalVehicleSchema = z.object({
  vehicle_id: z.string().uuid(),
  plate_number: z.string().nullish(),
  brand: z.string().nullish(),
  model: z.string().nullish(),
  year: z.number().nullish(),
  color: z.string().nullish(),
});
export type RentalVehicleData = z.infer<typeof RentalVehicleSchema>;

export const RentalRateSchema = z.object({
  unit: z.enum(["daily", "weekly", "monthly", "km", "yearly"]),
  price_per_unit: z.number(),
  number_of_units: z.number(),
  total_price: z.number(),
});
export type RentalRateData = z.infer<typeof RentalRateSchema>;

export const RentalPaymentSchema = z.object({
  amount: z.number(),
  payment_date: z.string().date(),
  payment_method: z.string(),
  payment_status: z.string(),
  notes: z.string().nullish(),
});
export type RentalPaymentData = z.infer<typeof RentalPaymentSchema>;

export const RentalInitializationSchema = z.object({
  code: z.string(),
  period: RentalPeriodSchema,
  customer: RentalCustomerSchema,
  vehicle: RentalVehicleSchema,
  rate: RentalRateSchema,
  payments: z.array(RentalPaymentSchema).nullish(),
  notes: z.string().nullish(),
});

export type RentalInitializationData = z.infer<
  typeof RentalInitializationSchema
>;
