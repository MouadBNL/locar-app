import { ReservationData } from "../entities";
import { reservations } from "../database/schema";
import { db } from "../database";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";

export const ReservationService = {
  create: async (reservation: ReservationData) => {
    const newReservation = await db.insert(reservations).values({
      ...reservation,
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    });
    return newReservation;
  },
  findAll: async () => {
    const reservations = await db.query.reservations.findMany({
      with: {
        vehicle: true,
        customer: true,
      },
    });
    return reservations;
  },
  find: async (id: string) => {
    const reservation = await db.query.reservations.findFirst({
      where: eq(reservations.id, id),
    });
    return reservation;
  },
  update: async (id: string, reservation: ReservationData) => {
    const updatedReservation = await db
      .update(reservations)
      .set({ ...reservation, id, updated_at: new Date() })
      .where(eq(reservations.id, id));
    return updatedReservation;
  },
  delete: async (id: string) => {
    const deletedReservation = await db
      .delete(reservations)
      .where(eq(reservations.id, id));
    return deletedReservation;
  },
};
