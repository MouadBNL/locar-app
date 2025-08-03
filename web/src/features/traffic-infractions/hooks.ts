import { makeMutationHook, makeQueryHook } from '@/lib/query-generator';
import {
  trafficInfractionCreateFn,
  trafficInfractionDeleteFn,
  trafficInfractionShowFn,
  trafficInfractionsIndexFn,
  trafficInfractionUpdateFn,
} from './api';

export const useTrafficInfractionIndex = makeQueryHook(['traffic-infractions'], trafficInfractionsIndexFn);
export const useTrafficInfractionShow = makeQueryHook(['traffic-infraction', 'show'], trafficInfractionShowFn);
export const useTrafficInfractionCreate = makeMutationHook(trafficInfractionCreateFn);
export const useTrafficInfractionUpdate = makeMutationHook(trafficInfractionUpdateFn);
export const useTrafficInfractionDelete = makeMutationHook(trafficInfractionDeleteFn);
