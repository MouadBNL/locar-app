import type { CalendarEvent } from '@/components/calendar';
import { useMemo } from 'react';
import {
  EventCalendar,
} from '@/components/calendar';

import { useCalendarContext } from '@/components/calendar/calendar-context';

export function BigCalendar({ events }: { events: CalendarEvent[] }) {
  const { isColorVisible } = useCalendarContext();

  // Filter events based on visible colors
  // const visibleEvents = useMemo(() => {
  //   return events.filter(event => isColorVisible(event.color));
  // }, [events, isColorVisible]);

  // const handleEventAdd = (event: CalendarEvent) => {
  //   setEvents([...events, event]);
  // };

  // const handleEventUpdate = (updatedEvent: CalendarEvent) => {
  //   setEvents(
  //     events.map(event =>
  //       event.id === updatedEvent.id ? updatedEvent : event,
  //     ),
  //   );
  // };

  // const handleEventDelete = (eventId: string) => {
  //   setEvents(events.filter(event => event.id !== eventId));
  // };

  return (
    <EventCalendar
      events={events}
    />
  );
}
