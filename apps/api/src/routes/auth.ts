import { Hono } from "hono";
import { auth, AuthContext } from "../lib/auth";
import { authMiddleware } from "../middlewares/auth";

export const authRoutes = new Hono<AuthContext>().on(
  ["POST", "GET"],
  "/**",
  (c) => auth.handler(c.req.raw)
);
