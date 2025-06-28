import { db } from "../database";
import { eq } from "drizzle-orm";
import { vehicles } from "../database/schema";
import { VehicleData } from "../entities";
import { v4 as uuidv4 } from "uuid";

export const VehicleService = {
  async findAll() {
    return db.query.vehicles.findMany();
  },

  async find(id: string) {
    return db.query.vehicles.findFirst({
      where: eq(vehicles.id, id),
    });
  },

  async create(data: VehicleData) {
    return db
      .insert(vehicles)
      .values({
        ...data,
        id: uuidv4(),
      })
      .returning();
  },

  async update(id: string, data: Partial<VehicleData>) {
    // First check if vehicle exists
    const findResult = await this.find(id);
    if (!findResult) {
      throw new Error("VEHICLE_NOT_FOUND", {
        cause: {
          type: "VEHICLE_NOT_FOUND",
          error: new Error("Vehicle not found"),
        },
      });
    }

    // If license plate is being updated, check for duplicates
    if (data.license_plate) {
      const exists = await db.query.vehicles.findFirst({
        where: eq(vehicles.license_plate, data.license_plate),
      });
      if (exists && exists.id !== id) {
        throw new Error("LICENSE_PLATE_EXISTS_ERROR", {
          cause: {
            type: "LICENSE_PLATE_EXISTS_ERROR",
            error: new Error("License plate already exists"),
          },
        }); 
      }
    }

    return db
      .update(vehicles)
      .set({ ...data, id })
      .where(eq(vehicles.id, id))
      .returning();
  },

  async delete(id: string) {
    return db.delete(vehicles).where(eq(vehicles.id, id));
  },
};
