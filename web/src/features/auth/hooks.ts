import { makeMutationHook, makeQueryHook } from '@/lib/query-generator';
import { authMeFn, signoutFn, signupFn, singinFn } from '.';

export const useSingIn = makeMutationHook(singinFn);

export const useSignUp = makeMutationHook(signupFn);

export const useSignout = makeMutationHook(signoutFn);

export const useAuthMe = makeQueryHook(['auth.me'], authMeFn);
