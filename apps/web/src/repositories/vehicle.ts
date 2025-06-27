import { http } from "@/lib/http";
import type { VehicleData } from "@locar/api/entities";

export const VehicleRepository = {
  index: async () => {
    return await http.api.vehicle.$get();
  },
  show: async (id: string) => {
    return await http.api.vehicle[":id"].$get({ param: { id } });
  },
  create: async (data: VehicleData) => {
    return await http.api.vehicle.$post({ json: data });
  },
  update: async (id: string, data: VehicleData) => {
    return await http.api.vehicle[":id"].$put({ param: { id }, json: data });
  },
  destroy: async (id: string) => {
    return await http.api.vehicle[":id"].$delete({ param: { id } });
  },
};
