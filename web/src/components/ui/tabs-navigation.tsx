import { Outlet, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { ScrollArea, ScrollBar } from './scroll-area';
import { Tabs, TabsList, TabsTrigger } from './tabs';

export interface TabsNavigationProps {
  tabs: {
    label: string | React.ReactNode;
    path: string;
  }[];
  basePath: string;
}

export function TabsNavigation({ tabs, basePath }: TabsNavigationProps) {
  const router = useRouter();

  const [currentPath, setCurrentPath] = useState(
    router.state.location.pathname,
  );

  // Determine current tab from pathname
  const activeTab = tabs.find((tab) => {
    const target = tab.path === '' ? basePath : `${basePath}/${tab.path}`;
    return currentPath === target;
  })?.path ?? tabs[0].path;

  router.subscribe('onResolved', (state) => {
    setCurrentPath(state.toLocation.pathname);
  });

  function handleTabChange(value: string) {
    const navpath = tabs.find(tab => tab.path === value)?.path;
    const target = navpath
      ? `${basePath}/${navpath}`
      : `${basePath}/${tabs[0].path}`;
    setCurrentPath(target);
    router.navigate({ to: target });
  }

  return (
    <div>
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <ScrollArea>
          <TabsList className="justify-start before:bg-border relative mb-3 h-auto w-full gap-0.5 bg-transparent p-0 px-4 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
            {tabs.map(tab => (
              <TabsTrigger
                key={tab.path}
                value={tab.path}
                className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Tabs>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
