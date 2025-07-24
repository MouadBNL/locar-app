import type z from "zod";
import type { VehicleSchema } from ".";
import type { VehicleStatus } from "../vehicle-expenses";

export type VehicleData = z.infer<typeof VehicleSchema>;

export type VehicleResource = {
  id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
  mileage: number;
  fuel_type: z.infer<typeof VehicleSchema.shape.fuel_type>;
  transmission: z.infer<typeof VehicleSchema.shape.transmission>;
  number_of_seats: number;
  number_of_doors: number;
  color: string;
  photo_url: string;
  status: VehicleStatusType;
  created_at: string;
  updated_at: string;
};

export type VehicleSummaryResource = {
  id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
};

export type VehicleStatusType = keyof typeof VehicleStatus;
