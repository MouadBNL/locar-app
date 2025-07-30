import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import CustomerForm from '@/components/blocks/customer-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { customerShowFn, useCustomerUpdate } from '@/features/customers';

export const Route = createFileRoute('/app/customers/$id/')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const customer = await customerShowFn({ id: params.id });
    return { customer: customer.data };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const router = useRouter();
  const { t } = useTranslation(['customer', 'common']);
  const { customer } = Route.useLoaderData();

  const { mutate: updateCustomer, isPending } = useCustomerUpdate({
    onSuccess: () => {
      toast.success('Customer updated successfully');
      router.invalidate();
      navigate({ to: '/app/customers' });
    },
    onError: () => {
      toast.error('Failed to update customer');
    },
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            {t('customer:label_singular')}
            :
            {' '}
            {customer?.first_name}
            {' '}
            {customer?.last_name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerForm
            submit={data => updateCustomer({ id, data })}
            loading={isPending}
            initialValues={customer ?? undefined}
          />
        </CardContent>
      </Card>
    </div>
  );
}
