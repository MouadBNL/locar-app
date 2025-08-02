import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EventCalendar } from '@/components/calendar';
import { CalendarProvider } from '@/components/calendar/calendar-context';
import { Heading3 } from '@/components/ui/typography';
import { useCalendarIndex } from '@/features/calendar';
import { mapCalendarEvent } from '@/features/calendar/mappers';
import { get_date_range } from '@/lib/utils';

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useCalendarIndex({
    query_params: get_date_range(new Date(), 3),
  });

  const events = useMemo(() => {
    return data?.data.map(mapCalendarEvent) ?? [];
  }, [data]);

  const { t } = useTranslation(['common']);
  return (
    <div className="flex h-full">
      <div className="flex-1 pt-8 px-4 lg:px-12">
        <Heading3 className="mb-6">{t('common:dashboard')}</Heading3>
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </div>
      <div className="w-0 md:w-[200px] lg:w-[300px] xl:w-[500px] h-full border-l">
        <CalendarProvider defaultView="agenda" calendarOnly>
          <EventCalendar events={events} />
        </CalendarProvider>
      </div>
    </div>
  );
}
