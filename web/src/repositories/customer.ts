import { http } from "@/lib/http";
import type { CustomerData } from "@locar/api/entities";

export const CustomerRepository = {
  index: async () => {
    const res = await http.api.customers.$get();
    const data = await res.json();
    return data.data;
  },
  show: async (id: string) => {
    const res = await http.api.customers[":id"].$get({ param: { id } });
    const data = await res.json();
    return data.data;
  },
  create: async (data: CustomerData) => {
    const res = await http.api.customers.$post({ json: data });
    const createdData = await res.json();
    return createdData;
  },
  update: async (id: string, data: CustomerData) => {
    const res = await http.api.customers[":id"].$put({
      param: { id },
      json: data,
    });
    const updatedData = await res.json();
    return updatedData;
  },
  destroy: async (id: string) => {
    await http.api.customers[":id"].$delete({ param: { id } });
  },
};
