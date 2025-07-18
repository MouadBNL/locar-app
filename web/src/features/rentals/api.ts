import { http, type ApiResponse } from "@/lib/http";
import type { RentalData, RentalShowResponse, RentalSummaryData } from "./type";

export const rentalIndexFn = async () => {
  const res = await http.get<ApiResponse<RentalSummaryData[]>>("/rentals");
  return res.data;
};

export const rentalCreateFn = async (data: RentalData) => {
  const res = await http.post<ApiResponse<RentalData>>("/rentals", data);
  return res.data;
};

export const rentalDeleteFn = async ({ id }: { id: string }) => {
  await http.delete(`/rentals/${id}`);
};

export const rentalShowFn = async ({ number }: { number: string }) => {
  const res = await http.get<ApiResponse<RentalData>>(`/rentals/${number}`);
  return res.data;
};
