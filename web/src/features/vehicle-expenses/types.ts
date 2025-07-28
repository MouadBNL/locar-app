import type { z } from 'zod';
import type { DocumentResource } from '../documents';
import type { vehicleExpenseSchema, vehicleExpenseTypeSchema } from './schema';

export type VehicleExpenseType = z.infer<typeof vehicleExpenseTypeSchema>;

export type VehicleExpenseRequest = z.infer<typeof vehicleExpenseSchema>;

export interface VehicleExpenseResource {
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
}
