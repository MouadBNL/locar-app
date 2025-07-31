import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import ReservationForm from '@/components/blocks/reservation-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heading3 } from '@/components/ui/typography';
import { useReservationCreate, useReservationIndex } from '@/features/reservations';
import { breadcrumb } from '@/lib/breadcrumb';
import { parse_availability_error } from '@/lib/utils';

export const Route = createFileRoute('/app/reservations/create')({
  component: RouteComponent,
  loader: () => {
    return {
      meta: {
        breadcrumb: breadcrumb('reservation:add_reservation'),
      },
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { t } = useTranslation(['reservation', 'common', 'exceptions']);
  const { mutate: createReservation, isPending } = useReservationCreate({
    onSuccess: () => {
      toast.success(t('reservation:action.create.success'));
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
        toast.error(t('reservation:action.create.error'));
      }
    },
  });

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <Heading3>{t('reservation:add_reservation')}</Heading3>

        <Button asChild variant="destructive">
          <Link to="/app/reservations">{t('common:cancel')}</Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          <ReservationForm
            submit={data => createReservation({ data })}
            loading={isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
