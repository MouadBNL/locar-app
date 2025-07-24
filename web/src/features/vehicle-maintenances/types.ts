import { z } from "zod";
import { vehicleMaintenanceSchema } from "./schema";
import type { VehicleExpenseResource } from "../vehicle-expenses";

export type VehicleMaintenanceRequest = z.infer<
  typeof vehicleMaintenanceSchema
>;

export type VehicleMaintenanceResource = {
  id: string;
  started_at: string;
  finished_at: string | null;
  cancelled_at: string | null;
  title: string | null;
  reference: string | null;
  notes: string | null;
  receipt_document_id: string | null;
  expenses?: VehicleExpenseResource[];
};
