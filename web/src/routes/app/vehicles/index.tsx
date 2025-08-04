import { createFileRoute, Link } from '@tanstack/react-router';
import { EyeIcon, PlusIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VehicleTable } from '@/components/blocks/vehicle-table';
import { Button } from '@/components/ui/button';
import { Heading3 } from '@/components/ui/typography';
import { useVehicleIndex } from '@/features/vehicles';

export const Route = createFileRoute('/app/vehicles/')({
  component: RouteComponent,
  loader: async () => {
    await useVehicleIndex.prefetch();
  },
});

function RouteComponent() {
  const { t } = useTranslation(['vehicle', 'common']);
  const { data, isLoading } = useVehicleIndex();
  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <Heading3>{t('vehicle:manage_vehicles')}</Heading3>

        <Button asChild>
          <Link to="/app/vehicles/create">
            <PlusIcon className="w-4 h-4" />
            {t('vehicle:add_vehicle')}
          </Link>
        </Button>
      </div>

      <VehicleTable
        data={data?.data || []}
        loading={isLoading}
        actions={vehicle => (
          <>
            <Button variant="outline" size="sm" asChild>
              <Link
                from="/"
                to="/app/vehicles/$id"
                params={{ id: vehicle.id! }}
              >
                <EyeIcon className="w-4 h-4" />
              </Link>
            </Button>
          </>
        )}
      />
    </div>
  );
}
