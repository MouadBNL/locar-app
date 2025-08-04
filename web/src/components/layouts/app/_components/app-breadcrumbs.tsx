import { Link, useMatches } from '@tanstack/react-router';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export function AppBreadcrumbs() {
  const { t } = useTranslation();
  const matches = useMatches();

  // Memoize the breadcrumb items calculation
  const items = useMemo(() => {
    return matches
      .filter(match => match.loaderData && 'meta' in match.loaderData && match.loaderData.meta?.breadcrumb)
      .map(({ pathname, loaderData }) => {
        // @ts-expect-error Property 'meta' does not exist on type 'LoaderData<{ vehicle: VehicleResource; }>'.
        const title = loaderData?.meta?.breadcrumb?.title ?? '';
        return {
          title,
          path: pathname,
        };
      });
  }, [matches]);

  // Memoize the document title to avoid unnecessary updates
  const documentTitle = useMemo(() => {
    return items.map(e => t(e.title ?? '')).join(' - ');
  }, [items, t]);

  // Update document title only when it changes
  React.useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  // Memoize the dashboard translation
  const dashboardText = useMemo(() => t('dashboard'), [t]);

  // Memoize the breadcrumb item renderer
  const renderBreadcrumbItem = useCallback((breadcrumb: { title: string; path: string }) => {
    // eslint-disable-next-line ts/no-explicit-any
    const translatedTitle = t(breadcrumb.title as any);

    return (
      <React.Fragment key={breadcrumb.path}>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link to={breadcrumb.path}>
              {translatedTitle}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </React.Fragment>
    );
  }, [t]);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink asChild>
              <Link to="/app">
                {dashboardText}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {items.map(renderBreadcrumbItem)}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
