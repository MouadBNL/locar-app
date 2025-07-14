import {
  rentalCreateFn,
  rentalDeleteFn,
  rentalIndexFn,
  rentalShowFn,
} from "./api";
import { makeMutationHook, makeQueryHook } from "@/lib/query-generator";

export const useRentalIndex = makeQueryHook(["rentals"], rentalIndexFn);
export const useRentalDelete = makeMutationHook(rentalDeleteFn);
export const useRentalCreate = makeMutationHook(rentalCreateFn);
export const useRentalShow = makeQueryHook(["rentals"], rentalShowFn);
