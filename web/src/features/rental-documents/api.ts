import { http, type ApiResponse } from "@/lib/http";
import type { RentalDocumentData, RentalDocumentResource } from "./types";

export const rentalDocumentIndexFn = async (rental_code: string) => {
  const res = await http.get<ApiResponse<RentalDocumentResource[]>>(
    `/rentals/${rental_code}/documents`
  );
  return res.data;
};

export const rentalDocumentShowFn = async ({
  rental_code,
  id,
}: {
  rental_code: string;
  id: string;
}) => {
  const res = await http.get<ApiResponse<RentalDocumentResource>>(
    `/rentals/${rental_code}/documents/${id}`
  );
  return res.data;
};

export const rentalDocumentCreateFn = async ({
  rental_code,
  data,
}: {
  rental_code: string;
  data: RentalDocumentData;
}) => {
  const res = await http.post<ApiResponse<RentalDocumentResource>>(
    `/rentals/${rental_code}/documents`,
    data
  );
  return res.data;
};

export const rentalDocumentUpdateFn = async ({
  rental_code,
  id,
  data,
}: {
  rental_code: string;
  id: string;
  data: RentalDocumentData;
}) => {
  const res = await http.put<ApiResponse<RentalDocumentResource>>(
    `/rentals/${rental_code}/documents/${id}`,
    data
  );
  return res.data;
};

export const rentalDocumentDeleteFn = async ({
  rental_code,
  id,
}: {
  rental_code: string;
  id: string;
}) => {
  const res = await http.delete<ApiResponse<null>>(
    `/rentals/${rental_code}/documents/${id}`
  );
  return res.data;
};
