import { z } from 'zod';

export const RentalPaymentMethodSchema = z.enum([
  'cash',
  'card',
  'bank_transfer',
  'cheque',
  'other',
]);
export const RentalPaymentTypeSchema = z.enum([
  'normal',
  'deposit',
  'refund',
  'other',
]);

export const RentalPaymentSchema = z.object({
  method: RentalPaymentMethodSchema,
  type: RentalPaymentTypeSchema,
  amount: z.number().min(0),
  date: z.string().datetime().nullish(),
  receipt_document_id: z.string().uuid().nullish(),
  reference: z.string().nullish(),
  notes: z.string().nullish(),
});
