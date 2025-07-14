import type z from "zod";
import type { VehicleSchema } from ".";

export type VehicleData = z.infer<typeof VehicleSchema>;

export type VehicleSummaryResource = {
  id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
};
