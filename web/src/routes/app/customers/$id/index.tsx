import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { EyeIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import CustomerForm from '@/components/blocks/customer-form';
import { PeriodSummaryCard } from '@/components/blocks/period-summary-card';
import { VehicleSummaryCard } from '@/components/blocks/vehicle-summary-card';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCustomerShow, useCustomerUpdate } from '@/features/customers';

export const Route = createFileRoute('/app/customers/$id/')({
  component: RouteComponent,
  loader: async ({ params }) => {
    await useCustomerShow.prefetch({ id: params.id });
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { t } = useTranslation(['customer', 'common', 'rental', 'reservation']);
  const { data } = useCustomerShow({ id });
  const customer = data?.data;

  const { mutate: updateCustomer, isPending } = useCustomerUpdate({
    onSuccess: () => {
      toast.success('Customer updated successfully');
      useCustomerShow.invalidate();
      navigate({ to: '/app/customers' });
    },
    onError: () => {
      toast.error('Failed to update customer');
    },
  });

  return (
    <div>
      {customer?.active_rental && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {t('rental:active_rental')}
              <Link to="/app/rentals/$id" params={{ id: customer.active_rental.rental_number }}>
                <p className="text-sm text-muted-foreground inline-block ml-2 hover:underline">
                  #
                  {customer.active_rental.rental_number}
                </p>
              </Link>
            </CardTitle>
            <CardAction>
              <Button variant="outline" size="sm" asChild>
                <Link to="/app/rentals/$id" params={{ id: customer.active_rental.rental_number }}>
                  <EyeIcon />
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center">
              <div className="w-full lg:w-1/3">
                <VehicleSummaryCard
                  id={customer.active_rental.vehicle.id}
                  make={customer.active_rental.vehicle.make}
                  model={customer.active_rental.vehicle.model}
                  year={customer.active_rental.vehicle.year}
                  plate={customer.active_rental.vehicle.license_plate}
                  attributes={false}
                />
              </div>
              <div className="w-full lg:w-2/3">
                <PeriodSummaryCard
                  pickupDate={customer.active_rental.departure_date}
                  dropoffDate={customer.active_rental.return_date}
                  rentalDays={customer.active_rental.duration ?? 1}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {customer?.active_reservation && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {t('reservation:active_reservation')}
              <Link to="/app/reservations/$id" params={{ id: customer.active_reservation.id }}>
                <p className="text-sm text-muted-foreground inline-block ml-2 hover:underline">
                  #
                  {customer.active_reservation.id}
                </p>
              </Link>
            </CardTitle>
            <CardAction>
              <Button variant="outline" size="sm" asChild>
                <Link to="/app/reservations/$id" params={{ id: customer.active_reservation.id }}>
                  <EyeIcon />
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center">
              <div className="w-full lg:w-1/3">
                <VehicleSummaryCard
                  id={customer.active_reservation.vehicle.id}
                  make={customer.active_reservation.vehicle.make}
                  model={customer.active_reservation.vehicle.model}
                  year={customer.active_reservation.vehicle.year}
                  plate={customer.active_reservation.vehicle.license_plate}
                  attributes={false}
                />
              </div>
              <div className="w-full lg:w-2/3">
                <PeriodSummaryCard
                  pickupDate={customer.active_reservation.check_in_date}
                  dropoffDate={customer.active_reservation.check_out_date}
                  rentalDays={customer.active_reservation.total_days ?? 1}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
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
