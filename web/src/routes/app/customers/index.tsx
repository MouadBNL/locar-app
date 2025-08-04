import { createFileRoute, Link } from '@tanstack/react-router';
import { EyeIcon, PlusIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CustomerTable } from '@/components/blocks/customer-table';
import { Button } from '@/components/ui/button';
import { Heading3 } from '@/components/ui/typography';
import { useCustomerIndex } from '@/features/customers';

export const Route = createFileRoute('/app/customers/')({
  component: RouteComponent,
  loader: async () => {
    await useCustomerIndex.prefetch();
  },
});

function RouteComponent() {
  const { t } = useTranslation(['customer', 'common']);
  const { data, isLoading } = useCustomerIndex();

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <Heading3>{t('customer:manage_customers')}</Heading3>

        <Button asChild>
          <Link to="/app/customers/create">
            <PlusIcon className="w-4 h-4" />
            {t('customer:add_customer')}
          </Link>
        </Button>
      </div>

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
                <EyeIcon className="w-4 h-4" />
              </Link>
            </Button>
          </>
        )}
      />
    </div>
  );
}
