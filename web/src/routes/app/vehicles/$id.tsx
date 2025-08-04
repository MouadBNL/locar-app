import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { VehicleLicensePlateBadge } from '@/components/blocks/vehicle-license-plate-badge';
import { VehicleStatusBadge } from '@/components/blocks/vehicle-status-badge';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TabsNavigation } from '@/components/ui/tabs-navigation';
import { Heading3 } from '@/components/ui/typography';
import { useVehicleDelete, useVehicleIndex, useVehicleShow } from '@/features/vehicles';

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
  const { t } = useTranslation(['vehicle', 'rental', 'reservation', 'common', 'expenses', 'repair', 'traffic']);

  if (!vehicle) {
    return null;
  }

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-start flex-wrap gap-4 mb-8">
        <div className="flex items-start gap-8">
          <div>
            <Heading3>
              {vehicle?.make}
              {' '}
              {vehicle?.model}
              {' '}
              {vehicle?.year}
            </Heading3>
            <VehicleLicensePlateBadge>
              {vehicle?.license_plate}
            </VehicleLicensePlateBadge>
          </div>
          <div>
            <VehicleStatusBadge status={vehicle.status} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* <Button variant="outline">{t('common:quick_actions')}</Button> */}
          <DeleteVehicleAction id={id} plate={vehicle.license_plate} />
        </div>
      </div>

      <TabsNavigation
        basePath={`/app/vehicles/${id}`}

        tabs={[
          { label: t('common:summary'), path: '' },
          { label: t('expenses:maintenance'), path: 'expenses' },
          { label: t('repair:label_plural'), path: 'repairs' },
          { label: t('rental:label_plural'), path: 'rentals' },
          { label: t('reservation:label_plural'), path: 'reservations' },
          { label: t('vehicle:general'), path: 'general' },
          { label: t('traffic:label_plural'), path: 'traffic-infractions' },
        ]}
      />
    </div>
  );
}

function DeleteVehicleAction({
  id,
  plate,
}: {
  id: string;
  plate: string;
}) {
  const { t } = useTranslation(['common', 'vehicle']);
  const [open, setOpen] = useState(false);
  const [confirmCode, setConfirmCode] = useState('');
  const navigate = useNavigate();
  const { mutate: deleteVehicle, isPending: isDeletingVehicle } = useVehicleDelete({
    onSuccess: () => {
      toast.success(t('vehicle:action.delete.success'));
      setOpen(false);
      useVehicleIndex.invalidate();
      navigate({ to: '/app/vehicles' });
    },
    onError: () => {
      toast.error(t('vehicle:action.delete.error'));
    },
  });

  const handleDelete = () => {
    if (confirmCode === plate) {
      deleteVehicle(id);
    }
    else {
      toast.error(t('vehicle:action.delete.confirm'));
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2Icon className="w-4 h-4" />
          {t('common:delete')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('common:delete')}</AlertDialogTitle>
          <AlertDialogDescription>{t('vehicle:action.delete.description')}</AlertDialogDescription>

          <div className="mt-4">
            <div>
              <p className="text-sm text-muted-foreground">{t('vehicle:action.delete.confirm')}</p>
              <div className="flex items-center py-4">
                <code className="text-sm bg-muted p-2 rounded-md">{plate}</code>
              </div>
            </div>
            <Input type="text" value={confirmCode} onChange={e => setConfirmCode(e.target.value)} />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t('common:cancel')}
          </AlertDialogCancel>
          <Button variant="destructive" disabled={plate !== confirmCode} loading={isDeletingVehicle} onClick={handleDelete}>
            {t('common:delete')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
