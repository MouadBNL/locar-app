import { Link, useRouterState } from '@tanstack/react-router';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export function AppBreadcrumbs() {
  const { t } = useTranslation();
  const matches = useRouterState({ select: s => s.matches });

  const breadcrumbs = useMemo(() => matches
    .filter(match => match.context.meta?.breadcrumb)
    .map(({ pathname, context }) => {
      return {
        title: context.meta?.title,
        path: pathname,
      };
    }), [matches]);

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
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={breadcrumb.path}>
                    {breadcrumb.title ?? '####'}
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
