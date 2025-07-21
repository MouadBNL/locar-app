import {
  rentalCreateFn,
  rentalDeleteFn,
  rentalIndexFn,
  rentalNotesUpdateFn,
  rentalRenterUpdateFn,
  rentalRateUpdateFn,
  rentalShowFn,
  rentalTimeframeUpdateFn,
  rentalVehicleUpdateFn,
  rentalStartFn,
  rentalReturnFn,
} from "./api";
import { makeMutationHook, makeQueryHook } from "@/lib/query-generator";

export const useRentalIndex = makeQueryHook(["rentals"], rentalIndexFn);
export const useRentalDelete = makeMutationHook(rentalDeleteFn);
export const useRentalCreate = makeMutationHook(rentalCreateFn);
export const useRentalShow = makeQueryHook(["rentals"], rentalShowFn);

export const useRentalVehicleUpdate = makeMutationHook(rentalVehicleUpdateFn);
export const useRentalRenterUpdate = makeMutationHook(rentalRenterUpdateFn);
export const useRentalTimeframeUpdate = makeMutationHook(
  rentalTimeframeUpdateFn
);
export const useRentalRateUpdate = makeMutationHook(rentalRateUpdateFn);
export const useRentalNotesUpdate = makeMutationHook(rentalNotesUpdateFn);

export const useRentalStart = makeMutationHook(rentalStartFn);
export const useRentalReturn = makeMutationHook(rentalReturnFn);
