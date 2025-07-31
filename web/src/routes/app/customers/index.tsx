import { createFileRoute, Link } from '@tanstack/react-router';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { CustomerTable } from '@/components/blocks/customer-table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading3 } from '@/components/ui/typography';
import { customerIndexFn, useCustomerDelete, useCustomerIndex } from '@/features/customers';

export const Route = createFileRoute('/app/customers/')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ['customers'],
      queryFn: () => customerIndexFn(),
    });
  },
});

function RouteComponent() {
  const { t } = useTranslation(['customer', 'common']);
  const { data, isLoading } = useCustomerIndex();

  const { mutate: deleteCustomer, isPending: isDeleting } = useCustomerDelete({
    onSuccess: () => {
      toast.success('Customer deleted successfully');
      useCustomerIndex.invalidate();
    },
    onError: () => {
      toast.error('Failed to delete customer');
    },
  });

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <Heading3>{t('customer:manage_customers')}</Heading3>

        <Button asChild>
          <Link to="/app/customers/create">
            <PlusIcon className="w-4 h-4" />
            {t('customer:add_customer')}
          </Link>
        </Button>
      </div>

      <Card className="p-2 mb-4">
        <CustomerTable
          data={data?.data || []}
          loading={isLoading}
          actions={customer => (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link
                  from="/"
                  to="/app/customers/$id"
                  params={{ id: customer.id! }}
                >
                  <PencilIcon className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                loading={isDeleting}
                onClick={() => deleteCustomer({ id: customer.id! })}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </>
          )}
        />
      </Card>
    </div>
  );
}
