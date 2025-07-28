import { createFileRoute } from '@tanstack/react-router';
import { VehicleStatusBadge } from '@/components/blocks/vehicle-status-badge';
import { Button } from '@/components/ui/button';
import { TabsNavigation } from '@/components/ui/tabs-navigation';
import { Heading3 } from '@/components/ui/typography';
import { vehicleShowFn } from '@/features/vehicles';

export const Route = createFileRoute('/app/vehicles/$id')({
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
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-start gap-8">
          <div>
            <Heading3>
              {vehicle?.make}
              {' '}
              {vehicle?.model}
              {' '}
              {vehicle?.year}
            </Heading3>
            <p>{vehicle?.license_plate}</p>
          </div>
          <div>
            <VehicleStatusBadge status={vehicle.status} />
          </div>
        </div>

        <div>
          <Button variant="outline">Quick Actions</Button>
        </div>
      </div>

      <TabsNavigation
        basePath={`/app/vehicles/${id}`}
        tabs={[
          { label: 'Summary', path: '' },
          { label: 'Expenses', path: 'expenses' },
          { label: 'Maintenance', path: 'maintenance' },
        ]}
      />
    </div>
  );
}
