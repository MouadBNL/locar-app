import type z from 'zod';
import type { SignInSchema, SignUpSchema } from './schema';

export type SignInRequest = z.infer<typeof SignInSchema>;

export type SignUpRequest = z.infer<typeof SignUpSchema>;

export interface AuthResponse {
  token: string;
}

export interface AuthMeResponse {
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
