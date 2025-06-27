import { http } from "@/lib/http";
import type { VehicleData } from "@locar/api/entities";

export const VehicleRepository = {
  index: async () => {
    const res = await http.api.vehicles.$get();
    const data = await res.json();
    return data;
  },
  show: async (id: string) => {
    const res = await http.api.vehicles[":id"].$get({ param: { id } });
    const data = await res.json();
    return data;
  },
  create: async (data: VehicleData) => {
    const res = await http.api.vehicles.$post({ json: data });
    const createdData = await res.json();
    return createdData;
  },
  update: async (id: string, data: VehicleData) => {
    const res = await http.api.vehicles[":id"].$put({
      param: { id },
      json: data,
    });
    const updatedData = await res.json();
    return updatedData;
  },
  destroy: async (id: string) => {
    await http.api.vehicles[":id"].$delete({ param: { id } });
  },
};
