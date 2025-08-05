import { createFileRoute, Link } from '@tanstack/react-router';
import { PencilIcon } from 'lucide-react';
import { RentalTable } from '@/components/blocks/rental-table';
import { Button } from '@/components/ui/button';
import { useRentalIndex } from '@/features/rentals';
import { breadcrumb } from '@/lib/breadcrumb';

export const Route = createFileRoute('/app/vehicles/$id/rentals')({
  component: RouteComponent,
  loader: async ({ params }) => {
    await useRentalIndex.prefetch({ params: { vehicle_id: params.id } });
    return {
      meta: {
        breadcrumb: breadcrumb('rental:label_plural'),
      },
    };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();

  const { data, isLoading } = useRentalIndex({
    params: {
      vehicle_id: id,
    },
  });

  return (
    <div>
      <RentalTable
        data={data?.data || []}
        loading={isLoading}
        actions={rental => (
          <Button variant="outline" size="sm" asChild>
            <Link to="/app/rentals/$id" params={{ id: rental.rental_number }}>
              <PencilIcon className="w-4 h-4" />
            </Link>
          </Button>
        )}
      />
    </div>
  );
}
