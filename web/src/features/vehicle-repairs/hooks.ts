import { makeMutationHook, makeQueryHook } from '@/lib/query-generator';
import {
  vehicleRepairCreateFn,
  vehicleRepairDeleteFn,
  vehicleRepairIndexFn,
  vehicleRepairShowFn,
  vehicleRepairUpdateFn,
} from './api';

export const useVehicleRepairIndex = makeQueryHook(
  ['vehicle-repairs'],
  vehicleRepairIndexFn,
);

export const useVehicleRepairShow = makeQueryHook(
  ['vehicle-repair'],
  vehicleRepairShowFn,
);

export const useVehicleRepairCreate = makeMutationHook(
  vehicleRepairCreateFn,
);

export const useVehicleRepairUpdate = makeMutationHook(
  vehicleRepairUpdateFn,
);

export const useVehicleRepairDelete = makeMutationHook(
  vehicleRepairDeleteFn,
);
