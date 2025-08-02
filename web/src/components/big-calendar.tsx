import type { CalendarEvent, EventColor } from '@/components/calendar';
import { useMemo } from 'react';
import {

  EventCalendar,

} from '@/components/calendar';

import { useCalendarContext } from '@/components/calendar/calendar-context';

// Etiquettes data for calendar filtering
export const etiquettes = [
  {
    id: 'my-events',
    name: 'My Events',
    color: 'emerald' as EventColor,
    isActive: true,
  },
  {
    id: 'marketing-team',
    name: 'Marketing Team',
    color: 'orange' as EventColor,
    isActive: true,
  },
  {
    id: 'interviews',
    name: 'Interviews',
    color: 'violet' as EventColor,
    isActive: true,
  },
  {
    id: 'events-planning',
    name: 'Events Planning',
    color: 'blue' as EventColor,
    isActive: true,
  },
  {
    id: 'holidays',
    name: 'Holidays',
    color: 'rose' as EventColor,
    isActive: true,
  },
];

export function BigCalendar({ events }: { events: CalendarEvent[] }) {
  const { isColorVisible, view } = useCalendarContext();

  // Filter events based on visible colors
  const visibleEvents = useMemo(() => {
    return events.filter(event => isColorVisible(event.color));
  }, [events, isColorVisible]);

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
      events={visibleEvents}
    />
  );
}
