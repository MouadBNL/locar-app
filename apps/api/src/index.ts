import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { healthRoutes } from './routes'
import { cors } from 'hono/cors'

const app = new Hono()
  .use("/api/*", cors({
    origin: "http://localhost:5173",
    allowHeaders: ["*"],
    allowMethods: ["*"],
  }))
  .route("/api/health", healthRoutes)
  .get('/', (c) => {
    return c.text('Hello Hono!')
  })

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})


export type AppType = typeof app; 