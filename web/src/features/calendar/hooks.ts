import { makeQueryHook } from '@/lib/query-generator';
import { calendarIndexFn } from './api';

export const useCalendarIndex = makeQueryHook(['calendar', 'index'], calendarIndexFn);
