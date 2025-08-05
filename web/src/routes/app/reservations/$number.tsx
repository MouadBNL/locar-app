import {
  createFileRoute,
  Link,
  useNavigate,
} from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import ReservationForm from '@/components/blocks/reservation-form';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heading3 } from '@/components/ui/typography';
import {
  useReservationDelete,
  useReservationIndex,
  useReservationShow,
  useReservationUpdate,
} from '@/features/reservations';
import { parse_availability_error } from '@/lib/utils';

export const Route = createFileRoute('/app/reservations/$number')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const reservation = await useReservationShow.prefetch({ number: params.number });
    return { reservation: reservation.data, meta: {
      breadcrumb: {
        title: `${reservation.data.reservation_number}`,
      },
    } };
  },
});

function RouteComponent() {
  const { number } = Route.useParams();
  const navigate = useNavigate();
  const { t } = useTranslation(['reservation', 'common', 'exceptions']);
  const { data } = useReservationShow({ number });
  const reservation = data?.data;

  const { mutate: updateReservation, isPending } = useReservationUpdate({
    onSuccess: () => {
      toast.success(t('reservation:action.update.success'));
      useReservationShow.invalidate({ number });
      useReservationIndex.invalidate();
      navigate({ to: '/app/reservations' });
    },
    onError: (error) => {
      const result = parse_availability_error(error);
      if (result) {
        toast.error(t(`exceptions:availability.${result.code}`, {
          start_date: result.start_date,
          end_date: result.end_date,
        }));
      }
      else {
        toast.error(t('reservation:action.update.error'));
      }
    },
  });

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <Heading3>{t('reservation:edit_reservation')}</Heading3>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link to="/app/reservations">{t('common:cancel')}</Link>
          </Button>
          <DeleteReservationAction number={number} />
        </div>
      </div>

      <Card>
        <CardContent>
          <ReservationForm
            submit={data => updateReservation({ number, data })}
            loading={isPending}
            initialValues={reservation ?? undefined}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function DeleteReservationAction({ number }: { number: string }) {
  const { t } = useTranslation(['reservation', 'common']);
  const navigate = useNavigate();
  const { mutate: deleteReservation, isPending } = useReservationDelete({
    onSuccess: () => {
      toast.success(t('reservation:action.delete.success'));
      navigate({ to: '/app/reservations' });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>

        <Button variant="destructive" loading={isPending}>
          {t('common:delete')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('common:delete')}</AlertDialogTitle>
          <AlertDialogDescription>{t('reservation:action.delete.description')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t('common:cancel')}
          </AlertDialogCancel>
          <Button variant="destructive" loading={isPending} onClick={() => deleteReservation({ number })}>
            {t('common:delete')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
