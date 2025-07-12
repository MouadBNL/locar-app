import VehicleForm from "@/components/blocks/vehicle-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading3 } from "@/components/ui/typography";
import { useVehicleCreate } from "@/features/vehicles";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/app/vehicles/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate: createVehicle, isPending } = useVehicleCreate({
    onSuccess: () => {
      toast.success("Vehicle created successfully");
      navigate({ to: "/app/vehicles" });
    },
    onError: () => {
      toast.error("Failed to create vehicle");
    },
  });

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <Heading3>Create Vehicle</Heading3>

        <Button asChild variant="destructive">
          <Link to="/app/vehicles">Cancel</Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          <VehicleForm submit={createVehicle} loading={isPending} />
        </CardContent>
      </Card>
    </div>
  );
}
