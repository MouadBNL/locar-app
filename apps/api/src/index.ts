import { serve } from "@hono/node-server";
import { Hono } from "hono";
import * as routes from "./routes";
import { logger } from "hono/logger";
import { auth } from "./lib/auth";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>()
  .use("*", logger())
  .use("*", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      c.set("user", null);        
      c.set("session", null);
      return next();
    }

    c.set("user", session.user);
    c.set("session", session.session);
    return next();
  })
  .route("/api/auth", routes.authRoutes)
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
