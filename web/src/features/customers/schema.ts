import z from 'zod';

export const CustomerSchema = z.object({
  first_name: z.string().min(1).max(255),
  last_name: z.string().min(1).max(255),
  email: z.union([z.string().email(), z.literal('')]).nullish(),
  phone: z.string().max(255).nullish(),
  address: z.string().max(255).nullish(),
  id_card_number: z.string().max(255).nullish(),
  driver_license_number: z.string().max(255).nullish(),
  passport_number: z.string().max(255).nullish(),
  birth_date: z.string().datetime().nullish(),
});
