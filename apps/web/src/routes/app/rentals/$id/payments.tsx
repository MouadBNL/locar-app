import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/rentals/$id/payments')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/rentals/$id/payments"!</div>
}
