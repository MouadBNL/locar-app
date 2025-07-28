import type { z } from 'zod';
import type { CustomerSummaryResource } from '../customers';
import type { VehicleSummaryResource } from '../vehicles';
import type { ReservationSchema } from './schema';

export type ReservationData = z.infer<typeof ReservationSchema> & {
  id?: string;
};

export interface ReservationResource {
  id: string;
  customer_id: string;
  vehicle_id: string;
  customer: CustomerSummaryResource;
  vehicle: VehicleSummaryResource;
  check_in_date: string;
  check_out_date: string;
  daily_rate: number;
  total_days: number;
  total_price: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}
