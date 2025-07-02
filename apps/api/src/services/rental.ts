import { RentalData } from "../entities";
import { rentals } from "../database/schema";
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
      },
    });
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
};
