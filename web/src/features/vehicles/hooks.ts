import { makeMutationHook, makeQueryHook } from '@/lib/query-generator';
import { vehicleCreateFn, vehicleDeleteFn, vehicleIndexFn, vehicleShowFn, vehicleUpdateFn } from './api';

export const useVehicleIndex = makeQueryHook(['vehicles'], vehicleIndexFn);

export const useVehicleCreate = makeMutationHook(vehicleCreateFn);

export const useVehicleShow = makeQueryHook(['vehicles'], vehicleShowFn);

export const useVehicleUpdate = makeMutationHook(vehicleUpdateFn);

export const useVehicleDelete = makeMutationHook(vehicleDeleteFn);
