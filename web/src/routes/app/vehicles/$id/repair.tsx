import type { VehicleRepairResource } from '@/features/vehicle-repairs';
import { createFileRoute } from '@tanstack/react-router';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { VehicleRepairForm } from '@/components/blocks/vehicle-repair-form';
import { VehicleRepairTable } from '@/components/blocks/vehicle-repair-table';
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
  useVehicleRepairCreate,
  useVehicleRepairDelete,
  useVehicleRepairIndex,
  useVehicleRepairUpdate,
} from '@/features/vehicle-repairs';
import { breadcrumb } from '@/lib/breadcrumb';

export const Route = createFileRoute('/app/vehicles/$id/repair')({
  component: RouteComponent,
  loader: async ({ params }) => {
    await useVehicleRepairIndex.prefetch({ vehicleId: params.id });
    return {
      meta: {
        breadcrumb: breadcrumb('repair:label_plural'),
      },
    };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { t } = useTranslation(['repair', 'common']);
  const [repair, setRepair]
    = useState<VehicleRepairResource | null>(null);

  const { data: repairs, isLoading } = useVehicleRepairIndex({
    vehicleId: id,
  });

  const {
    mutate: deleteRepair,
    isPending: isDeleting,
    variables: deleteRepairVariables,
  } = useVehicleRepairDelete({
    onSuccess: () => {
      toast.success(t('repair:action.delete.success'));
      useVehicleRepairIndex.invalidate({ vehicleId: id });
    },
    onError: (error) => {
      console.error(error);
      toast.error(t('repair:action.delete.error'));
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('repair:label_singular')}</CardTitle>
        <CardAction>
          <AddRepairDialog />
        </CardAction>
      </CardHeader>
      <CardContent>
        <VehicleRepairTable
          data={repairs?.data ?? []}
          loading={isLoading}
          actions={repair => (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setRepair(repair);
                }}
              >
                <PencilIcon />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                loading={
                  isDeleting
                  && deleteRepairVariables?.repairId === repair.id
                }
                onClick={() =>
                  deleteRepair({
                    vehicleId: id,
                    repairId: repair.id,
                  })}
              >
                <TrashIcon />
              </Button>
            </div>
          )}
        />
      </CardContent>

      <EditRepairDialog
        repair={repair}
        setRepair={setRepair}
      />
    </Card>
  );
}

function AddRepairDialog() {
  const { id } = Route.useParams();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(['repair', 'common']);

  const { mutate: createRepair, isPending } = useVehicleRepairCreate({
    onSuccess: () => {
      toast.success(t('repair:action.create.success'));
      useVehicleRepairIndex.invalidate({ vehicleId: id });
      setOpen(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error(t('repair:action.create.error'));
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{t('repair:add_repair')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('repair:add_repair')}</DialogTitle>
          <DialogDescription>
            {t('repair:add_repair_description')}
          </DialogDescription>
        </DialogHeader>
        <VehicleRepairForm
          vehicleId={id}
          loading={isPending}
          submit={(data) => {
            createRepair({ vehicleId: id, data });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export function EditRepairDialog({
  repair,
  setRepair,
}: {
  repair: VehicleRepairResource | null;
  setRepair: (repair: VehicleRepairResource | null) => void;
}) {
  const { id } = Route.useParams();
  const { t } = useTranslation(['repair', 'common']);

  const { mutate: updateRepair, isPending } = useVehicleRepairUpdate({
    onSuccess: () => {
      toast.success(t('repair:action.update.success'));
      useVehicleRepairIndex.invalidate({ vehicleId: id });
      setRepair(null);
    },
    onError: (error) => {
      console.error(error);
      toast.error(t('repair:action.update.error'));
    },
  });

  if (!repair)
    return null;

  return (
    <Dialog open={!!repair} onOpenChange={() => setRepair(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('repair:edit_repair')}</DialogTitle>
          <DialogDescription>
            {t('repair:edit_repair_description')}
          </DialogDescription>
        </DialogHeader>
        <VehicleRepairForm
          vehicleId={id}
          loading={isPending}
          initialValues={{
            ...repair,
            expenses: repair?.expenses?.map(expense => expense.id) ?? [],
          }}
          submit={(data) => {
            updateRepair({
              vehicleId: id,
              repairId: repair!.id,
              data,
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
