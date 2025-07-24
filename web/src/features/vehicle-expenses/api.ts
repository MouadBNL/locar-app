import { http, type ApiResponse } from "@/lib/http";
import type { VehicleExpenseRequest, VehicleExpenseResource } from "./types";

export const vehicleExpenseIndexFn = async ({
  vehicleId,
}: {
  vehicleId: string;
}) => {
  const res = await http.get<ApiResponse<VehicleExpenseResource[]>>(
    `/vehicles/${vehicleId}/expenses`
  );
  return res.data;
};

export const vehicleExpenseShowFn = async ({
  vehicleId,
  expenseId,
}: {
  vehicleId: string;
  expenseId: string;
}) => {
  const res = await http.get<ApiResponse<VehicleExpenseResource>>(
    `/vehicles/${vehicleId}/expenses/${expenseId}`
  );
  return res.data;
};

export const vehicleExpenseCreateFn = async ({
  vehicleId,
  data,
}: {
  vehicleId: string;
  data: VehicleExpenseRequest;
}) => {
  const res = await http.post<ApiResponse<VehicleExpenseResource>>(
    `/vehicles/${vehicleId}/expenses`,
    data
  );
  return res.data;
};

export const vehicleExpenseUpdateFn = async ({
  vehicleId,
  expenseId,
  data,
}: {
  vehicleId: string;
  expenseId: string;
  data: VehicleExpenseRequest;
}) => {
  const res = await http.put<ApiResponse<VehicleExpenseResource>>(
    `/vehicles/${vehicleId}/expenses/${expenseId}`,
    data
  );
  return res.data;
};

export const vehicleExpenseDeleteFn = async ({
  vehicleId,
  expenseId,
}: {
  vehicleId: string;
  expenseId: string;
}) => {
  await http.delete(`/vehicles/${vehicleId}/expenses/${expenseId}`);
};
