import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { VehicleTable } from '@/components/blocks/vehicle-table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading3 } from '@/components/ui/typography';
import { useVehicleDelete, useVehicleIndex } from '@/features/vehicles';

export const Route = createFileRoute('/app/vehicles/')({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { t } = useTranslation(['vehicle', 'common']);
  const { data, isFetching } = useVehicleIndex();

  const { mutate: deleteVehicle, isPending: isDeleting } = useVehicleDelete({
    onSuccess: () => {
      toast.success('Vehicle deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: () => {
      toast.error('Failed to delete vehicle');
    },
  });

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <Heading3>{t('vehicle:manage_vehicles')}</Heading3>

        <Button asChild>
          <Link to="/app/vehicles/create">
            <PlusIcon className="w-4 h-4" />
            {t('vehicle:add_vehicle')}
          </Link>
        </Button>
      </div>

      <Card className="p-2 mb-4">
        <VehicleTable
          data={data?.data || []}
          loading={isFetching}
          actions={vehicle => (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link
                  from="/"
                  to="/app/vehicles/$id"
                  params={{ id: vehicle.id! }}
                >
                  <PencilIcon className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                loading={isDeleting}
                onClick={() => deleteVehicle(vehicle.id!)}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </>
          )}
        />
      </Card>
    </div>
  );
}
