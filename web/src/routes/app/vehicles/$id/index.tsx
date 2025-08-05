import {
  createFileRoute,
  Link,
} from '@tanstack/react-router';
import { EyeIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CustomerSummaryCard } from '@/components/blocks/customer-summary-card';
import { PeriodSummaryCard } from '@/components/blocks/period-summary-card';
import { StatisticCard } from '@/components/blocks/statistic-card';
import { StatisticCardGrid } from '@/components/blocks/statistic-card-grid';
import { VehicleSummaryChart } from '@/components/charts/vehicle-summary-chart';
import { VehicleTypePieChart } from '@/components/charts/vehicle-type-pie-chart';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVehicleStatistics } from '@/features/statistics';
import { useVehicleShow } from '@/features/vehicles';
import { fmt_currency } from '@/lib/utils';

export const Route = createFileRoute('/app/vehicles/$id/')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const vehicle = await useVehicleShow.prefetch({ id: params.id });
    return { vehicle: vehicle.data };
  },
});

function RouteComponent() {
  const { t } = useTranslation(['common', 'vehicle', 'rental', 'reservation', 'repair', 'stats']);
  const { id } = Route.useParams();
  const { vehicle } = Route.useLoaderData();
  const { data } = useVehicleStatistics({ id: id! });

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
      {data && (
        <div className="">
          <StatisticCardGrid className="mb-6">
            <StatisticCard
              label={t('stats:total_revenue')}
              stat={fmt_currency(data.data.revenue ?? 0)}
              trend={data.data.revenue_monthly_progress ?? undefined}
            />
            <StatisticCard
              label={t('stats:total_expenses')}
              stat={fmt_currency(data.data.expenses ?? 0)}
              trend={data.data.expenses_monthly_progress ?? undefined}
            />
            <StatisticCard
              label={t('stats:rentals_count')}
              stat={data.data.rental_count}
              trend={data.data.rentals_monthly_progress ?? undefined}
            />
            <StatisticCard
              label={t('stats:repairs_count')}
              stat={data.data.repairs_count}
              trend={data.data.repairs_monthly_progress ?? undefined}
            />
          </StatisticCardGrid>

          <div className="mb-6">
            <VehicleSummaryChart data={data.data} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <VehicleTypePieChart data={data.data} />
            <VehicleSummaryChart data={data.data} />
          </div>
        </div>
      )}
    </div>
  );
}
