import type { VehicleData, VehicleResource } from './type';
import type { ApiResponse } from '@/lib/http';
import { http } from '@/lib/http';

export async function vehicleIndexFn() {
  return http
    .get<ApiResponse<VehicleResource[]>>('vehicles')
    .then(res => res.data);
}

export async function vehicleCreateFn(request: VehicleData) {
  return http
    .post<ApiResponse<VehicleResource>>('vehicles', request)
    .then(res => res.data);
}

export async function vehicleShowFn({ id }: { id: string }) {
  return http
    .get<ApiResponse<VehicleResource>>(`vehicles/${id}`)
    .then(res => res.data);
}

export async function vehicleUpdateFn({
  id,
  data,
}: {
  id: string;
  data: VehicleData;
}) {
  return http
    .put<ApiResponse<VehicleResource>>(`vehicles/${id}`, data)
    .then(res => res.data);
}

export async function vehicleDeleteFn(id: string) {
  return http.delete(`vehicles/${id}`);
}
