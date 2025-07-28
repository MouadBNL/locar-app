import { z } from 'zod';

export const vehicleMaintenanceSchema = z.object({
  started_at: z.string().datetime(),
  finished_at: z.string().datetime().nullish(),
  cancelled_at: z.string().datetime().nullish(),
  title: z.string().nullish(),
  reference: z.string().nullish(),
  notes: z.string().nullish(),
  receipt_document_id: z.string().nullish(),
  expenses: z.array(z.string().uuid()).nullish(),
});
