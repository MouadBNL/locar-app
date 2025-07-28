import type {
  VehicleMaintenanceRequest,
  VehicleMaintenanceResource,
} from './types';
import type { ApiResponse } from '@/lib/http';
import { http } from '@/lib/http';

export async function vehicleMaintenanceIndexFn({
  vehicleId,
}: {
  vehicleId: string;
}) {
  const res = await http.get<ApiResponse<VehicleMaintenanceResource[]>>(
    `/vehicles/${vehicleId}/maintenances`,
  );
  return res.data;
}

export async function vehicleMaintenanceShowFn({
  vehicleId,
  maintenanceId,
}: {
  vehicleId: string;
  maintenanceId: string;
}) {
  const res = await http.get<ApiResponse<VehicleMaintenanceResource>>(
    `/vehicles/${vehicleId}/maintenances/${maintenanceId}`,
  );
  return res.data;
}

export async function vehicleMaintenanceCreateFn({
  vehicleId,
  data,
}: {
  vehicleId: string;
  data: VehicleMaintenanceRequest;
}) {
  const res = await http.post<ApiResponse<VehicleMaintenanceResource>>(
    `/vehicles/${vehicleId}/maintenances`,
    data,
  );
  return res.data;
}

export async function vehicleMaintenanceUpdateFn({
  vehicleId,
  maintenanceId,
  data,
}: {
  vehicleId: string;
  maintenanceId: string;
  data: VehicleMaintenanceRequest;
}) {
  const res = await http.put<ApiResponse<VehicleMaintenanceResource>>(
    `/vehicles/${vehicleId}/maintenances/${maintenanceId}`,
    data,
  );
  return res.data;
}

export async function vehicleMaintenanceDeleteFn({
  vehicleId,
  maintenanceId,
}: {
  vehicleId: string;
  maintenanceId: string;
}) {
  const res = await http.delete<ApiResponse<VehicleMaintenanceResource>>(
    `/vehicles/${vehicleId}/maintenances/${maintenanceId}`,
  );
  return res.data;
}
