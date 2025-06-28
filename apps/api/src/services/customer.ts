import { eq } from "drizzle-orm";
import { db } from "../database";
import { v4 as uuidv4 } from "uuid";
import { CustomerData } from "../entities";
import { customers } from "../database/schema";

export const CustomerService = {
  async create(data: CustomerData) {
    return db
      .insert(customers)
      .values({
        ...data,
        id: uuidv4(),
      })
      .returning();
  },

  async find(id: string) {
    return db.query.customers.findFirst({
      where: eq(customers.id, id),
    });
  },

  async findAll() {
    return db.query.customers.findMany();
  },

  async update(id: string, data: Partial<CustomerData>) {
    return db
      .update(customers)
      .set({
        ...data,
        updated_at: new Date(),
        id,
      })
      .where(eq(customers.id, id))
      .returning();
  },

  async delete(id: string) {
    return db.delete(customers).where(eq(customers.id, id));
  },
};
