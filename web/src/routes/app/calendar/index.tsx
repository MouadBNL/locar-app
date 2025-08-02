import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { EventCalendar } from '@/components/calendar';
import { CalendarProvider } from '@/components/calendar/calendar-context';
import { useCalendarIndex } from '@/features/calendar';
import { mapCalendarEvent } from '@/features/calendar/mappers';
import { get_date_range } from '@/lib/utils';

export const Route = createFileRoute('/app/calendar/')({
  component: RouteComponent,
});

function RouteComponent() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const { data: events } = useCalendarIndex({
    query_params: get_date_range(selectedDate, 45),
  }, {
    meta: {
      start_date: get_date_range(selectedDate, 45).start_date,
      end_date: get_date_range(selectedDate, 45).end_date,
    },
  });

  const onDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const mappedEvents = useMemo(() => {
    return events?.data.map(mapCalendarEvent) ?? [];
  }, [events]);

  return (
    <div>
      <CalendarProvider onDateChange={onDateChange}>
        <EventCalendar events={mappedEvents} />
      </CalendarProvider>
    </div>
  );
}
