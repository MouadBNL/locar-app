import { LoginForm } from "@/components/blocks/login-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="h-screen flex items-center justify-center">
      <LoginForm />
    </main>
  );
}
