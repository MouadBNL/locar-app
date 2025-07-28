import type { ReservationData, ReservationResource } from './types';
import type { ApiResponse } from '@/lib/http';
import { http } from '@/lib/http';

export async function reservationIndexFn() {
  const res = await http.get<ApiResponse<ReservationResource[]>>(
    `/reservations`,
  );
  return res.data;
}

export async function reservationShowFn({ id }: { id: string }) {
  const res = await http.get<ApiResponse<ReservationResource>>(
    `/reservations/${id}`,
  );
  return res.data;
}

export async function reservationCreateFn({
  data,
}: {
  data: ReservationData;
}) {
  const res = await http.post<ApiResponse<ReservationResource>>(
    `/reservations`,
    data,
  );
  return res.data;
}

export async function reservationUpdateFn({
  id,
  data,
}: {
  id: string;
  data: ReservationData;
}) {
  const res = await http.put<ApiResponse<ReservationResource>>(
    `/reservations/${id}`,
    data,
  );
  return res.data;
}

export async function reservationDeleteFn({ id }: { id: string }) {
  const res = await http.delete<ApiResponse<ReservationResource>>(
    `/reservations/${id}`,
  );
  return res.data;
}
