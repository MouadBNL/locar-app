import { http } from "@/lib/http";
import type { ApiResponse } from "@/lib/http";
import type { ReservationData, ReservationResource } from "./types";

export const reservationIndexFn = async () => {
  const res = await http.get<ApiResponse<ReservationResource[]>>(
    `/reservations`
  );
  return res.data;
};

export const reservationShowFn = async ({ id }: { id: string }) => {
  const res = await http.get<ApiResponse<ReservationResource>>(
    `/reservations/${id}`
  );
  return res.data;
};

export const reservationCreateFn = async ({
  data,
}: {
  data: ReservationData;
}) => {
  const res = await http.post<ApiResponse<ReservationResource>>(
    `/reservations`,
    data
  );
  return res.data;
};

export const reservationUpdateFn = async ({
  id,
  data,
}: {
  id: string;
  data: ReservationData;
}) => {
  const res = await http.put<ApiResponse<ReservationResource>>(
    `/reservations/${id}`,
    data
  );
  return res.data;
};

export const reservationDeleteFn = async ({ id }: { id: string }) => {
  const res = await http.delete<ApiResponse<ReservationResource>>(
    `/reservations/${id}`
  );
  return res.data;
};
