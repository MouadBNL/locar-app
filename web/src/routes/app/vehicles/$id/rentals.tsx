import { createFileRoute, Link, useRouterState } from '@tanstack/react-router';
import { PencilIcon } from 'lucide-react';
import { RentalTable } from '@/components/blocks/rental-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRentalIndex } from '@/features/rentals';

export const Route = createFileRoute('/app/vehicles/$id/rentals')({
  component: RouteComponent,
  beforeLoad(ctx) {
    return {
      meta: {
        title: 'Vehicle Rentals',
        breadcrumb: true,
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
      <Card>
        <CardContent>
          <RentalTable
            data={data?.data || []}
            loading={isLoading}
            actions={rental => (
              <Button variant="outline" size="sm" asChild>
                <Link to="/app/rentals/$id" params={{ id: rental.id! }}>
                  <PencilIcon className="w-4 h-4" />
                </Link>
              </Button>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
