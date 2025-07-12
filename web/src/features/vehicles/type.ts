import type z from "zod";
import type { VehicleSchema } from ".";


export type VehicleData = z.infer<typeof VehicleSchema>