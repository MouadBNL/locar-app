import type { GlobalStatistics, VehicleStatistics } from './type';
import type { ApiResponse } from '@/lib/http';
import { http } from '@/lib/http';

export async function getGlobalStatisticsFn() {
  const response = await http.get<ApiResponse<GlobalStatistics>>(`statistics/global`);
  return response.data;
}

export async function getVehicleStatisticsFn({ id }: { id: string }) {
  const response = await http.get<ApiResponse<VehicleStatistics>>(`statistics/vehicles/${id}`);
  return response.data;
}
