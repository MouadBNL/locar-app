import { createFileRoute, Link } from '@tanstack/react-router';
import { EyeIcon } from 'lucide-react';
import { RentalTable } from '@/components/blocks/rental-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRentalIndex } from '@/features/rentals';

export const Route = createFileRoute('/app/customers/$id/rentals')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data, isLoading } = useRentalIndex({ params: { customer_id: id } });

  return (
    <div>
      <Card>
        <CardContent>
          <RentalTable
            data={data?.data ?? []}
            loading={isLoading}
            actions={rental => (
              <Button variant="outline" size="sm" asChild>
                <Link to="/app/rentals/$id" params={{ id: rental.id! }}>
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
