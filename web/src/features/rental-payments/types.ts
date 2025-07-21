import type z from "zod";
import type {
  RentalPaymentMethodSchema,
  RentalPaymentSchema,
  RentalPaymentTypeSchema,
} from "./schema";

export type RentalPaymentData = z.infer<typeof RentalPaymentSchema>;
export type RentalPaymentMethod = z.infer<typeof RentalPaymentMethodSchema>;
export type RentalPaymentType = z.infer<typeof RentalPaymentTypeSchema>;

export type RentalPaymentResource = {
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
};

export type RentalPaymentIndexResponse = {
  payments: RentalPaymentResource[];
  meta: {
    payment_total: number;
    payment_due: number;
    payment_paid: number;
    deposit_total: number;
    deposit_refunded: number;
    deposit_due: number;
  };
};
