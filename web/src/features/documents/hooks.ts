import { makeMutationHook, makeQueryHook } from '@/lib/query-generator';
import { documentCreateFn, documentShowtFn } from './api';

export const useDocumentCreate = makeMutationHook(documentCreateFn);
export const useDocumentShow = makeQueryHook(
  ['documents', 'show'],
  documentShowtFn,
);
