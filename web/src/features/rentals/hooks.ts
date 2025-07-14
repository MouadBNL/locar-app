import { rentalCreateFn, rentalDeleteFn, rentalIndexFn } from "./api";
import { makeMutationHook, makeQueryHook } from "@/lib/query-generator";

export const useRentalIndex = makeQueryHook(["rentals"], rentalIndexFn);
export const useRentalDelete = makeMutationHook(rentalDeleteFn);
export const useRentalCreate = makeMutationHook(rentalCreateFn);
