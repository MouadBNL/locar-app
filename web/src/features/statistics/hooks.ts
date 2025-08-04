import { makeQueryHook } from '@/lib/query-generator';
import { getGlobalStatisticsFn, getVehicleStatisticsFn } from './api';

export const useVehicleStatistics = makeQueryHook(['vehicles-stats'], getVehicleStatisticsFn);
export const useGlobalStatistics = makeQueryHook(['global-stats'], getGlobalStatisticsFn);
