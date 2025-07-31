import { createFileRoute, Outlet } from '@tanstack/react-router';
import { breadcrumb } from '@/lib/breadcrumb';

export const Route = createFileRoute('/app/customers')({
  component: RouteComponent,
  loader: () => {
    return {
      meta: {
        breadcrumb: breadcrumb('customer:label_plural'),
      },
    };
  },
});

function RouteComponent() {
  return <Outlet />;
}
