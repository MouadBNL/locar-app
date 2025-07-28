import { makeMutationHook, makeQueryHook } from '@/lib/query-generator';
import {
  rentalAgreementGenerateFn,
  rentalCreateFn,
  rentalDeleteFn,
  rentalIndexFn,
  rentalNotesUpdateFn,
  rentalRateUpdateFn,
  rentalRenterUpdateFn,
  rentalReturnFn,
  rentalShowFn,
  rentalStartFn,
  rentalTimeframeUpdateFn,
  rentalVehicleUpdateFn,
} from './api';

export const useRentalIndex = makeQueryHook(['rentals'], rentalIndexFn);
export const useRentalDelete = makeMutationHook(rentalDeleteFn);
export const useRentalCreate = makeMutationHook(rentalCreateFn);
export const useRentalShow = makeQueryHook(['rentals'], rentalShowFn);

export const useRentalVehicleUpdate = makeMutationHook(rentalVehicleUpdateFn);
export const useRentalRenterUpdate = makeMutationHook(rentalRenterUpdateFn);
export const useRentalTimeframeUpdate = makeMutationHook(
  rentalTimeframeUpdateFn,
);
export const useRentalRateUpdate = makeMutationHook(rentalRateUpdateFn);
export const useRentalNotesUpdate = makeMutationHook(rentalNotesUpdateFn);

export const useRentalStart = makeMutationHook(rentalStartFn);
export const useRentalReturn = makeMutationHook(rentalReturnFn);
export const useRentalAgreementGenerate = makeMutationHook(
  rentalAgreementGenerateFn,
);
