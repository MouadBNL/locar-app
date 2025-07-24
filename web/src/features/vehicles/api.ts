import { type ApiResponse, http } from "@/lib/http";
import type { VehicleData, VehicleResource } from "./type";

export const vehicleIndexFn = async () => {
  return http
    .get<ApiResponse<VehicleResource[]>>("vehicles")
    .then((res) => res.data);
};

export const vehicleCreateFn = async (request: VehicleData) => {
  return http
    .post<ApiResponse<VehicleResource>>("vehicles", request)
    .then((res) => res.data);
};

export const vehicleShowFn = async (id: string) => {
  return http
    .get<ApiResponse<VehicleResource>>(`vehicles/${id}`)
    .then((res) => res.data);
};

export const vehicleUpdateFn = async ({
  id,
  data,
}: {
  id: string;
  data: VehicleData;
}) => {
  return http
    .put<ApiResponse<VehicleResource>>(`vehicles/${id}`, data)
    .then((res) => res.data);
};

export const vehicleDeleteFn = async (id: string) => {
  return http.delete(`vehicles/${id}`);
};
