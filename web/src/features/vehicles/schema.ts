import z from 'zod';

export const fuelTypeSchema = z.enum(['gasoline', 'diesel', 'electric', 'hybrid']);

export const VehicleSchema = z
  .object({
    id: z.string().uuid().nullish(),
    make: z.string().max(255),
    model: z.string().max(255),
    first_service_date: z.string().datetime(),
    last_service_date: z.string().datetime(),
    license_plate: z
      .string()
      .max(255)
      .min(1, { message: 'License plate is required' }),
    vin: z.string().min(1, { message: 'VIN is required' }).max(255),
    mileage: z.number().int().min(0),
    fuel_type: z.enum(['gasoline', 'diesel', 'electric', 'hybrid']),
    transmission: z.enum(['AT', 'MT']),
    number_of_seats: z.number().int().min(1),
    number_of_doors: z.number().int().min(1),
    color: z.string().max(255).nullable().optional(),
    photo_url: z.string().max(255).nullable().optional(),
    created_at: z.string().datetime().nullish(),
    updated_at: z.string().datetime().nullish(),
  })
  .strict();
