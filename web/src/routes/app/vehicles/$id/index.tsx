import {
  createFileRoute,
  Link,
} from '@tanstack/react-router';
import { EyeIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CustomerSummaryCard } from '@/components/blocks/customer-summary-card';
import { PeriodSummaryCard } from '@/components/blocks/period-summary-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
  const { t } = useTranslation(['common', 'vehicle', 'rental', 'reservation', 'repair']);

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

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <VehicleSummaryCards />
            {/* <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} /> */}
          </div>
        </div>
      </div>

    </div>
  );
}

export function VehicleSummaryCards() {
  const { id } = Route.useParams();
  const { data } = useVehicleStatistics({ id: id! });
  const { t } = useTranslation(['stats']);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t('stats:total_revenue')}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {fmt_currency(data?.data.revenue ?? 0)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month
            {' '}
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter> */}
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t('stats:total_expenses')}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {fmt_currency(data?.data.expenses ?? 0)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingDownIcon />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period
            {' '}
            <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter> */}
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t('stats:rentals_count')}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.data.rental_count}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention
            {' '}
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter> */}
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t('stats:repairs_count')}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.data.repairs_count}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase
            {' '}
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter> */}
      </Card>
    </div>
  );
}
