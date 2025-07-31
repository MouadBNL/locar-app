import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import * as React from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';

const queryClient = new QueryClient();

interface RootContext {
  meta: {
    title: string;
    breadcrumb: boolean;
  };
}

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider storageKey="locar-ui-theme" defaultTheme="dark">
          <Outlet />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
      <TanStackRouterDevtools position="bottom-right" />
    </React.Fragment>
  );
}
