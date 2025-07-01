import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ReservationSchema } from "../entities";
import { ReservationService } from "../services";

export const reservationRoutes = new Hono()
  .get("/", async (c) => {
    const data = await ReservationService.findAll();
    return c.json({
      data: data,
      success: true,
    });
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const data = await ReservationService.find(id);
    if (!data) {
      return c.json(
        {
          data: null,
          success: false,
          message: "Reservation not found",
        },
        404
      );
    }
    return c.json({
      data: data,
      success: true,
    });
  })
  .post("/", zValidator("json", ReservationSchema), async (c) => {
    const data = await c.req.valid("json");
    const result = await ReservationService.create(data);
    return c.json({
      data: result,
      success: true,
      message: "Reservation created successfully",
    });
  })
  .put("/:id", zValidator("json", ReservationSchema), async (c) => {
    const id = c.req.param("id");
    const data = await c.req.valid("json");
    const result = await ReservationService.update(id, data);
    return c.json({
      data: result,
      success: true,
      message: "Reservation updated successfully",
    });
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await ReservationService.delete(id);
    return c.json({
      data: null,
      success: true,
      message: "Reservation deleted successfully",
    });
  });
