import type z from 'zod';
import type { VehicleSchema } from '.';
import type { RentalSummaryData } from '../rentals';
import type { ReservationResource } from '../reservations';
import type { VehicleStatus } from '../vehicle-expenses';
import type { VehicleMaintenanceResource } from '../vehicle-maintenances';

export type VehicleData = z.infer<typeof VehicleSchema>;

export interface VehicleResource {
  id: string;
  make: string;
  model: string;
  year: number;
  first_service_date: string;
  last_service_date: string;
  license_plate: string;
  vin: string;
  mileage: number;
  fuel_type: z.infer<typeof VehicleSchema.shape.fuel_type>;
  transmission: z.infer<typeof VehicleSchema.shape.transmission>;
  number_of_seats: number;
  number_of_doors: number;
  color: string;
  photo_url: string;
  status: VehicleStatusType;
  created_at: string;
  updated_at: string;

  active_rental?: RentalSummaryData | null;
  active_reservation?: ReservationResource | null;
  active_maintenance?: VehicleMaintenanceResource | null;
}

export interface VehicleSummaryResource {
  id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
}

export type VehicleStatusType = keyof typeof VehicleStatus;
