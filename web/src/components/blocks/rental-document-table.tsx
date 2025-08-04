import type { ColumnDef } from '@tanstack/react-table';
import type { RentalDocumentResource } from '@/features/rental-documents';
import { useTranslation } from 'react-i18next';
import {

  rentalDocumentTypeMap,
} from '@/features/rental-documents';

import { DataTable } from './datatable';

function useRentalDocumentTableColumns({ actions }: { actions?: (rentalDocument: RentalDocumentResource) => React.ReactNode }) {
  const { t } = useTranslation(['document', 'common']);
  const columns: ColumnDef<RentalDocumentResource>[] = [
    {
      header: () => t('document:attributes.title'),
      accessorKey: 'title',
      cell: ({ row }) => <span>{row.original.title}</span>,
    },
    {
      header: () => t('document:attributes.filename'),
      accessorKey: 'document.filename',
      cell: ({ row }) => <span>{row.original.document.filename}</span>,
    },
    {
      header: () => t('document:attributes.type'),
      accessorKey: 'type',
      cell: ({ row }) => <span>{rentalDocumentTypeMap[row.original.type] ?? 'Unknown'}</span>,
    },
    {
      header: () => t('document:attributes.description'),
      accessorKey: 'description',
      cell: ({ row }) => <p className="max-w-[250px] truncate" title={row.original.description ?? ''}>{row.original.description}</p>,
    },
    {
      header: () => t('common:actions'),
      accessorKey: 'actions',
      cell: ({ row }) => <div className="flex gap-2 justify-end">{actions?.(row.original)}</div>,
    },
  ];
  return { columns };
}

export interface RentalDocumentTableProps {
  rentalDocuments: RentalDocumentResource[];
  actions?: (rentalDocument: RentalDocumentResource) => React.ReactNode;
  loading?: boolean;
}
export function RentalDocumentTable({
  rentalDocuments,
  actions,
  loading,
}: RentalDocumentTableProps) {
  const { columns } = useRentalDocumentTableColumns({ actions });

  return <DataTable data={rentalDocuments} loading={loading} columns={columns} rowId={row => row.id!} />;
}
