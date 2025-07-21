import type z from "zod";
import { rentalDocumentSchema, rentalDocumentTypeSchema } from "./schema";
import type { DocumentResource } from "../documents";

export type RentalDocumentData = z.infer<typeof rentalDocumentSchema>;

export type RentalDocumentResource = {
  id: string;
  title: string;
  type: (typeof rentalDocumentTypeSchema)[number];
  description: string;
  rental_id: string;
  document_id: string;
  document: DocumentResource;
  created_at: string;
  updated_at: string;
};
