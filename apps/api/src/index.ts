import { serve } from "@hono/node-server";
import { Hono } from "hono";
import * as routes from "./routes";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono()
  .use(
    "/api/*",
    cors({
      origin: "http://localhost:5173",
      allowHeaders: ["*"],
      allowMethods: ["*"],
    })
  )
  .use("*", logger())
  .route("/api/health", routes.healthRoutes)
  .route("/api/vehicles", routes.vehicleRoutes)
  .route("/api/customers", routes.customerRoutes)
  .route("/api/reservations", routes.reservationRoutes)
  .get("/", (c) => {
    return c.text("Hello Hono!");
  });

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

export type AppType = typeof app;

export default app;
