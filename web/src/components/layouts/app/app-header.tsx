import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AppBreadcrumbs } from './_components/app-breadcrumbs';
import { LanguageSelector } from './_components/language-selector';

export function AppHeader() {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <AppBreadcrumbs />
      </div>

      <div className="mr-8">
        <LanguageSelector />
      </div>
    </header>
  );
}
