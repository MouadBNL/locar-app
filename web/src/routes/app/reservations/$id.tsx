import {
  createFileRoute,
  Link,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
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
    return { reservation: reservation.data };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const router = useRouter();

  const { reservation } = Route.useLoaderData();

  const { mutate: updateReservation, isPending } = useReservationUpdate({
    onSuccess: () => {
      toast.success('Reservation updated successfully');
      router.invalidate();
      navigate({ to: '/app/reservations' });
    },
    onError: (error) => {
      const msg = parse_availability_error(error);
      if (msg) {
        toast.error(msg);
      }
      else {
        toast.error('Failed to update reservation');
      }
    },
  });

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <Heading3>Edit Reservation</Heading3>

        <Button asChild variant="destructive">
          <Link to="/app/reservations">Cancel</Link>
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
