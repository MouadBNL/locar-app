import { Link, useMatches } from '@tanstack/react-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export function AppBreadcrumbs() {
  const { t } = useTranslation();
  const matches = useMatches();
  const items = matches
    .filter(match => match.loaderData && 'meta' in match.loaderData && match.loaderData.meta?.breadcrumb)
    .map(({ pathname, loaderData }) => {
      // @ts-expect-error Property 'meta' does not exist on type 'LoaderData<{ vehicle: VehicleResource; }>'.
      const title = loaderData?.meta?.breadcrumb?.title ?? '';
      return {
        title,
        path: pathname,
      };
    });

  document.title = items.map(e => t(e.title ?? '')).join(' - ');

  return (
    <div>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink asChild>
              <Link to="/app">
                {t('dashboard')}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {items.map(breadcrumb => (
            <React.Fragment key={breadcrumb.path}>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={breadcrumb.path}>
                    {t(breadcrumb.title) ?? '####'}
                  </Link>
                </BreadcrumbLink>
                {/* <BreadcrumbLink href={breadcrumb.path}>
                  {breadcrumb.title ?? '####'}
                </BreadcrumbLink> */}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
          {/* <BreadcrumbItem>
            <BreadcrumbPage>{t('vehicles')}</BreadcrumbPage>
          </BreadcrumbItem> */}
        </BreadcrumbList>
      </Breadcrumb>

      {/* <div className="fixed z-[100000000000000000] top-4 right-4 bottom-4 shadow-lg bg-accent p-8">
        <div className="h-full overflow-y-auto">
          <pre>{JSON.stringify(matches, null, 2)}</pre>
        </div>
      </div> */}
    </div>
  );
}
