import type { z } from 'zod';

import type { CustomerSummaryResource } from '../customers';
import type { DocumentResource } from '../documents';
import type { VehicleSummaryResource } from '../vehicles/type';
import type { TrafficInfractionSchema } from './schema';

export type TrafficInfractionCreateRequest = z.infer<
  typeof TrafficInfractionSchema
>;

export type TrafficInfractionUpdateRequest = TrafficInfractionCreateRequest;

export interface TrafficInfractionResource {
  id: string | null;
  date: string | null;
  title: string | null;
  document_id: string | null;
  location: string | null;
  vehicle_id: string | null;
  rental_id: string | null;
  customer_id: string | null;
  vehicle: VehicleSummaryResource | null;
  rental: {
    id: string;
    rental_number: string;
  } | null;
  customer: CustomerSummaryResource | null;
  document: DocumentResource | null;
}
