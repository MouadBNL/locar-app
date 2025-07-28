import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import CustomerForm from '@/components/blocks/customer-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heading3 } from '@/components/ui/typography';
import { useCustomerCreate } from '@/features/customers';

export const Route = createFileRoute('/app/customers/create')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation(['customer', 'common']);
  const navigate = useNavigate();
  const { mutate: createCustomer, isPending } = useCustomerCreate({
    onSuccess: () => {
      toast.success('Customer created successfully');
      navigate({ to: '/app/customers' });
    },
    onError: () => {
      toast.error('Failed to create customer');
    },
  });

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <Heading3>{t('customer:add_customer')}</Heading3>

        <Button asChild variant="destructive">
          <Link to="/app/customers">{t('common:cancel')}</Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          <CustomerForm
            submit={data => createCustomer({ data })}
            loading={isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
