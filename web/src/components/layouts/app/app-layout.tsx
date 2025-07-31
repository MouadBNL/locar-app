import { useTranslation } from 'react-i18next';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './_components/app-sidebar';
import { AppHeader } from './app-header';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />

        <main className="p-0 h-full">{children}</main>

        <footer className="mt-8">
          <div className="container mx-auto">
            <Separator />
            <div className="flex items-center justify-between text-muted-foreground py-4 text-sm ">
              <p>
                {'\© 2025 -'}
                {' '}
                {t('allRightsReserved')}
              </p>
              <p>
                <a href="#" className="hover:underline">
                  {t('randomLink')}
                </a>
              </p>
            </div>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
