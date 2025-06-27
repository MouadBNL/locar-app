import { VehicleRepository } from "@/repositories";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/vehicles/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isFetching } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => VehicleRepository.index(),
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <pre>{JSON.stringify({ data, isFetching }, null, 2)}</pre>
    </div>
  );
}
