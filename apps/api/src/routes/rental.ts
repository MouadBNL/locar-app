import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { RentalInitializationSchema, RentalSchema } from "../entities";
import { RentalService } from "../services";
import { authMiddleware } from "../middlewares/auth";
import { AuthContext } from "../lib/auth";

export const rentalRoutes = new Hono<AuthContext>()
  .use("*", authMiddleware)
  .post(
    "/initialize",
    zValidator("json", RentalInitializationSchema),
    async (c) => {
      const data = await c.req.valid("json");
      const result = await RentalService.initialize(data);
      return c.json({
        data: result,
        success: true,
        message: "Rental created successfully",
      });
    }
  )
  .get("/", async (c) => {
    const data = await RentalService.findAll();
    return c.json({
      data: data,
      success: true,
    });
  })
  .get("/:code", async (c) => {
    const code = c.req.param("code");
    const data = await RentalService.find(code);
    if (!data) {
      return c.json(
        {
          data: null,
          success: false,
          message: "Rental not found",
        },
        404
      );
    }
    return c.json({
      data: data,
      success: true,
    });
  })
  .post("/", zValidator("json", RentalSchema), async (c) => {
    const data = await c.req.valid("json");
    const result = await RentalService.create(data);
    return c.json({
      data: result,
      success: true,
      message: "Rental created successfully",
    });
  })
  .put("/:id", zValidator("json", RentalSchema), async (c) => {
    const id = c.req.param("id");
    const data = await c.req.valid("json");
    const result = await RentalService.update(id, data);
    return c.json({
      data: result,
      success: true,
      message: "Rental updated successfully",
    });
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await RentalService.delete(id);
    return c.json({
      data: null,
      success: true,
      message: "Rental deleted successfully",
    });
  });
