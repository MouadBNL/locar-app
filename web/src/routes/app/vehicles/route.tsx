import { createFileRoute, Outlet } from '@tanstack/react-router';
import { breadcrumb } from '@/lib/breadcrumb';

export const Route = createFileRoute('/app/vehicles')({
  component: RouteComponent,
  loader: () => {
    return {
      meta: {
        breadcrumb: breadcrumb('vehicle:label_plural'),
      },
    };
  },
});

function RouteComponent() {
  return <Outlet />;
}
