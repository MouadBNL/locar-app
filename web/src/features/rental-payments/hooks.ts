import { makeMutationHook, makeQueryHook } from '@/lib/query-generator';
import {
  rentalPaymentCreateFn,
  rentalPaymentDeleteFn,
  rentalPaymentIndexFn,
  rentalPaymentShowFn,
  rentalPaymentUpdateFn,
} from './api';

export const useRentalPaymentIndex = makeQueryHook(
  ['rental-payments'],
  rentalPaymentIndexFn,
);

export const useRentalPaymentShow = makeQueryHook(
  ['rental-payments', 'show'],
  rentalPaymentShowFn,
);

export const useRentalPaymentCreate = makeMutationHook(rentalPaymentCreateFn);
export const useRentalPaymentUpdate = makeMutationHook(rentalPaymentUpdateFn);
export const useRentalPaymentDelete = makeMutationHook(rentalPaymentDeleteFn);
