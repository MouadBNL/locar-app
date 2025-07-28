import type z from 'zod';
import type { DocumentResource } from '../documents';
import type { rentalDocumentSchema, rentalDocumentTypeSchema } from './schema';

export type RentalDocumentData = z.infer<typeof rentalDocumentSchema>;

export interface RentalDocumentResource {
  id: string;
  title: string;
  type: (typeof rentalDocumentTypeSchema)[number];
  description: string;
  rental_id: string;
  document_id: string;
  document: DocumentResource;
  created_at: string;
  updated_at: string;
}
