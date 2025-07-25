/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

/**
 * Utility to obtain the variable type (handles “no args” nicely).
 */
type FirstArg<F extends (...args: any) => any> =
  Parameters<F>[0] extends undefined ? void : Parameters<F>[0];

/**
 * Build a typed `useMutation` hook from an arbitrary async function.
 *
 * @example
 *   const useCreateUser = makeMutationHook(createUserFn);
 *
 * @example – override error type only
 *   const useCreateUser = makeMutationHook<typeof createUserFn, AxiosError>(createUserFn);
 */
export function makeMutationHook<
  Fn extends (...args: any) => Promise<any>,
  TError = unknown,
  TContext = unknown
>(mutationFn: Fn) {
  type TVariables = FirstArg<Fn>;
  type TData = Awaited<ReturnType<Fn>>;

  return (
    opts: Omit<
      UseMutationOptions<TData, TError, TVariables, TContext>,
      "mutationFn"
    > = {}
  ): UseMutationResult<TData, TError, TVariables, TContext> =>
    useMutation<TData, TError, TVariables, TContext>({
      mutationFn: mutationFn as (vars: TVariables) => Promise<TData>,
      ...opts,
    });
}

/**
 * Turn an async function into a fully‑typed `useQuery` hook.
 *
 * @param prefix   Constant part of the query‑key, e.g. ['user'].
 * @param fetcher  Async function that returns the data.
 *
 * @example
 *   const useUser = makeQueryHook(['user'], getUserFn);
 */
export function makeQueryHook<
  Fn extends (...args: any) => Promise<any>,
  TError = unknown,
  const Prefix extends readonly unknown[] = readonly unknown[]
>(prefix: Prefix, fetcher: Fn) {
  type TVariables = FirstArg<Fn>;
  type TData = Awaited<ReturnType<Fn>>;
  type TKey = TVariables extends void
    ? readonly [...Prefix]
    : readonly [...Prefix, TVariables];

  return (
    variables: TVariables,
    opts: Omit<
      UseQueryOptions<TData, TError, TData, TKey>,
      "queryKey" | "queryFn"
    > = {}
  ): UseQueryResult<TData, TError> => {
    // console.log("queryKey", [...prefix, variables]);
    return useQuery<TData, TError, TData, TKey>({
      queryKey: (variables === undefined
        ? [...prefix]
        : [...prefix, variables]) as TKey,
      queryFn: () => fetcher(variables as any),
      ...opts,
    });
  };
}
