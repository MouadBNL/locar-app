import * as Sentry from '@sentry/react';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { queryClient } from './lib/query-generator';
// Import the generated route tree
import { routeTree } from './routeTree.gen';
import './index.css';
import './lib/i18n';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: Number(import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE ?? '0'),
  environment: import.meta.env.VITE_SENTRY_ENVIRONMENT,
});

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className="flex items-center justify-center h-full min-h-64">
      <Loader2 className="animate-spin" />
    </div>
  ),
  defaultPendingMs: 200,
  context: {
    queryClient,
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
