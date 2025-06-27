import { Hono } from "hono";


export const healthRoutes = new Hono()
    .get("/up", (c) => {
        return c.json({
            data: null,
            success: true,
            message: "Server is up and running"
        })
    })