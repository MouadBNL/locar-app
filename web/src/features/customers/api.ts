import type { CustomerData, CustomerResource } from './types';
import type { ApiResponse } from '@/lib/http';
import { http } from '@/lib/http';

export async function customerIndexFn() {
  const res = await http.get<ApiResponse<CustomerResource[]>>(`/customers`);
  return res.data;
}

export async function customerShowFn({ id }: { id: string }) {
  const res = await http.get<ApiResponse<CustomerResource>>(`/customers/${id}`);
  return res.data;
}

export async function customerUpdateFn({
  id,
  data,
}: {
  id: string;
  data: CustomerData;
}) {
  const res = await http.put<ApiResponse<CustomerResource>>(
    `/customers/${id}`,
    data,
  );
  return res.data;
}

export async function customerCreateFn({ data }: { data: CustomerData }) {
  const res = await http.post<ApiResponse<CustomerResource>>(
    `/customers`,
    data,
  );
  return res.data;
}

export async function customerDeleteFn({ id }: { id: string }) {
  const res = await http.delete<ApiResponse<CustomerData>>(`/customers/${id}`);
  return res.data;
}
