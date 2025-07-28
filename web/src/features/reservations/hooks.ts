import { makeMutationHook, makeQueryHook } from '@/lib/query-generator';
import {
  reservationCreateFn,
  reservationDeleteFn,
  reservationIndexFn,
  reservationShowFn,
  reservationUpdateFn,
} from './api';

export const useReservationIndex = makeQueryHook(
  ['reservations'],
  reservationIndexFn,
);
export const useReservationShow = makeQueryHook(
  ['reservations', 'show'],
  reservationShowFn,
);
export const useReservationCreate = makeMutationHook(reservationCreateFn);
export const useReservationUpdate = makeMutationHook(reservationUpdateFn);
export const useReservationDelete = makeMutationHook(reservationDeleteFn);
