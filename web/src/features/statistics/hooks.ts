import { makeQueryHook } from '@/lib/query-generator';
import { getVehicleStatisticsFn } from './api';

export const useVehicleStatistics = makeQueryHook(['vehicles-stats'], getVehicleStatisticsFn);
