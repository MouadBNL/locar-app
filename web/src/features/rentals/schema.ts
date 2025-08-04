import { z } from 'zod';

export const RentalTimeframeSchema = z.object({
  id: z.string().uuid().nullish(),
  rental_id: z.string().uuid().nullish(),
  departure_date: z.string().datetime(),
  return_date: z.string().datetime(),
  actual_departure_date: z.string().datetime().nullish(),
  actual_return_date: z.string().datetime().nullish(),
  total_hours: z.number().int().min(0).nullish(),
  total_days: z.number().int().min(0).nullish(),
  total_weeks: z.number().int().min(0).nullish(),
  total_months: z.number().int().min(0).nullish(),
});

export const RenterSchema = z.object({
  id: z.string().uuid().nullish(),
  rental_id: z.string().uuid().nullish(),
  customer_id: z.string().uuid().nullish(),
  full_name: z.string().max(255),
  phone: z.string().max(255).nullish(),
  email: z.string().email().max(255).nullish(),
  id_card_number: z.string().max(255).nullish(),
  birth_date: z.string().datetime().nullish(),
  address_primary: z.string().max(255).nullish(),
  address_secondary: z.string().max(255).nullish(),
  driver_license_number: z.string().max(255).nullish(),
  driver_license_issuing_city: z.string().max(255).nullish(),
  driver_license_issuing_date: z.string().datetime().nullish(),
  driver_license_expiration_date: z.string().datetime().nullish(),
  passport_number: z.string().max(255).nullish(),
  passport_country: z.string().max(255).nullish(),
  passport_issuing_date: z.string().datetime().nullish(),
  passport_expiration_date: z.string().datetime().nullish(),
  id_card_scan_document: z.string().max(255).nullish(),
  driver_license_scan_document: z.string().max(255).nullish(),
  identifier: z.string().max(255).nullish(),
});

export const RentalVehichleSchema = z.object({
  vehicle_id: z.string().uuid().nullish(),
  make: z.string(),
  model: z.string(),
  year: z.number().int().min(1900).max(3000),
  license_plate: z.string().max(255),
  // Meta
  color: z.string().max(255).nullish(),
  transmission: z.string().max(255).nullish(),
  seats: z.number().int().min(0).nullish(),
  doors: z.number().int().min(0).nullish(),
  fuel_type: z.string().max(255).nullish(),
  mileage: z.number().int().min(0).nullish(),
});

export const RentalRateSchema = z.object({
  id: z.string().uuid().nullish(),
  rental_id: z.string().uuid().nullish(),
  day_quantity: z.number().min(0).nullish(),
  day_rate: z.number().min(0).nullish(),
  day_total: z.number().min(0).nullish(),
  extra_quantity: z.number().min(0).nullish(),
  extra_rate: z.number().min(0).nullish(),
  extra_total: z.number().min(0).nullish(),
  discount: z.number().min(0).nullish(),
  total: z.number().min(0).nullish(),
});

export const RentalChargesSummarySchema = z.object({
  day_rate: z.number().min(0),
  day_quantity: z.number().min(0),
  day_total: z.number().min(0),
  extra_rate: z.number().min(0),
  extra_quantity: z.number().min(0),
  extra_total: z.number().min(0),
  discount: z.number().min(0),
  total: z.number().min(0),
  paid: z.number().min(0),
  due: z.number().min(0),
  deposit: z.number().min(0),
  refunded: z.number().min(0),
  refund_due: z.number().min(0),
});

export const RentalSchema = z.object({
  id: z.string().uuid().nullish(),
  rental_number: z.string().max(255),
  notes: z.string().max(255).nullish(),
  timeframe: RentalTimeframeSchema,
  renter: RenterSchema,
  vehicle: RentalVehichleSchema,
  rate: RentalRateSchema,
  charges_summary: RentalChargesSummarySchema.nullish(),
});

export const RentalStartSchema = z.object({
  actual_departure_date: z.string().datetime(),
  mileage: z.number().int().min(0).nullish(),
});

export const RentalReturnSchema = z.object({
  actual_return_date: z.string().datetime(),
  mileage: z.number().int().min(0).nullish(),
  customer: z.object({
    rating: z.number().min(0).max(5),
    comment: z.string().max(255).nullish(),
  }).nullish(),
});
