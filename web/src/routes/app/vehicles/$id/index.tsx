import {
  createFileRoute,
  Link,
} from '@tanstack/react-router';
import { EyeIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CustomerSummaryCard } from '@/components/blocks/customer-summary-card';
import { PeriodSummaryCard } from '@/components/blocks/period-summary-card';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVehicleShow } from '@/features/vehicles';

export const Route = createFileRoute('/app/vehicles/$id/')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const vehicle = await useVehicleShow.prefetch({ id: params.id });
    return { vehicle: vehicle.data };
  },
});

function RouteComponent() {
  const { t } = useTranslation(['common', 'vehicle', 'rental', 'reservation', 'maintenance']);

  const { vehicle } = Route.useLoaderData();

  return (
    <div>
      {vehicle?.active_rental && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {t('rental:active_rental')}
              <Link to="/app/rentals/$id" params={{ id: vehicle.active_rental.rental_number }}>
                <p className="text-sm text-muted-foreground inline-block ml-2 hover:underline">
                  #
                  {vehicle.active_rental.rental_number}
                </p>
              </Link>
            </CardTitle>
            <CardAction>
              <Button variant="outline" size="sm" asChild>
                <Link to="/app/rentals/$id" params={{ id: vehicle.active_rental.rental_number }}>
                  <EyeIcon />
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center">
              <div className="w-full lg:w-1/3">
                <CustomerSummaryCard
                  id={vehicle.active_rental.customer.id}
                  firstName={vehicle.active_rental.customer.full_name.split(' ')[0]}
                  lastName={vehicle.active_rental.customer.full_name.split(' ')[1]}
                  id_number={vehicle.active_rental.customer.identifier}
                  phone={vehicle.active_rental.customer.phone}
                  address=""
                  license=""
                />
              </div>
              <div className="w-full lg:w-2/3">
                <PeriodSummaryCard
                  pickupDate={vehicle.active_rental.departure_date}
                  dropoffDate={vehicle.active_rental.return_date}
                  rentalDays={vehicle.active_rental.duration ?? 1}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {vehicle?.active_reservation && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {t('reservation:active_reservation')}
              <Link to="/app/reservations/$number" params={{ number: vehicle.active_reservation.reservation_number }}>
                <p className="text-sm text-muted-foreground inline-block ml-2 hover:underline">
                  #
                  {vehicle.active_reservation.reservation_number}
                </p>
              </Link>
            </CardTitle>
            <CardAction>
              <Button variant="outline" size="sm" asChild>
                <Link to="/app/reservations/$number" params={{ number: vehicle.active_reservation.reservation_number }}>
                  <EyeIcon />
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center">
              <div className="w-full lg:w-1/3">
                <CustomerSummaryCard
                  id={vehicle.active_reservation.customer.id}
                  firstName={vehicle.active_reservation.customer.full_name.split(' ')[0]}
                  lastName={vehicle.active_reservation.customer.full_name.split(' ')[1]}
                  id_number={vehicle.active_reservation.customer.identifier}
                  phone={vehicle.active_reservation.customer.phone}
                  address=""
                  license=""
                />
              </div>
              <div className="w-full lg:w-2/3">
                <PeriodSummaryCard
                  pickupDate={vehicle.active_reservation.check_in_date}
                  dropoffDate={vehicle.active_reservation.check_out_date}
                  rentalDays={vehicle.active_reservation.total_days ?? 1}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
