import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/rentals/$id/documents')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/rentals/$id/documents"!</div>
}
