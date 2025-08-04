import { createFileRoute } from '@tanstack/react-router';
import { Trash2Icon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CustomerRatingTable } from '@/components/blocks/customer-rating-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCustomerRating, useCustomerRatingDelete } from '@/features/customers';

export const Route = createFileRoute('/app/customers/$id/ratings')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { t } = useTranslation(['customer']);
  const { data, isLoading } = useCustomerRating({ id });
  const { mutate: deleteRating } = useCustomerRatingDelete({
    onSuccess: () => {
      useCustomerRating.invalidate({ id });
    },
  });
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{t('customer:rating.label_plural')}</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerRatingTable
            data={data?.data ?? []}
            loading={isLoading}
            actions={rating => (
              <Button variant="destructive" size="sm" onClick={() => deleteRating({ id, ratingId: rating.id })}>
                <Trash2Icon className="w-4 h-4" />
              </Button>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
