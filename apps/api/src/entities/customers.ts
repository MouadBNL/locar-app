import { createInsertSchema } from "drizzle-zod";
import { customers } from "../database/schema";
import { z } from "zod";

export const CustomerSchema = createInsertSchema(customers, {
  id: (field) => field.uuid().nullish(),
}).omit({
  created_at: true,
  updated_at: true,
  deleted_at: true,
});

export type CustomerData = z.infer<typeof CustomerSchema>;
