import { http } from "@/lib/http";

export * from "./vehicle";

export const HealthRepository = {
  up: async () => {
    const res = await http.api.health.up.$get();
    const data = await res.json();
    return data;
  },
};
