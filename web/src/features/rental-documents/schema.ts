import z from "zod";

export const rentalDocumentTypeSchema = [
  "rental_agreement",
  "id_card_scan",
  "other",
] as const;

export const rentalDocumentTypeMap: Record<
  (typeof rentalDocumentTypeSchema)[number],
  string
> = {
  rental_agreement: "Rental Agreement",
  id_card_scan: "ID Card Scan",
  other: "Other",
};

export const rentalDocumentSchema = z.object({
  document_id: z.string().uuid(),
  type: z.enum(rentalDocumentTypeSchema),
  description: z.string().optional(),
});
