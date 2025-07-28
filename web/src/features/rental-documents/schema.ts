import z from 'zod';

export const rentalDocumentTypeSchema = [
  'rental_agreement',
  'id_card_scan',
  'driver_license_scan',
  'other',
] as const;

export const rentalDocumentTypeMap: Record<
  (typeof rentalDocumentTypeSchema)[number],
  string
> = {
  rental_agreement: 'Rental Agreement',
  id_card_scan: 'ID Card Scan',
  driver_license_scan: 'Driver License Scan',
  other: 'Other',
};

export const rentalDocumentSchema = z.object({
  title: z.string().min(3).max(255),
  document_id: z.string().uuid(),
  type: z.enum(rentalDocumentTypeSchema),
  description: z.string().optional(),
});
