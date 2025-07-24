import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/vehicles/$id/maintenance")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/vehicles/$id/maintenance"!</div>;
}
