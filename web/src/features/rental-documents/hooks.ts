import { makeMutationHook, makeQueryHook } from '@/lib/query-generator';
import {
  rentalDocumentCreateFn,
  rentalDocumentDeleteFn,
  rentalDocumentIndexFn,
  rentalDocumentShowFn,
  rentalDocumentUpdateFn,
} from './api';

export const useRentalDocumentIndex = makeQueryHook(
  ['rental-documents'],
  rentalDocumentIndexFn,
);

export const useRentalDocumentShow = makeQueryHook(
  ['rental-documents', 'show'],
  rentalDocumentShowFn,
);

export const useRentalDocumentCreate = makeMutationHook(rentalDocumentCreateFn);

export const useRentalDocumentUpdate = makeMutationHook(rentalDocumentUpdateFn);

export const useRentalDocumentDelete = makeMutationHook(rentalDocumentDeleteFn);
