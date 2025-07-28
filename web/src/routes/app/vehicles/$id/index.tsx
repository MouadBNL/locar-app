import type { VehicleData } from '@/features/vehicles';
import {
  createFileRoute,
  Link,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import VehicleForm from '@/components/blocks/vehicle-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heading3 } from '@/components/ui/typography';
import {
  useVehicleUpdate,

  vehicleShowFn,
} from '@/features/vehicles';

export const Route = createFileRoute('/app/vehicles/$id/')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const vehicle = (await vehicleShowFn(params.id)).data;
    return { vehicle };
  },
});

function RouteComponent() {
  const { t } = useTranslation(['common', 'vehicle']);
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const router = useRouter();

  const { vehicle } = Route.useLoaderData();

  const { mutate: updateVehicle, isPending } = useVehicleUpdate({
    onSuccess: () => {
      toast.success('Vehicle updated successfully');
      router.invalidate();
      navigate({ to: '/app/vehicles' });
    },
    onError: () => {
      toast.error('Failed to update vehicle');
    },
  });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Heading3>{t('vehicle:edit_vehicle')}</Heading3>

        <Button asChild variant="destructive">
          <Link to="/app/vehicles">{t('common:cancel')}</Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          <VehicleForm
            submit={(data: VehicleData) => updateVehicle({ id, data })}
            loading={isPending}
            initialValues={vehicle ?? undefined}
          />
        </CardContent>
      </Card>
    </>
  );
}
