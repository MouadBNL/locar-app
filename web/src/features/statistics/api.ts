import type { VehicleStatistics } from './type';
import type { ApiResponse } from '@/lib/http';
import { http } from '@/lib/http';

export async function getVehicleStatisticsFn({ id }: { id: string }) {
  const response = await http.get<ApiResponse<VehicleStatistics>>(`statistics/vehicles/${id}`);
  return response.data;
}
