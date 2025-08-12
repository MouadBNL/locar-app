import type { CustomerSummaryResource } from '../customers';
import type { VehicleSummaryResource } from '../vehicles';

export interface CalendarEventData {
  id: string;
  title: string;
  start: string;
  end: string;
  type: CalendarEventType;
  customer: CustomerSummaryResource;
  vehicle: VehicleSummaryResource;
  all_day: boolean;
  entity_code: string | null;
}

export type CalendarEventType = 'reservation' | 'rental_departure' | 'rental_return';
