import z from 'zod';

export const ReservationSchema = z.object({
  customer_id: z.string().uuid(),
  vehicle_id: z.string().uuid(),
  check_in_date: z.string().datetime(),
  check_out_date: z.string().datetime(),
  daily_rate: z.number().min(0),
  total_days: z.number().min(0),
  total_price: z.number().min(0),
  notes: z.string().max(1000).nullish(),
});
