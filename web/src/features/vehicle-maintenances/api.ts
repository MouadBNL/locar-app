import { http, type ApiResponse } from "@/lib/http";
import type {
  VehicleMaintenanceRequest,
  VehicleMaintenanceResource,
} from "./types";

export const vehicleMaintenanceIndexFn = async ({
  vehicleId,
}: {
  vehicleId: string;
}) => {
  const res = await http.get<ApiResponse<VehicleMaintenanceResource[]>>(
    `/vehicles/${vehicleId}/maintenances`
  );
  return res.data;
};

export const vehicleMaintenanceShowFn = async ({
  vehicleId,
  maintenanceId,
}: {
  vehicleId: string;
  maintenanceId: string;
}) => {
  const res = await http.get<ApiResponse<VehicleMaintenanceResource>>(
    `/vehicles/${vehicleId}/maintenances/${maintenanceId}`
  );
  return res.data;
};

export const vehicleMaintenanceCreateFn = async ({
  vehicleId,
  data,
}: {
  vehicleId: string;
  data: VehicleMaintenanceRequest;
}) => {
  const res = await http.post<ApiResponse<VehicleMaintenanceResource>>(
    `/vehicles/${vehicleId}/maintenances`,
    data
  );
  return res.data;
};

export const vehicleMaintenanceUpdateFn = async ({
  vehicleId,
  maintenanceId,
  data,
}: {
  vehicleId: string;
  maintenanceId: string;
  data: VehicleMaintenanceRequest;
}) => {
  const res = await http.put<ApiResponse<VehicleMaintenanceResource>>(
    `/vehicles/${vehicleId}/maintenances/${maintenanceId}`,
    data
  );
  return res.data;
};

export const vehicleMaintenanceDeleteFn = async ({
  vehicleId,
  maintenanceId,
}: {
  vehicleId: string;
  maintenanceId: string;
}) => {
  const res = await http.delete<ApiResponse<VehicleMaintenanceResource>>(
    `/vehicles/${vehicleId}/maintenances/${maintenanceId}`
  );
  return res.data;
};
