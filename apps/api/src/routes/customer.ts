import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { CustomerSchema } from "../entities";
import { CustomerService } from "../services";

export const customerRoutes = new Hono()
  .get("/", async (c) => {
    const data = await CustomerService.findAll();
    return c.json({
      data: data,
      success: true,
    });
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const data = await CustomerService.find(id);
    if (!data) {
      return c.json(
        {
          data: null,
          success: false,
          message: "Vehicle not found",
        },
        404
      );
    }
    return c.json({
      data: data,
      success: true,
    });
  })
  .post("/", zValidator("json", CustomerSchema), async (c) => {
    const data = await c.req.valid("json");
    const result = await CustomerService.create(data);
    return c.json({
      data: result,
      success: true,
      message: "Vehicle created successfully",
    });
  })
  .put("/:id", zValidator("json", CustomerSchema.partial()), async (c) => {
    const id = c.req.param("id");
    const data = await c.req.valid("json");
    const result = await CustomerService.update(id, data);
    return c.json({
      data: result,
      success: true,
      message: "Vehicle updated successfully",
    });
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await CustomerService.delete(id);
    return c.json({
      data: null,
      success: true,
      message: "Vehicle deleted successfully",
    });
  });
