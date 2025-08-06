import type { z } from 'zod';
import type { RentalSummaryData } from '../rentals';
import type { ReservationResource } from '../reservations';
import type { CustomerSchema } from './schema';

export type CustomerData = z.infer<typeof CustomerSchema> & {
  id?: string;
};

export type CustomerStatus
  = | {
    status: 'booked';
    entity_type: 'reservation';
    entity_id: string;
  }
  | {
    status: 'renting';
    entity_type: 'rental';
    entity_id: string;
  }
  | {
    status: 'active';
    entity_type: null;
    entity_id: null;
  };

export interface CustomerResource {
  id: string;
  first_name: string;
  last_name: string;
  status: CustomerStatus;
  rating: number | null;
  email: string;
  phone: string;
  id_card_address: string;
  driver_license_address: string;
  passport_address: string;  id_card_number: string;
  id_card_issuing_date: string;
  id_card_expiration_date: string;
  driver_license_number: string;
  passport_number: string;
  birth_date: string;
  created_at: string;
  updated_at: string;

  active_rental?: RentalSummaryData | null;
  active_reservation?: ReservationResource | null;
}

export interface CustomerSummaryResource {
  id: string;
  full_name: string;
  phone: string;
  identifier: string;
  rating: number | null;
}

export interface CustomerRatingResource {
  id: string;
  customer_id: string;
  rental_id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;

  rental?: RentalSummaryData;
  customer?: CustomerSummaryResource;
}
