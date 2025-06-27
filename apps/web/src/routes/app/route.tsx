import { AppLayout } from "@/components/layouts/app/app-layout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  component: AppLayoutRoot,
});

function AppLayoutRoot() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
