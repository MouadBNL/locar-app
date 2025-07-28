import type z from 'zod';
import type { documentCreateSchema } from './schema';

export interface DocumentResource {
  id: string;
  filename: string;
  url: string;
  mime_type: string;
  size: number;
  created_at: string;
  updated_at: string;
}

export type DocumentCreateRequest = z.infer<typeof documentCreateSchema>;
