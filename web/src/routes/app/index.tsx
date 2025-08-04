import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StatisticCard } from '@/components/blocks/statistic-card';
import { StatisticCardGrid } from '@/components/blocks/statistic-card-grid';
import { EventCalendar } from '@/components/calendar';
import { CalendarProvider } from '@/components/calendar/calendar-context';
import { BusinessSummaryChart } from '@/components/charts/business-summary-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading3 } from '@/components/ui/typography';
import { useCalendarIndex } from '@/features/calendar';
import { mapCalendarEvent } from '@/features/calendar/mappers';
import { useGlobalStatistics } from '@/features/statistics';
import { fmt_currency, get_date_range } from '@/lib/utils';

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: globalStatistics } = useGlobalStatistics();
  const { data } = useCalendarIndex({
    query_params: get_date_range(new Date(), 3),
  });

  const events = useMemo(() => {
    return data?.data.map(mapCalendarEvent) ?? [];
  }, [data]);

  const { t } = useTranslation(['common', 'stats', 'calendar']);
  return (
    <div className="flex h-full">
      <div className="flex-1 pt-8 px-4 lg:px-12">
        <Heading3 className="mb-6">{t('common:dashboard')}</Heading3>
        <div className=" mb-6">
          <StatisticCardGrid>
            <StatisticCard
              label={t('stats:total_revenue')}
              stat={fmt_currency(globalStatistics?.data.revenue ?? 0)}
              trend={12.5}
            />
            <StatisticCard
              label={t('stats:total_expenses')}
              stat={fmt_currency(globalStatistics?.data.expenses ?? 0)}
              trend={-20}
            />
            <StatisticCard
              label={t('stats:rentals_count')}
              stat={globalStatistics?.data.rental_count.toString() ?? '0'}
              trend={12.5}
            />
            <StatisticCard
              label={t('stats:reservations_count')}
              stat={globalStatistics?.data.reservation_count.toString() ?? '0'}
              trend={4.5}
            />
          </StatisticCardGrid>
        </div>

        <div className="mb-6">
          <BusinessSummaryChart
            expenses={globalStatistics?.data.expenses_per_day ?? []}
            revenue={globalStatistics?.data.revenue_per_day ?? []}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Global Statistics</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>{t('calendar:agenda')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarProvider defaultView="agenda" calendarOnly>
                <EventCalendar events={events} />
              </CalendarProvider>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
