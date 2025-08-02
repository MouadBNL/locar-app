import type { CalendarEventData } from './types';
import type { ApiResponse } from '@/lib/http';
import { http } from '@/lib/http';

export async function calendarIndexFn() {
  const response = await http.get<ApiResponse<CalendarEventData[]>>('/calendar');
  return response.data;
}
