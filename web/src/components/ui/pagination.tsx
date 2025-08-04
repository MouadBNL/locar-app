import type { Table } from '@tanstack/react-table';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react';

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, buttonVariants } from '@/components/ui/button';
import { usePagination } from '@/hooks/use-pagination';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'>
& React.ComponentProps<'a'>;

function PaginationLink({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const { t } = useTranslation(['common']);
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">{t('common:table.prev')}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const { t } = useTranslation(['common']);
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...props}
    >
      <span className="hidden sm:block">{t('common:table.next')}</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  const { t } = useTranslation(['common']);
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">{t('common:table.more')}</span>
    </span>
  );
}

// eslint-disable-next-line ts/no-explicit-any
function PaginationControls({ table }: { table: Table<any> }) {
  const { t } = useTranslation(['common']);
  const { pages, showLeftEllipsis, showRightEllipsis, leftEllipsisPages, rightEllipsisPages } = usePagination({
    currentPage: table.getState().pagination.pageIndex + 1,
    totalPages: table.getPageCount(),
    paginationItemsToDisplay: 5,
  });
  return (
    <div className="flex items-center justify-between gap-3 max-sm:flex-col mt-4">
      {/* Page number information */}
      <p
        className="text-muted-foreground flex-1 text-sm whitespace-nowrap"
        aria-live="polite"
      >
        {t('common:table.pagination_index_to_of', {
          index: table.getState().pagination.pageIndex + 1,
          total: table.getPageCount(),
        })}
      </p>

      {/* Pagination buttons */}
      <div className="">
        <Pagination>
          <PaginationContent>
            {/* Previous page button */}
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Go to previous page"
              >
                <ChevronLeftIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem>

            {/* Left ellipsis (...) */}
            {showLeftEllipsis && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {leftEllipsisPages.map(page => (
                    <DropdownMenuItem key={page} onClick={() => table.setPageIndex(page - 1)}>
                      {page}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Page number buttons */}
            {pages.map((page) => {
              const isActive
                  = page === table.getState().pagination.pageIndex + 1;
              return (
                <PaginationItem key={page}>
                  <Button
                    size="icon"
                    variant={`${isActive ? 'outline' : 'ghost'}`}
                    onClick={() => table.setPageIndex(page - 1)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {page}
                  </Button>
                </PaginationItem>
              );
            })}

            {/* Right ellipsis (...) */}
            {showRightEllipsis && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {rightEllipsisPages.map(page => (
                    <DropdownMenuItem key={page} onClick={() => table.setPageIndex(page - 1)}>
                      {page}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Next page button */}
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Go to next page"
              >
                <ChevronRightIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Results per page */}
      {/* <div className="flex flex-1 justify-end">
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
            aria-label="Results per page"
          >
            <SelectTrigger
              id="results-per-page"
              className="w-fit whitespace-nowrap"
            >
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 25, 50].map(pageSize => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                  {' '}
                  / page
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
    </div>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationControls,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
