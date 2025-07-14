import { makeMutationHook, makeQueryHook } from "@/lib/query-generator";
import {
  customerCreateFn,
  customerDeleteFn,
  customerIndexFn,
  customerShowFn,
  customerUpdateFn,
} from "./api";

export const useCustomerIndex = makeQueryHook(["customers"], customerIndexFn);
export const useCustomerShow = makeQueryHook(
  ["customers", "show"],
  customerShowFn
);
export const useCustomerUpdate = makeMutationHook(customerUpdateFn);
export const useCustomerCreate = makeMutationHook(customerCreateFn);
export const useCustomerDelete = makeMutationHook(customerDeleteFn);
