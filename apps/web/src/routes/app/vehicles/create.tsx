import VehicleForm from "@/components/blocks/vehicle-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/vehicles/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="pt-8">
      <VehicleForm />
    </div>
  );
}
