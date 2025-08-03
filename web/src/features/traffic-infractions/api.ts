import type { TrafficInfractionCreateRequest, TrafficInfractionUpdateRequest } from './types';
import { http } from '@/lib/http';

interface TrafficInfractionsQuery {
  params: {
    vehicle_id?: string;
    rental_id?: string;
    customer_id?: string;
  };
}

export async function trafficInfractionsIndexFn(query: TrafficInfractionsQuery) {
  const response = await http.get('/traffic-infractions', {
    params: query.params,
  });
  return response.data;
}

export async function trafficInfractionShowFn({ id }: { id: string }) {
  const response = await http.get(`/traffic-infractions/${id}`);
  return response.data;
}

export async function trafficInfractionCreateFn({ data }: { data: TrafficInfractionCreateRequest }) {
  const response = await http.post('/traffic-infractions', data);
  return response.data;
}

export async function trafficInfractionUpdateFn({ id, data }: { id: string; data: TrafficInfractionUpdateRequest }) {
  const response = await http.put(`/traffic-infractions/${id}`, data);
  return response.data;
}

export async function trafficInfractionDeleteFn({ id }: { id: string }) {
  const response = await http.delete(`/traffic-infractions/${id}`);
  return response.data;
}
