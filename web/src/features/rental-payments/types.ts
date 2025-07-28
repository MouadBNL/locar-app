import type z from 'zod';
import type { RentalChargesSummaryData } from '../rentals';
import type {
  RentalPaymentMethodSchema,
  RentalPaymentSchema,
  RentalPaymentTypeSchema,
} from './schema';

export type RentalPaymentData = z.infer<typeof RentalPaymentSchema>;
export type RentalPaymentMethod = z.infer<typeof RentalPaymentMethodSchema>;
export type RentalPaymentType = z.infer<typeof RentalPaymentTypeSchema>;

export interface RentalPaymentResource {
  id: string;
  rental_id: string;
  method: RentalPaymentMethod;
  type: RentalPaymentType;
  amount: number;
  date: string;
  receipt_document_id: string;
  reference?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface RentalPaymentIndexResponse {
  payments: RentalPaymentResource[];
  meta: RentalChargesSummaryData;
}
