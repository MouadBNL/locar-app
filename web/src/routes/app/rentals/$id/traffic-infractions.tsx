import type { RentalData } from '@/features/rentals';
import type { TrafficInfractionResource } from '@/features/traffic-infractions';
import { createFileRoute } from '@tanstack/react-router';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { TrafficInfractionForm } from '@/components/blocks/traffic-infraction-form';
import { TrafficInfractionTable } from '@/components/blocks/traffic-infraction-table';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useRentalShow } from '@/features/rentals';
import { useTrafficInfractionCreate, useTrafficInfractionDelete, useTrafficInfractionIndex, useTrafficInfractionUpdate } from '@/features/traffic-infractions';

export const Route = createFileRoute('/app/rentals/$id/traffic-infractions')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation(['common', 'traffic']);
  const { id: code } = Route.useParams();
  const { data: rental } = useRentalShow({ number: code });
  const [selectedTrafficInfraction, setSelectedTrafficInfraction] = useState<TrafficInfractionResource | null>(null);

  const { data: trafficInfractions, isLoading: trafficInfractionsLoading } = useTrafficInfractionIndex({
    params: {
      rental_id: rental?.data?.id ?? undefined,
    },
  });

  const { mutate: deleteTrafficInfraction } = useTrafficInfractionDelete({

    onSuccess: () => {
      useTrafficInfractionIndex.invalidate();
      toast.success(t('traffic:action.delete.success'));
    },
    onError: () => {
      toast.error(t('traffic:action.delete.error'));
    },
  });

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-wrap">
          <CardTitle>{t('traffic:label_plural')}</CardTitle>
          <CardDescription>{t('traffic:traffic_infractions_rental_description')}</CardDescription>
          <CardAction>
            <AddTrafficInfractionDialog rental={rental?.data} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <TrafficInfractionTable
            data={trafficInfractions?.data}
            loading={trafficInfractionsLoading}
            actions={trafficInfraction => (
              <>
                <Button variant="outline" size="sm" onClick={() => setSelectedTrafficInfraction(trafficInfraction)}>
                  <PencilIcon />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => deleteTrafficInfraction({ id: trafficInfraction.id! })}>
                  <TrashIcon />
                </Button>
              </>
            )}
          />
        </CardContent>
      </Card>
      <EditTrafficInfractionDialog trafficInfraction={selectedTrafficInfraction} setTrafficInfraction={setSelectedTrafficInfraction} />
    </div>
  );
}

function AddTrafficInfractionDialog({ rental }: { rental?: RentalData }) {
  const { t } = useTranslation(['common', 'traffic']);
  const [open, setOpen] = useState(false);

  const { mutate: createTrafficInfraction } = useTrafficInfractionCreate({
    onSuccess: () => {
      useTrafficInfractionIndex.invalidate();
      toast.success(t('traffic:action.create.success'));
      setOpen(false);
    },
    onError: () => {
      toast.error(t('traffic:action.create.error'));
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon />
          {t('traffic:add_traffic_infraction')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('traffic:add_traffic_infraction')}</DialogTitle>
        </DialogHeader>
        <TrafficInfractionForm
          data={{
            rental_id: rental?.id,
            customer_id: rental?.renter?.customer_id,
            vehicle_id: rental?.vehicle?.vehicle_id ?? undefined,
          }}
          submit={(data) => {
            createTrafficInfraction({ data });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

function EditTrafficInfractionDialog({
  trafficInfraction,
  setTrafficInfraction,
}: {
  trafficInfraction: TrafficInfractionResource | null;
  setTrafficInfraction: (trafficInfraction: TrafficInfractionResource | null) => void;
}) {
  const { t } = useTranslation(['common', 'traffic']);

  const { mutate: updateTrafficInfraction } = useTrafficInfractionUpdate({
    onSuccess: () => {
      useTrafficInfractionIndex.invalidate();
      toast.success(t('traffic:action.update.success'));
      setTrafficInfraction(null);
    },
    onError: () => {
      toast.error(t('traffic:action.update.error'));
    },
  });

  return (
    <Dialog open={!!trafficInfraction} onOpenChange={() => setTrafficInfraction(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('traffic:edit_traffic_infraction')}</DialogTitle>
        </DialogHeader>
        {trafficInfraction && (
          <TrafficInfractionForm
            data={{
              ...trafficInfraction,
            }}
            submit={(data) => {
              updateTrafficInfraction({ id: trafficInfraction.id!, data });
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
