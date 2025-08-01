import { createFileRoute, Link } from '@tanstack/react-router';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { ReservationTable } from '@/components/blocks/reservation-table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading3 } from '@/components/ui/typography';
import { useReservationDelete, useReservationIndex } from '@/features/reservations';

export const Route = createFileRoute('/app/reservations/')({
  component: RouteComponent,
  loader: async () => {
    await useReservationIndex.prefetch();
  },
});

function RouteComponent() {
  const { t } = useTranslation(['reservation', 'common']);
  const { data, isFetching } = useReservationIndex();

  const { mutate: deleteReservation, isPending: isDeleting }
    = useReservationDelete({
      onSuccess: () => {
        toast.success(t('reservation:action.delete.success'));
        useReservationIndex.invalidate();
      },
      onError: () => {
        toast.error(t('reservation:action.delete.error'));
      },
    });

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <Heading3>{t('reservation:manage_reservations')}</Heading3>

        <Button asChild>
          <Link to="/app/reservations/create">
            <PlusIcon className="w-4 h-4" />
            {t('reservation:add_reservation')}
          </Link>
        </Button>
      </div>

      <Card className="p-2 mb-4">
        <ReservationTable
          data={data?.data || []}
          loading={isFetching}
          actions={reservation => (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link
                  from="/"
                  to="/app/reservations/$number"
                  params={{ number: reservation.reservation_number }}
                >
                  <PencilIcon className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                loading={isDeleting}
                onClick={() => deleteReservation({ number: reservation.reservation_number })}
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
