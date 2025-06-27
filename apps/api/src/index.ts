import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { healthRoutes } from './routes'

const app = new Hono()
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
