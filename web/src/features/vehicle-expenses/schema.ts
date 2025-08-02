import { z } from 'zod';

export const VehicleExpenseTypeEnum = {
  fuel: 'fuel',
  car_wash: 'car_wash',
  tires: 'tires',
  oil_change: 'oil_change',
  tax: 'tax', // vignette
  brakes: 'brakes',
  diagnostic: 'diagnostic',
  inspection: 'inspection', // Visite technique
  electrician: 'electrician',
  insurance: 'insurance',
  mechanic: 'mechanic',
  parking: 'parking',
  spare_parts: 'spare_parts',
  other: 'other',
} as const;

export const vehicleExpenseTypeSchema = z.enum([
  'fuel',
  'car_wash',
  'tires',
  'oil_change',
  'tax', // vignette
  'brakes',
  'diagnostic',
  'inspection', // Visite technique
  'electrician',
  'insurance',
  'mechanic',
  'parking',
  'spare_parts',
  'other',

]);

export const vehicleExpenseSchema = z.object({
  type: vehicleExpenseTypeSchema,
  amount: z.number().min(0),
  date: z.string().datetime().nullish(),
  title: z.string().nullish(),
  reference: z.string().nullish(),
  receipt_document_id: z.string().nullish(),
  notes: z.string().nullish(),
});

export const VehicleStatus = {
  available: 'Available',
  maintenance: 'Maintenance',
  booked: 'Booked',
  rented: 'Rented',
} as const;
