import { makeMutationHook, makeQueryHook } from "@/lib/query-generator";
import {
  vehicleMaintenanceCreateFn,
  vehicleMaintenanceIndexFn,
  vehicleMaintenanceShowFn,
  vehicleMaintenanceUpdateFn,
  vehicleMaintenanceDeleteFn,
} from "./api";

export const useVehicleMaintenanceIndex = makeQueryHook(
  ["vehicle-maintenances"],
  vehicleMaintenanceIndexFn
);

export const useVehicleMaintenanceShow = makeQueryHook(
  ["vehicle-maintenance"],
  vehicleMaintenanceShowFn
);

export const useVehicleMaintenanceCreate = makeMutationHook(
  vehicleMaintenanceCreateFn
);

export const useVehicleMaintenanceUpdate = makeMutationHook(
  vehicleMaintenanceUpdateFn
);

export const useVehicleMaintenanceDelete = makeMutationHook(
  vehicleMaintenanceDeleteFn
);
