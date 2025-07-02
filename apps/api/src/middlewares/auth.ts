import { createMiddleware } from "hono/factory";
import { AuthContext } from "../lib/auth";

export const authMiddleware = createMiddleware<AuthContext>(async (c, next) => {
  const user = c.get("user");
  const session = c.get("session");
  if (!user || !session || session.expiresAt < new Date()) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  return next();
});
