import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/customers/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/customers/$id"!</div>
}
