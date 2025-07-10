import * as React from "react";
import { useSession } from "@/hooks/session";

type User = {
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null | undefined;
  createdAt: Date;
  updatedAt: Date;
  id: string;
};
type Session = {
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string | null | undefined;
  userAgent?: string | null | undefined;
  userId: string;
  id: string;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User;
  session: Session;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isLoading } = useSession();

  const value: AuthContextValue = React.useMemo(
    () => ({
      isAuthenticated: !!session,
      isLoading,
      user: session?.data?.user!,
      session: session?.data?.session!,
    }),
    [session, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
