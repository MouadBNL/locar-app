import type {
  VehicleRepairRequest,
  VehicleRepairResource,
} from './types';
import type { ApiResponse } from '@/lib/http';
import { http } from '@/lib/http';

export async function vehicleRepairIndexFn({
  vehicleId,
}: {
  vehicleId: string;
}) {
  const res = await http.get<ApiResponse<VehicleRepairResource[]>>(
    `/vehicles/${vehicleId}/repairs`,
  );
  return res.data;
}

export async function vehicleRepairShowFn({
  vehicleId,
  repairId,
}: {
  vehicleId: string;
  repairId: string;
}) {
  const res = await http.get<ApiResponse<VehicleRepairResource>>(
    `/vehicles/${vehicleId}/repairs/${repairId}`,
  );
  return res.data;
}

export async function vehicleRepairCreateFn({
  vehicleId,
  data,
}: {
  vehicleId: string;
  data: VehicleRepairRequest;
}) {
  const res = await http.post<ApiResponse<VehicleRepairResource>>(
    `/vehicles/${vehicleId}/repairs`,
    data,
  );
  return res.data;
}

export async function vehicleRepairUpdateFn({
  vehicleId,
  repairId,
  data,
}: {
  vehicleId: string;
  repairId: string;
  data: VehicleRepairRequest;
}) {
  const res = await http.put<ApiResponse<VehicleRepairResource>>(
    `/vehicles/${vehicleId}/repairs/${repairId}`,
    data,
  );
  return res.data;
}

export async function vehicleRepairDeleteFn({
  vehicleId,
  repairId,
}: {
  vehicleId: string;
  repairId: string;
}) {
  const res = await http.delete<ApiResponse<VehicleRepairResource>>(
    `/vehicles/${vehicleId}/repairs/${repairId}`,
  );
  return res.data;
}
