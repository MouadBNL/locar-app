import { RentalData, RentalInitializationData } from "../entities";
import {
  rental_customers,
  rental_periods,
  rental_rates,
  rental_vehicles,
  rentals,
  vehicles,
} from "../database/schema";
import { db } from "../database";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";

export const RentalService = {
  create: async (rental: RentalData) => {
    const newRental = await db.insert(rentals).values({
      ...rental,
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    });
    return newRental;
  },
  findAll: async () => {
    const rentals = await db.query.rentals.findMany({
      with: {
        vehicle: true,
        customer: true,
        period: true,
        rate: true,
      },
    });
    const vv = rentals[0].vehicle
    return rentals;
  },
  find: async (id: string) => {
    const rental = await db.query.rentals.findFirst({
      where: eq(rentals.id, id),
    });
    return rental;
  },
  update: async (id: string, rental: RentalData) => {
    const updatedRental = await db
      .update(rentals)
      .set({ ...rental, id, updated_at: new Date() })
      .where(eq(rentals.id, id));
    return updatedRental;
  },
  delete: async (id: string) => {
    const deletedRental = await db.delete(rentals).where(eq(rentals.id, id));
    return deletedRental;
  },

  initialize: async (data: RentalInitializationData) => {
    const result = await db.transaction(async (tx) => {
      const [rental] = await tx
        .insert(rentals)
        .values({
          id: uuidv4(),
          code: data.code,
          notes: data.notes,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning();

      const [period] = await tx
        .insert(rental_periods)
        .values({
          id: uuidv4(),
          rental_id: rental.id,
          pickup_date: data.period.pickup_date,
          return_date: data.period.return_date,
        })
        .returning();

      const [customer] = await tx
        .insert(rental_customers)
        .values({
          id: uuidv4(),
          rental_id: rental.id,
          customer_id: data.customer.customer_id,
          full_name: data.customer.full_name,
          phone: data.customer.phone,
          address1: data.customer.address1,
          address2: data.customer.address2,
          id_number: data.customer.id_number,
          id_issued_at: data.customer.id_issued_at,
          id_expired_at: data.customer.id_expired_at,
          id_document: data.customer.id_document,
          license_number: data.customer.license_number,
          license_issued_at: data.customer.license_issued_at,
          license_expired_at: data.customer.license_expired_at,
          license_document: data.customer.license_document,
        })
        .returning();

      console.log("data.vehicle.vehicle_id:", data.vehicle.vehicle_id);
      const originalVehicle = await tx.query.vehicles.findFirst({
        where: eq(vehicles.id, data.vehicle.vehicle_id!),
      });

      console.log("originalVehicle:", originalVehicle);

      if (!originalVehicle) {
        tx.rollback();
        throw new Error("Vehicle not found");
      }

      const [vehicle] = await tx
        .insert(rental_vehicles)
        .values({
          id: uuidv4(),
          rental_id: rental.id,
          vehicle_id: data.vehicle.vehicle_id,
          plate_number: originalVehicle.license_plate,
          brand: originalVehicle.make,
          model: originalVehicle.model,
          year: originalVehicle.year,
          // color: data.vehicle.color,
        })
        .returning();

      const [rate] = await tx
        .insert(rental_rates)
        .values({
          id: uuidv4(),
          rental_id: rental.id,
          unit: data.rate.unit,
          price_per_unit: data.rate.price_per_unit,
          number_of_units: data.rate.number_of_units,
          total_price: data.rate.total_price,
        })
        .returning();

      return {
        rental,
        period,
        customer,
        vehicle,
        rate,
      };
    });

    return result;
  },
};
