import type { CalendarEventData, CalendarEventType } from './types';
import type { CalendarEvent, EventColor } from '@/components/calendar';

export function mapCalendarEvent(event: CalendarEventData): CalendarEvent {
  let title = event.title;
  if (event.type === 'rental_departure') {
    title = `Rental departure: ${event.title}`;
  }
  if (event.type === 'rental_return') {
    title = `Rental return: ${event.title}`;
  }

  return {
    id: event.id,
    title,
    start: new Date(event.start),
    end: new Date(event.end),
    color: mapCalendarEventTypeToColor(event.type),
    allDay: event.all_day ?? false,
  };
}

export function mapCalendarEventTypeToColor(event: CalendarEventType): EventColor {
  if (event === 'reservation') {
    return 'blue';
  }
  if (event === 'rental_departure') {
    return 'emerald';
  }
  if (event === 'rental_return') {
    return 'orange';
  }
  return 'rose';
}
