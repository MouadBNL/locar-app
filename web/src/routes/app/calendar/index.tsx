import type { CalendarEvent } from '@/components/calendar';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { BigCalendar } from '@/components/big-calendar';
import { CalendarProvider } from '@/components/calendar/calendar-context';
import { useCalendarIndex } from '@/features/calendar';
import { mapCalendarEvent } from '@/features/calendar/mappers';

export const Route = createFileRoute('/app/calendar/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: events } = useCalendarIndex();

  const mappedEvents = useMemo(() => {
    return events?.data.map(mapCalendarEvent) ?? [];
  }, [events]);

  return (
    <div>
      <CalendarProvider>
        <BigCalendar events={mappedEvents} />
      </CalendarProvider>
      <pre className="text-xs">{JSON.stringify(mapCalendarEvent, null, 2)}</pre>
    </div>
  );
}
