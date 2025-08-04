import { createFileRoute } from '@tanstack/react-router';
import { TrashIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { TrafficInfractionTable } from '@/components/blocks/traffic-infraction-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTrafficInfractionDelete, useTrafficInfractionIndex } from '@/features/traffic-infractions';

export const Route = createFileRoute('/app/customers/$id/traffic-infractions')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation(['common', 'traffic']);
  const { id } = Route.useParams();

  const { data: trafficInfractions, isLoading: trafficInfractionsLoading } = useTrafficInfractionIndex({
    params: {
      customer_id: id,
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
        <CardHeader>
          <CardTitle>{t('traffic:label_plural')}</CardTitle>
          <CardDescription>{t('traffic:traffic_infractions_customer_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <TrafficInfractionTable
            data={trafficInfractions?.data ?? []}
            loading={trafficInfractionsLoading}
            actions={trafficInfraction => (
              <>
                <Button variant="destructive" size="sm" onClick={() => deleteTrafficInfraction({ id: trafficInfraction.id! })}>
                  <TrashIcon />
                </Button>
              </>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
