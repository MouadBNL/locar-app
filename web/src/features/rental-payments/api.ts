import { http, type ApiResponse } from "@/lib/http";
import type {
  RentalPaymentData,
  RentalPaymentIndexResponse,
  RentalPaymentResource,
} from "./types";

export const rentalPaymentIndexFn = async (ctx: { rental_code: string }) => {
  const res = await http.get<ApiResponse<RentalPaymentIndexResponse>>(
    `/rentals/${ctx.rental_code}/payments`
  );
  return res.data;
};

export const rentalPaymentShowFn = async (ctx: {
  rental_code: string;
  id: string;
}) => {
  const res = await http.get<ApiResponse<RentalPaymentResource>>(
    `/rentals/${ctx.rental_code}/payments/${ctx.id}`
  );
  return res.data;
};

export const rentalPaymentCreateFn = async (ctx: {
  rental_code: string;
  data: RentalPaymentData;
}) => {
  const res = await http.post<ApiResponse<RentalPaymentResource>>(
    `/rentals/${ctx.rental_code}/payments`,
    ctx.data
  );
  return res.data;
};

export const rentalPaymentUpdateFn = async (ctx: {
  rental_code: string;
  id: string;
  data: RentalPaymentData;
}) => {
  const res = await http.put<ApiResponse<RentalPaymentResource>>(
    `/rentals/${ctx.rental_code}/payments/${ctx.id}`,
    ctx.data
  );
  return res.data;
};

export const rentalPaymentDeleteFn = async (ctx: {
  rental_code: string;
  id: string;
}) => {
  const res = await http.delete<ApiResponse<void>>(
    `/rentals/${ctx.rental_code}/payments/${ctx.id}`
  );
  return res.data;
};
