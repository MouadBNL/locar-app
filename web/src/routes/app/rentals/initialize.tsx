import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import RentalInitializationForm from '@/components/blocks/rental-initialization-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heading3 } from '@/components/ui/typography';
import { useRentalCreate, useRentalIndex } from '@/features/rentals';
import { breadcrumb } from '@/lib/breadcrumb';
import { parse_availability_error } from '@/lib/utils';

export const Route = createFileRoute('/app/rentals/initialize')({
  component: RouteComponent,
  loader: () => {
    return {
      meta: {
        breadcrumb: breadcrumb('rental:create_rental'),
      },
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { t } = useTranslation(['rental', 'common', 'exceptions']);

  const { mutate: createRental, isPending } = useRentalCreate({
    onSuccess: () => {
      toast.success(t('rental:action.create.success'));
      useRentalIndex.invalidate();
      navigate({ to: '/app/rentals' });
    },
    onError: (error) => {
      const result = parse_availability_error(error);
      if (result) {
        toast.error(t(`exceptions:availability.${result.code}`, {
          start_date: result.start_date,
          end_date: result.end_date,
        }));
      }
      else {
        toast.error(t('rental:action.create.error'));
      }
    },
  });

  return (
    <div className="py-8 px-4 lg:px-12 w-full">
      <div className="flex justify-between items-center mb-6">
        <Heading3>{t('rental:create_rental')}</Heading3>

        <Button asChild variant="destructive">
          <Link to="/app/rentals">{t('common:cancel')}</Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          <RentalInitializationForm submit={createRental} loading={isPending} />
        </CardContent>
      </Card>
    </div>
  );
}
