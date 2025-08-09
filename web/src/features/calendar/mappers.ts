import type { CalendarEventData, CalendarEventType } from './types';
import type { CalendarEvent, EventColor } from '@/components/calendar';
import { useTranslation } from 'react-i18next';

export function useMapCalendarEvent() {
  const { t } = useTranslation(['calendar', 'common']);

  function mapCalendarEvent(event: CalendarEventData): CalendarEvent {
    let title = event.title;
    if (event.type === 'rental_departure') {
      title = t('calendar:event.rental_departure_title', { title: event.title });
    }
    if (event.type === 'rental_return') {
      title = t('calendar:event.rental_return_title', { title: event.title });
    }
    if (event.type === 'reservation') {
      title = t('calendar:event.reservation_title', { title: event.title });
    }

    let url;
    if (event.entity_code) {
      if (event.type === 'rental_departure') {
        url = `/app/rentals/${event.entity_code}`;
      }
      if (event.type === 'rental_return') {
        url = `/app/rentals/${event.entity_code}`;
      }
      if (event.type === 'reservation') {
        url = `/app/reservations/${event.entity_code}`;
      }
    }

    return {
      id: event.id,
      title,
      start: new Date(event.start),
      end: new Date(event.end),
      color: mapCalendarEventTypeToColor(event.type),
      allDay: event.all_day ?? false,
      url,
    };
  }

  return {
    mapCalendarEvent,
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
