import type { VehicleExpenseRequest, VehicleExpenseResource } from './types';
import type { ApiResponse } from '@/lib/http';
import { http } from '@/lib/http';

export async function vehicleExpenseIndexFn({
  vehicleId,
  ids,
}: {
  vehicleId: string;
  ids?: string[];
}) {
  const res = await http.get<ApiResponse<VehicleExpenseResource[]>>(
    `/vehicles/${vehicleId}/expenses`,
    {
      params: {
        ids: ids?.join(',') ?? undefined,
      },
    },
  );
  return res.data;
}

export async function vehicleExpenseShowFn({
  vehicleId,
  expenseId,
}: {
  vehicleId: string;
  expenseId: string;
}) {
  const res = await http.get<ApiResponse<VehicleExpenseResource>>(
    `/vehicles/${vehicleId}/expenses/${expenseId}`,
  );
  return res.data;
}

export async function vehicleExpenseCreateFn({
  vehicleId,
  data,
}: {
  vehicleId: string;
  data: VehicleExpenseRequest;
}) {
  const res = await http.post<ApiResponse<VehicleExpenseResource>>(
    `/vehicles/${vehicleId}/expenses`,
    data,
  );
  return res.data;
}

export async function vehicleExpenseUpdateFn({
  vehicleId,
  expenseId,
  data,
}: {
  vehicleId: string;
  expenseId: string;
  data: VehicleExpenseRequest;
}) {
  const res = await http.put<ApiResponse<VehicleExpenseResource>>(
    `/vehicles/${vehicleId}/expenses/${expenseId}`,
    data,
  );
  return res.data;
}

export async function vehicleExpenseDeleteFn({
  vehicleId,
  expenseId,
}: {
  vehicleId: string;
  expenseId: string;
}) {
  await http.delete(`/vehicles/${vehicleId}/expenses/${expenseId}`);
}
