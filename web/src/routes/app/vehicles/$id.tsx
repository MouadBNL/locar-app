import { TabsNavigation } from "@/components/ui/tabs-navigation";
import { Heading3 } from "@/components/ui/typography";
import { vehicleShowFn } from "@/features/vehicles";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/vehicles/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const vehicle = (await vehicleShowFn(params.id)).data;
    return { vehicle };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { vehicle } = Route.useLoaderData();

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <Heading3>
          {vehicle?.make} {vehicle?.model} {vehicle?.year}
        </Heading3>
        <p>{vehicle?.license_plate}</p>
      </div>

      <TabsNavigation
        basePath={`/app/vehicles/${id}`}
        tabs={[
          { label: "Summary", path: "" },
          { label: "Expenses", path: "expenses" },
          { label: "Maintenance", path: "maintenance" },
        ]}
      />
    </div>
  );
}
