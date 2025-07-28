import type { z } from 'zod';
import type { VehicleExpenseResource } from '../vehicle-expenses';
import type { vehicleMaintenanceSchema } from './schema';

export type VehicleMaintenanceRequest = z.infer<
  typeof vehicleMaintenanceSchema
>;

export interface VehicleMaintenanceResource {
  id: string;
  started_at: string;
  finished_at: string | null;
  cancelled_at: string | null;
  title: string | null;
  reference: string | null;
  notes: string | null;
  receipt_document_id: string | null;
  expenses?: VehicleExpenseResource[];
  expenses_sum?: number;
  expenses_count?: number;
  created_at: string;
  updated_at: string;
}
