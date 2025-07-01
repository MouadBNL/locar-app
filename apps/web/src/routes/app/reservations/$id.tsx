import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/reservations/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/reservations/$id"!</div>
}
