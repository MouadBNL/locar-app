import { createFileRoute, Link } from '@tanstack/react-router';
import { EyeIcon, PlusIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { RentalTable } from '@/components/blocks/rental-table';
import { Button } from '@/components/ui/button';
import { Heading3 } from '@/components/ui/typography';
import { useRentalIndex } from '@/features/rentals';

export const Route = createFileRoute('/app/rentals/')({
  component: RouteComponent,
  loader: async () => {
    await useRentalIndex.prefetch();
  },
});

function RouteComponent() {
  const { t } = useTranslation(['rental', 'common']);

  const { data, isFetching } = useRentalIndex();

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <Heading3>{t('rental:manage_rentals')}</Heading3>

        <Button asChild>
          <Link to="/app/rentals/initialize">
            <PlusIcon className="w-4 h-4" />
            {t('rental:add_rental')}
          </Link>
        </Button>
      </div>

      <RentalTable
        data={data?.data ?? []}
        loading={isFetching}
        actions={rental => (
          <>
            <Button variant="outline" size="sm" asChild>
              <Link
                from="/"
                to="/app/rentals/$id"
                params={{ id: rental.rental_number }}
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
