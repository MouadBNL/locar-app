'use no memo';
import type { ColumnDef } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PaginationControls } from '../ui/pagination';

export interface DataTableProps<T> {
  data: T[];
  loading?: boolean;
  columns: ColumnDef<T>[];
  rowId: (row: T) => string;
}

export function DataTable<T>({ data, loading, columns, rowId }: DataTableProps<T>) {
  const { t } = useTranslation(['common']);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: row => rowId(row),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    debugTable: true,
  });

  return (
    <div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className="bg-muted/50">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length
              ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )
              : loading
                ? (
                    <TableRow>
                      <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                          {t('common:loading')}
                        </TableCell>
                      </TableRow>
                    </TableRow>
                  )
                : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        {t('common:table.no_data_found')}
                      </TableCell>
                    </TableRow>
                  )}
          </TableBody>
        </Table>
      </div>
      <PaginationControls table={table} />
    </div>
  );
}
