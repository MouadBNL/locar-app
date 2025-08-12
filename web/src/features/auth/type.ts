import type z from 'zod';
import type { SignInSchema, SignUpSchema } from './schema';

export type SignInRequest = z.infer<typeof SignInSchema>;

export type SignUpRequest = z.infer<typeof SignUpSchema>;

export interface AuthResponse {
  tenant_id: string;
  token: string;
}

export interface AuthMeResponse {
  tenant_id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
