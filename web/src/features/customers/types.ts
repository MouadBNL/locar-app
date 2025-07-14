import type { z } from "zod";
import type { CustomerSchema } from "./schema";

export type CustomerData = z.infer<typeof CustomerSchema> & {
  id?: string;
};
