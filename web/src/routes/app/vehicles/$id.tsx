import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { VehicleStatusBadge } from '@/components/blocks/vehicle-status-badge';
import { Button } from '@/components/ui/button';
import { TabsNavigation } from '@/components/ui/tabs-navigation';
import { Heading3 } from '@/components/ui/typography';
import { useVehicleShow } from '@/features/vehicles';

export const Route = createFileRoute('/app/vehicles/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const data = await useVehicleShow.prefetch({ id: params.id });
    const vehicle = data.data;
    return {
      vehicle: data.data,
      meta: {
        breadcrumb: {
          title: `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
        },
      },
    };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data } = useVehicleShow({ id });
  const vehicle = data?.data;
  const { t } = useTranslation(['vehicle', 'rental', 'reservation', 'common', 'expenses', 'repair']);

  if (!vehicle) {
    return null;
  }

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
          <Button variant="outline">{t('common:quick_actions')}</Button>
        </div>
      </div>

      <TabsNavigation
        basePath={`/app/vehicles/${id}`}

        tabs={[
          { label: t('common:summary'), path: '' },
          { label: t('expenses:maintenance'), path: 'expenses' },
          { label: t('repair:label_plural'), path: 'repair' },
          { label: t('rental:label_plural'), path: 'rentals' },
          { label: t('reservation:label_plural'), path: 'reservations' },
          { label: t('vehicle:general'), path: 'general' },
        ]}
      />
    </div>
  );
}
