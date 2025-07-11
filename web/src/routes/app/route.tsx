import { AuthProvider } from "@/components/auth-provider";
import { AppLayout } from "@/components/layouts/app/app-layout";
import { useAuthMe } from "@/repositories/auth";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/app")({
  component: AppLayoutRoot,
});

function AppLayoutRoot() {
  const { data, isLoading } = useAuthMe(undefined, {
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (!data) {
    return <Navigate to="/auth/signin" />;
  }

  return (
    <AuthProvider>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </AuthProvider>
  );
}
