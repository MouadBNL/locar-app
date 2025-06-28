import VehicleForm from "@/components/blocks/vehicle-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading3 } from "@/components/ui/typography";
import { VehicleRepository } from "@/repositories";
import type { VehicleData } from "@locar/api/entities";
import { useMutation } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/app/vehicles/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const vehicle = await VehicleRepository.show(params.id);
    return { vehicle };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const router = useRouter();

  const { vehicle } = Route.useLoaderData();

  const { mutate: createVehicle, isPending } = useMutation({
    mutationFn: (data: VehicleData) => VehicleRepository.update(id, data),
    onSuccess: () => {
      toast.success("Vehicle updated successfully");
      router.invalidate();
      navigate({ to: "/app/vehicles" });
    },
    onError: () => {
      toast.error("Failed to update vehicle");
    },
  });

  return (
    <div className="pt-8">
      <div className="flex justify-between items-center mb-6">
        <Heading3>Create Vehicle</Heading3>

        <Button asChild variant="destructive">
          <Link to="/app/vehicles">Cancel</Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          <VehicleForm
            submit={createVehicle}
            loading={isPending}
            initialValues={vehicle ?? undefined}
          />
        </CardContent>
      </Card>
    </div>
  );
}
