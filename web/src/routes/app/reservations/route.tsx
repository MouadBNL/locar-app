import { createFileRoute, Outlet } from '@tanstack/react-router';
import { breadcrumb } from '@/lib/breadcrumb';

export const Route = createFileRoute('/app/reservations')({
  component: RouteComponent,
  loader: () => {
    return {
      meta: {
        breadcrumb: breadcrumb('reservation:label_plural'),
      },
    };
  },
});

function RouteComponent() {
  return <Outlet />;
}
