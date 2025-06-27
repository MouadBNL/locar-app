import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "@/components/theme-provider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <ThemeProvider storageKey="locar-ui-theme" defaultTheme="dark">
        <Outlet />
      </ThemeProvider>
      <TanStackRouterDevtools />
    </React.Fragment>
  );
}
