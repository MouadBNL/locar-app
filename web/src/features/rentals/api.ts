import type { DocumentResource } from '../documents';
import type {
  RentalData,
  RentalRateData,
  RentalReturnData,
  RentalStartData,
  RentalSummaryData,
  RentalTimeframeData,
  RentalVehichleData,
  RenterData,
} from './type';
import type { ApiResponse } from '@/lib/http';
import { http } from '@/lib/http';

export async function rentalIndexFn() {
  const res = await http.get<ApiResponse<RentalSummaryData[]>>('/rentals');
  return res.data;
}

export async function rentalCreateFn(data: RentalData) {
  const res = await http.post<ApiResponse<RentalData>>('/rentals', data);
  return res.data;
}

export async function rentalDeleteFn({ id }: { id: string }) {
  await http.delete(`/rentals/${id}`);
}

export async function rentalShowFn({ number }: { number: string }) {
  const res = await http.get<ApiResponse<RentalData>>(`/rentals/${number}`);
  return res.data;
}

/**
 * Details Update
 */

export async function rentalVehicleUpdateFn({
  id,
  data,
}: {
  id: string;
  data: RentalVehichleData;
}) {
  const res = await http.put<ApiResponse<RentalData>>(
    `/rentals/${id}/vehicle`,
    data,
  );
  return res.data;
}

export async function rentalRenterUpdateFn({
  id,
  data,
}: {
  id: string;
  data: RenterData;
}) {
  const res = await http.put<ApiResponse<RentalData>>(
    `/rentals/${id}/renter`,
    data,
  );
  return res.data;
}

export async function rentalTimeframeUpdateFn({
  id,
  data,
}: {
  id: string;
  data: RentalTimeframeData;
}) {
  const res = await http.put<ApiResponse<RentalData>>(
    `/rentals/${id}/timeframe`,
    data,
  );
  return res.data;
}

export async function rentalRateUpdateFn({
  id,
  data,
}: {
  id: string;
  data: RentalRateData;
}) {
  const res = await http.put<ApiResponse<RentalData>>(
    `/rentals/${id}/rate`,
    data,
  );
  return res.data;
}

export async function rentalNotesUpdateFn({
  id,
  data,
}: {
  id: string;
  data: { notes: string };
}) {
  const res = await http.put<ApiResponse<RentalData>>(
    `/rentals/${id}/notes`,
    data,
  );
  return res.data;
}

/**
 * Rental actions
 */

export async function rentalStartFn({
  id,
  data,
}: {
  id: string;
  data: RentalStartData;
}) {
  const res = await http.post<ApiResponse<void>>(`/rentals/${id}/start`, data);
  return res.data;
}

export async function rentalReturnFn({
  id,
  data,
}: {
  id: string;
  data: RentalReturnData;
}) {
  const res = await http.post<ApiResponse<void>>(`/rentals/${id}/return`, data);
  return res.data;
}

export async function rentalAgreementGenerateFn({ code }: { code: string }) {
  const res = await http.post<ApiResponse<DocumentResource>>(
    `/rentals/${code}/agreement`,
  );
  return res.data;
}
