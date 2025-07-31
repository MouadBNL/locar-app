import type { VehicleMaintenanceResource } from '@/features/vehicle-maintenances';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { VehicleMaintenanceForm } from '@/components/blocks/vehicle-maintenance-form';
import { VehicleMaintenanceTable } from '@/components/blocks/vehicle-maintenance-table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  useVehicleMaintenanceCreate,
  useVehicleMaintenanceDelete,
  useVehicleMaintenanceIndex,
  useVehicleMaintenanceUpdate,

} from '@/features/vehicle-maintenances';
import { breadcrumb } from '@/lib/breadcrumb';

export const Route = createFileRoute('/app/vehicles/$id/maintenance')({
  component: RouteComponent,
  loader: () => {
    return {
      meta: {
        breadcrumb: breadcrumb('maintenance:label_plural'),
      },
    };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { t } = useTranslation(['maintenance', 'common']);
  const queryClient = useQueryClient();
  const [maintenance, setMaintenance]
    = useState<VehicleMaintenanceResource | null>(null);

  const { data: maintenances, isLoading } = useVehicleMaintenanceIndex({
    vehicleId: id,
  });

  const {
    mutate: deleteMaintenance,
    isPending: isDeleting,
    variables: deleteMaintenanceVariables,
  } = useVehicleMaintenanceDelete({
    onSuccess: () => {
      toast.success(t('maintenance:action.delete.success'));
      queryClient.invalidateQueries({
        queryKey: ['vehicle-maintenances'],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error(t('maintenance:action.delete.error'));
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('maintenance:label_singular')}</CardTitle>
        <CardAction>
          <AddMaintenanceDialog />
        </CardAction>
      </CardHeader>
      <CardContent>
        <VehicleMaintenanceTable
          data={maintenances?.data ?? []}
          loading={isLoading}
          actions={maintenance => (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setMaintenance(maintenance);
                }}
              >
                <PencilIcon />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                loading={
                  isDeleting
                  && deleteMaintenanceVariables?.maintenanceId === maintenance.id
                }
                onClick={() =>
                  deleteMaintenance({
                    vehicleId: id,
                    maintenanceId: maintenance.id,
                  })}
              >
                <TrashIcon />
              </Button>
            </div>
          )}
        />
      </CardContent>

      <EditMaintenanceDialog
        maintenance={maintenance}
        setMaintenance={setMaintenance}
      />
    </Card>
  );
}

function AddMaintenanceDialog() {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(['maintenance', 'common']);

  const { mutate: createMaintenance, isPending } = useVehicleMaintenanceCreate({
    onSuccess: () => {
      toast.success(t('maintenance:action.create.success'));
      queryClient.invalidateQueries({
        queryKey: ['vehicle-maintenances'],
      });
      setOpen(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error(t('maintenance:action.create.error'));
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{t('maintenance:add_maintenance')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('maintenance:add_maintenance')}</DialogTitle>
          <DialogDescription>
            {t('maintenance:add_maintenance_description')}
          </DialogDescription>
        </DialogHeader>
        <VehicleMaintenanceForm
          vehicleId={id}
          loading={isPending}
          submit={(data) => {
            createMaintenance({ vehicleId: id, data });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export function EditMaintenanceDialog({
  maintenance,
  setMaintenance,
}: {
  maintenance: VehicleMaintenanceResource | null;
  setMaintenance: (maintenance: VehicleMaintenanceResource | null) => void;
}) {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();
  const { t } = useTranslation(['maintenance', 'common']);

  const { mutate: updateMaintenance, isPending } = useVehicleMaintenanceUpdate({
    onSuccess: () => {
      toast.success(t('maintenance:action.update.success'));
      queryClient.invalidateQueries({
        queryKey: ['vehicle-maintenances'],
      });
      setMaintenance(null);
    },
    onError: (error) => {
      console.error(error);
      toast.error(t('maintenance:action.update.error'));
    },
  });

  if (!maintenance)
    return null;

  return (
    <Dialog open={!!maintenance} onOpenChange={() => setMaintenance(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('maintenance:edit_maintenance')}</DialogTitle>
          <DialogDescription>
            {t('maintenance:edit_maintenance_description')}
          </DialogDescription>
        </DialogHeader>
        <VehicleMaintenanceForm
          vehicleId={id}
          loading={isPending}
          initialValues={{
            ...maintenance,
            expenses: maintenance?.expenses?.map(expense => expense.id) ?? [],
          }}
          submit={(data) => {
            updateMaintenance({
              vehicleId: id,
              maintenanceId: maintenance!.id,
              data,
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
