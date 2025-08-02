import { createFileRoute, Link } from '@tanstack/react-router';
import { EyeIcon } from 'lucide-react';
import { ReservationTable } from '@/components/blocks/reservation-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useReservationIndex } from '@/features/reservations';
import { breadcrumb } from '@/lib/breadcrumb';

export const Route = createFileRoute('/app/customers/$id/reservations')({
  component: RouteComponent,
  loader: async ({ params }) => {
    await useReservationIndex.prefetch({ params: { customer_id: params.id } });

    return {
      meta: {
        breadcrumb: breadcrumb('reservation:label_plural'),
      },
    };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data, isLoading } = useReservationIndex({ params: { customer_id: id } });

  return (
    <div>
      <Card>
        <CardContent>
          <ReservationTable
            data={data?.data ?? []}
            loading={isLoading}
            actions={reservation => (
              <Button variant="outline" size="sm" asChild>
                <Link to="/app/reservations/$id" params={{ id: reservation.id! }}>
                  <EyeIcon className="w-4 h-4" />
                </Link>
              </Button>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
