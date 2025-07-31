import { createFileRoute, Outlet } from '@tanstack/react-router';
import { breadcrumb } from '@/lib/breadcrumb';

export const Route = createFileRoute('/app/rentals')({
  component: RouteComponent,
  loader: () => {
    return {
      meta: {
        breadcrumb: breadcrumb('rental:label_plural'),
      },
    };
  },
});

function RouteComponent() {
  return <Outlet />;
}
