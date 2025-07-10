import { http } from "@/lib/http";
import type { ReservationData } from "@locar/api/entities";

export const ReservationRepository = {
  index: async () => {
    const res = await http.api.reservations.$get();
    const data = await res.json();
    return data;
  },
  show: async (id: string) => {
    const res = await http.api.reservations[":id"].$get({ param: { id } });
    const data = await res.json();
    return data.data;
  },
  create: async (data: ReservationData) => {
    const res = await http.api.reservations.$post({ json: data });
    const createdData = await res.json();
    return createdData;
  },
  update: async (id: string, data: ReservationData) => {
    const res = await http.api.reservations[":id"].$put({
      param: { id },
      json: data,
    });
    const updatedData = await res.json();
    return updatedData;
  },
  destroy: async (id: string) => {
    await http.api.reservations[":id"].$delete({ param: { id } });
  },
};
