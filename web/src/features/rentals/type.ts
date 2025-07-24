import z from "zod";
import type {
  RentalSchema,
  RentalRateSchema,
  RentalTimeframeSchema,
  RentalVehichleSchema,
  RenterSchema,
  RentalStartSchema,
  RentalReturnSchema,
  RentalChargesSummarySchema,
} from "./schema";
import type { DocumentResource } from "../documents";

export type RentalSummaryData = {
  id: string;
  rental_number: string;
  status: RentalStatus;
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
export type RentalData = z.infer<typeof RentalSchema> & {
  status: RentalStatus;
  agreement_document: DocumentResource | null;
};

export type RentalShowResponse = {
  id: string;
  rental_number: string;
  status: RentalStatus;
  customer: {
    id: string;
    full_name: string;
    phone: string;
    identifier: string;
    address: string;
    driver_license_number: string;
  };
  departure_date: string;
  return_date: string;
  duration: number;
  total_price: number;
  vehicle: {
    id: string;
    make: string;
    model: string;
    year: number;
    license_plate: string;
    color: string;
    transmission: "AT" | "MT";
    seats: number;
    doors: number;
    fuel_type: "Petrol" | "Diesel" | "Electric" | "Hybrid";
    mileage: number;
  };
  created_at: string;
  updated_at: string;
};

export const RentalStatusSchema = z.enum([
  "draft",
  "started",
  "finished",
  "cancelled",
]);
export type RentalStatus = z.infer<typeof RentalStatusSchema>;

export type RentalStartData = z.infer<typeof RentalStartSchema>;
export type RentalReturnData = z.infer<typeof RentalReturnSchema>;

export type RentalChargesSummaryData = z.infer<
  typeof RentalChargesSummarySchema
>;
