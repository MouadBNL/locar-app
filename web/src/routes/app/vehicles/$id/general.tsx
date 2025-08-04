import type { VehicleData } from '@/features/vehicles';
import {
  createFileRoute,
  useNavigate,
} from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import VehicleForm from '@/components/blocks/vehicle-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVehicleShow, useVehicleUpdate } from '@/features/vehicles';

export const Route = createFileRoute('/app/vehicles/$id/general')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const vehicle = await useVehicleShow.prefetch({ id: params.id });
    return { vehicle: vehicle.data };
  },
});

function RouteComponent() {
  const { t } = useTranslation(['common', 'vehicle']);
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const { vehicle } = Route.useLoaderData();

  const { mutate: updateVehicle, isPending } = useVehicleUpdate({
    onSuccess: () => {
      toast.success('Vehicle updated successfully');
      useVehicleShow.invalidate({ id });
      navigate({ to: '/app/vehicles' });
    },
    onError: () => {
      toast.error('Failed to update vehicle');
    },
  });

  return (
    <div>

      <Card>
        <CardHeader>
          <CardTitle>
            {t('vehicle:edit_vehicle')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <VehicleForm
            submit={(data: VehicleData) => updateVehicle({ id, data })}
            loading={isPending}
            initialValues={vehicle ?? undefined}
          />
        </CardContent>
      </Card>
    </div>
  );
}
