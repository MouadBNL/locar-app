import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { VehicleSchema } from "../entities";
import { VehicleService } from "../services";
import { type AuthContext } from "../lib/auth";
import { authMiddleware } from "../middlewares/auth";

export const vehicleRoutes = new Hono<AuthContext>()
  .use("*", authMiddleware)
  .get("/", async (c) => {
    const data = await VehicleService.findAll();
    return c.json({
      data: data,
      success: true,
    });
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const data = await VehicleService.find(id);
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
  .post("/", zValidator("json", VehicleSchema), async (c) => {
    const data = await c.req.valid("json");
    const result = await VehicleService.create(data);
    return c.json({
      data: result,
      success: true,
      message: "Vehicle created successfully",
    });
  })
  .put("/:id", zValidator("json", VehicleSchema.partial()), async (c) => {
    const id = c.req.param("id");
    const data = await c.req.valid("json");
    const result = await VehicleService.update(id, data);
    return c.json({
      data: result,
      success: true,
      message: "Vehicle updated successfully",
    });
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await VehicleService.delete(id);
    return c.json({
      data: null,
      success: true,
      message: "Vehicle deleted successfully",
    });
  });
