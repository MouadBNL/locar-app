import type { z } from "zod";
import type { vehicleExpenseSchema, vehicleExpenseTypeSchema } from "./schema";
import type { DocumentResource } from "../documents";

export type VehicleExpenseType = z.infer<typeof vehicleExpenseTypeSchema>;

export type VehicleExpenseRequest = z.infer<typeof vehicleExpenseSchema>;

export type VehicleExpenseResource = {
  id: string;
  type: VehicleExpenseType;
  amount: number;
  date: string;
  title: string;
  reference: string;
  receipt_document_id: string;
  receipt_document?: DocumentResource;
  notes: string;
  created_at: string;
  updated_at: string;
};
