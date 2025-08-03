import { z } from 'zod';

export const TrafficInfractionSchema = z.object({
  id: z.string().uuid().nullish(),
  date: z.string().datetime().nullish(),
  title: z.string().max(255).nullish(),
  document_id: z.string().uuid().nullish(),
  location: z.string().max(255).nullish(),
  vehicle_id: z.string().uuid().nullish(),
  rental_id: z.string().uuid().nullish(),
  customer_id: z.string().uuid().nullish(),
});
