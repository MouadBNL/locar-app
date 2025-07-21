import { http, type ApiResponse } from "@/lib/http";
import type {
  RentalData,
  RentalRateData,
  RentalReturnData,
  RentalStartData,
  RentalSummaryData,
  RentalTimeframeData,
  RentalVehichleData,
  RenterData,
} from "./type";
import type { DocumentResource } from "../documents";

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

/**
 * Details Update
 */

export const rentalVehicleUpdateFn = async ({
  id,
  data,
}: {
  id: string;
  data: RentalVehichleData;
}) => {
  const res = await http.put<ApiResponse<RentalData>>(
    `/rentals/${id}/vehicle`,
    data
  );
  return res.data;
};

export const rentalRenterUpdateFn = async ({
  id,
  data,
}: {
  id: string;
  data: RenterData;
}) => {
  const res = await http.put<ApiResponse<RentalData>>(
    `/rentals/${id}/renter`,
    data
  );
  return res.data;
};

export const rentalTimeframeUpdateFn = async ({
  id,
  data,
}: {
  id: string;
  data: RentalTimeframeData;
}) => {
  const res = await http.put<ApiResponse<RentalData>>(
    `/rentals/${id}/timeframe`,
    data
  );
  return res.data;
};

export const rentalRateUpdateFn = async ({
  id,
  data,
}: {
  id: string;
  data: RentalRateData;
}) => {
  const res = await http.put<ApiResponse<RentalData>>(
    `/rentals/${id}/rate`,
    data
  );
  return res.data;
};

export const rentalNotesUpdateFn = async ({
  id,
  data,
}: {
  id: string;
  data: { notes: string };
}) => {
  const res = await http.put<ApiResponse<RentalData>>(
    `/rentals/${id}/notes`,
    data
  );
  return res.data;
};

/**
 * Rental actions
 */

export const rentalStartFn = async ({
  id,
  data,
}: {
  id: string;
  data: RentalStartData;
}) => {
  const res = await http.post<ApiResponse<void>>(`/rentals/${id}/start`, data);
  return res.data;
};

export const rentalReturnFn = async ({
  id,
  data,
}: {
  id: string;
  data: RentalReturnData;
}) => {
  const res = await http.post<ApiResponse<void>>(`/rentals/${id}/return`, data);
  return res.data;
};

export const rentalAgreementGenerateFn = async ({ code }: { code: string }) => {
  const res = await http.post<ApiResponse<DocumentResource>>(
    `/rentals/${code}/agreement`
  );
  return res.data;
};
