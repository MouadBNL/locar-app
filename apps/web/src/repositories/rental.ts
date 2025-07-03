import { http } from "@/lib/http";
import type { RentalData, RentalInitializationData } from "@locar/api/entities";

export const RentalRepository = {
  index: async () => {
    const res = await http.api.rentals.$get();
    const data = await res.json();
    return data;
  },
  show: async (id: string) => {
    const res = await http.api.rentals[":id"].$get({ param: { id } });
    const data = await res.json();
    return data.data;
  },
  create: async (data: RentalData) => {
    const res = await http.api.rentals.$post({ json: data });
    const createdData = await res.json();
    return createdData;
  },
  update: async (id: string, data: RentalData) => {
    const res = await http.api.rentals[":id"].$put({
      param: { id },
      json: data,
    });
    const updatedData = await res.json();
    return updatedData;
  },
  destroy: async (id: string) => {
    await http.api.rentals[":id"].$delete({ param: { id } });
  },

  initialize: async (data: RentalInitializationData) => {
    const res = await http.api.rentals.initialize.$post({ json: data });
    const createdData = await res.json();
    return createdData.data;
  },
};
