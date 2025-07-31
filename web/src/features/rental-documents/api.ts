import type { RentalDocumentData, RentalDocumentResource } from './types';
import type { ApiResponse } from '@/lib/http';
import { http } from '@/lib/http';

export async function rentalDocumentIndexFn({ rental_code }: { rental_code: string }) {
  const res = await http.get<ApiResponse<RentalDocumentResource[]>>(
    `/rentals/${rental_code}/documents`,
  );
  return res.data;
}

export async function rentalDocumentShowFn({
  rental_code,
  id,
}: {
  rental_code: string;
  id: string;
}) {
  const res = await http.get<ApiResponse<RentalDocumentResource>>(
    `/rentals/${rental_code}/documents/${id}`,
  );
  return res.data;
}

export async function rentalDocumentCreateFn({
  rental_code,
  data,
}: {
  rental_code: string;
  data: RentalDocumentData;
}) {
  const res = await http.post<ApiResponse<RentalDocumentResource>>(
    `/rentals/${rental_code}/documents`,
    data,
  );
  return res.data;
}

export async function rentalDocumentUpdateFn({
  rental_code,
  id,
  data,
}: {
  rental_code: string;
  id: string;
  data: RentalDocumentData;
}) {
  const res = await http.put<ApiResponse<RentalDocumentResource>>(
    `/rentals/${rental_code}/documents/${id}`,
    data,
  );
  return res.data;
}

export async function rentalDocumentDeleteFn({
  rental_code,
  id,
}: {
  rental_code: string;
  id: string;
}) {
  const res = await http.delete<ApiResponse<null>>(
    `/rentals/${rental_code}/documents/${id}`,
  );
  return res.data;
}
