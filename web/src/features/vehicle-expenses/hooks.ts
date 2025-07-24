import { makeMutationHook, makeQueryHook } from "@/lib/query-generator";
import {
  vehicleExpenseCreateFn,
  vehicleExpenseDeleteFn,
  vehicleExpenseIndexFn,
  vehicleExpenseShowFn,
  vehicleExpenseUpdateFn,
} from "./api";

export const useVehicleExpenseIndex = makeQueryHook(
  ["vehicle-expenses"],
  vehicleExpenseIndexFn
);

export const useVehicleExpenseShow = makeQueryHook(
  ["vehicle-expenses", "show"],
  vehicleExpenseShowFn
);

export const useVehicleExpenseCreate = makeMutationHook(vehicleExpenseCreateFn);
export const useVehicleExpenseUpdate = makeMutationHook(vehicleExpenseUpdateFn);
export const useVehicleExpenseDelete = makeMutationHook(vehicleExpenseDeleteFn);
