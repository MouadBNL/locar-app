import { http } from "@/lib/http";
import type { ApiResponse } from "@/lib/http";
import type { CustomerData } from "./types";

export const customerIndexFn = async () => {
  const res = await http.get<ApiResponse<CustomerData[]>>(`/customers`);
  return res.data;
};

export const customerShowFn = async ({ id }: { id: string }) => {
  const res = await http.get<ApiResponse<CustomerData>>(`/customers/${id}`);
  return res.data;
};

export const customerUpdateFn = async ({
  id,
  data,
}: {
  id: string;
  data: CustomerData;
}) => {
  const res = await http.put<ApiResponse<CustomerData>>(
    `/customers/${id}`,
    data
  );
  return res.data;
};

export const customerCreateFn = async ({ data }: { data: CustomerData }) => {
  const res = await http.post<ApiResponse<CustomerData>>(`/customers`, data);
  return res.data;
};

export const customerDeleteFn = async ({ id }: { id: string }) => {
  const res = await http.delete<ApiResponse<CustomerData>>(`/customers/${id}`);
  return res.data;
};
