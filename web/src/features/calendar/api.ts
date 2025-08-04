import type { CalendarEventData } from './types';
import type { ApiResponse } from '@/lib/http';
import { http } from '@/lib/http';

export interface CalendarIndexRequest {
  query_params?: {
    start_date?: string;
    end_date?: string;
  };
}
export async function calendarIndexFn({ query_params }: CalendarIndexRequest) {
  const response = await http.get<ApiResponse<CalendarEventData[]>>('/calendar', {
    params: query_params,
  });
  return response.data;
}
