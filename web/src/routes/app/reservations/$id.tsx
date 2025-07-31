import {
  createFileRoute,
  Link,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import ReservationForm from '@/components/blocks/reservation-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heading3 } from '@/components/ui/typography';
import {
  reservationShowFn,
  useReservationUpdate,
} from '@/features/reservations';
import { parse_availability_error } from '@/lib/utils';

export const Route = createFileRoute('/app/reservations/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const reservation = await reservationShowFn({ id: params.id });
    return { reservation: reservation.data, meta: {
      breadcrumb: {
        title: `${reservation.data.customer.full_name}`,
      },
    } };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const router = useRouter();
  const { t } = useTranslation(['reservation', 'common', 'exceptions']);
  const { reservation } = Route.useLoaderData();

  const { mutate: updateReservation, isPending } = useReservationUpdate({
    onSuccess: () => {
      toast.success(t('reservation:action.update.success'));
      router.invalidate();
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
      <div className="flex justify-between items-center mb-6">
        <Heading3>{t('reservation:edit_reservation')}</Heading3>

        <Button asChild variant="destructive">
          <Link to="/app/reservations">{t('common:cancel')}</Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          <ReservationForm
            submit={data => updateReservation({ id, data })}
            loading={isPending}
            initialValues={reservation ?? undefined}
          />
        </CardContent>
      </Card>
    </div>
  );
}
