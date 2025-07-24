import { z } from "zod";

export const VehicleExpenseTypeEnum = {
  maintenance: "Maintenance",
  fuel: "Fuel",
  repair: "Repair",
  other: "Other",
} as const;

export const vehicleExpenseTypeSchema = z.enum([
  "maintenance",
  "fuel",
  "repair",
  "other",
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
