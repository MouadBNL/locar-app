import z from 'zod';

export const ReservationSchema = z.object({
  reservation_number: z.string().max(255),
  customer_id: z.string().uuid(),
  vehicle_id: z.string().uuid(),
  check_in_date: z.string().datetime(),
  check_out_date: z.string().datetime(),
  daily_rate: z.number().min(0),
  total_days: z.number().min(0),
  total_price: z.number().min(0),
  deposit: z.number().min(0),
  notes: z.string().max(1000).nullish(),
});
