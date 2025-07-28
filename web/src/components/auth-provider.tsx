/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import { useAuthMe } from '@/features/auth';

interface User {
  name: string;
  email: string;
  image: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined,
);

export function useAuth() {
  const context = React.use(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useAuthMe();

  const value: AuthContextValue = React.useMemo(
    () => ({
      isAuthenticated: !!data,
      isLoading,
      user: { ...data!, image: null },
    }),
    [data, isLoading],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
