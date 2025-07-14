import type z from "zod";
import type {
  RentalSchema,
  RentalRateSchema,
  RentalTimeframeSchema,
  RentalVehichleSchema,
  RenterSchema,
} from "./schema";

export type RentalSummaryData = {
  id: string;
  rental_number: string;
  customer: {
    id: string;
    full_name: string;
    phone: string;
    identifier: string;
  };
  departure_date: string;
  return_date: string;
  duration: number | null;
  total_price: number;
  vehicle: {
    id: string;
    make: string;
    model: string;
    year: number;
    license_plate: string;
  };
  created_at: string;
  updated_at: string;
};

export type RentalTimeframeData = z.infer<typeof RentalTimeframeSchema>;
export type RenterData = z.infer<typeof RenterSchema>;
export type RentalVehichleData = z.infer<typeof RentalVehichleSchema>;
export type RentalRateData = z.infer<typeof RentalRateSchema>;
export type RentalData = z.infer<typeof RentalSchema>;
