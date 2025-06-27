import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/vehicles/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/vehicles/"!</div>
}
