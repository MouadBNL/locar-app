import { type ApiResponse, http } from "@/lib/http";
import type { VehicleData } from "./type";


export const vehicleIndexFn = async () => {
    return http.get<ApiResponse<VehicleData[]>>('vehicles').then(res => res.data);
}

export const vehicleCreateFn = async (request: VehicleData) => {
    return http.post<ApiResponse<VehicleData>>('vehicles', request).then(res => res.data);
}

export const vehicleShowFn = async (id: string) => {
    return http.get<ApiResponse<VehicleData>>(`vehicles/${id}`).then(res => res.data);
}

export const vehicleUpdateFn = async ({ id, data }: { id: string, data: VehicleData }) => {
    return http.put<ApiResponse<VehicleData>>(`vehicles/${id}`, data).then(res => res.data);
}

export const vehcileDeleteFn = async (id: string) => {
    return http.delete(`vehicles/${id}`)
}