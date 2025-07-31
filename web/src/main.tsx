import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
// Import the generated route tree
import { routeTree } from './routeTree.gen';
import './index.css';
import './lib/i18n';

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
    meta: {
      title: 'Localar',
      breadcrumb: false,
    },
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
