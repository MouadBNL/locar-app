import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Trash2Icon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { CustomerRatingBadge } from '@/components/blocks/customer-rating-badge';
import { CustomerStatusBadge } from '@/components/blocks/customer-status-badge';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { TabsNavigation } from '@/components/ui/tabs-navigation';
import { Heading3 } from '@/components/ui/typography';
import { useCustomerDelete, useCustomerIndex, useCustomerShow } from '@/features/customers';

export const Route = createFileRoute('/app/customers/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const customer = await useCustomerShow.prefetch({ id: params.id });

    return { customer: customer.data, meta: {
      breadcrumb: {
        title: `${customer.data.first_name} ${customer.data.last_name}`,
      },
    } };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { t } = useTranslation(['customer', 'rental', 'reservation', 'common', 'traffic']);
  const { data } = useCustomerShow({ id });
  const customer = data?.data;

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Heading3>
            {t('customer:label_singular')}
            :
            {' '}
            {customer?.first_name}
            {' '}
            {customer?.last_name}
          </Heading3>
          {customer?.rating && (
            <CustomerRatingBadge rating={2} />
          )}
          <CustomerStatusBadge status={customer?.status} />
        </div>

        <div className="flex items-center gap-2">
          <DeleteCustomerAction id={id} />
        </div>
      </div>

      <div>
        <TabsNavigation
          basePath={`/app/customers/${id}`}
          tabs={[
            { label: t('common:summary'), path: '' },
            { label: t('rental:label_plural'), path: 'rentals' },
            { label: t('reservation:label_plural'), path: 'reservations' },
            { label: t('traffic:label_plural'), path: 'traffic-infractions' },
            { label: t('customer:rating.label_plural'), path: 'ratings' },
          ]}
        />
      </div>
    </div>
  );
}

function DeleteCustomerAction({ id }: { id: string }) {
  const { t } = useTranslation(['customer', 'common']);
  const navigate = useNavigate();
  const { mutate: deleteCustomer, isPending } = useCustomerDelete({
    onSuccess: () => {
      toast.success(t('customer:action.delete.success'));
      useCustomerIndex.invalidate();
      navigate({ to: '/app/customers' });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" loading={isPending}>
          <Trash2Icon />
          {t('common:delete')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('common:delete')}</AlertDialogTitle>
          <AlertDialogDescription>{t('customer:action.delete.description')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t('common:cancel')}
          </AlertDialogCancel>
          <Button variant="destructive" loading={isPending} onClick={() => deleteCustomer({ id })}>
            {t('common:delete')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
