import type { ColumnDef } from '@tanstack/react-table';
import type { CustomerRatingResource } from '@/features/customers';
import { useTranslation } from 'react-i18next';
import { DataTable } from './datatable';

function useCustomerRatingTableColumns({ actions }: { actions?: (rating: CustomerRatingResource) => React.ReactNode }) {
  const { t } = useTranslation(['customer', 'common']);
  const columns: ColumnDef<CustomerRatingResource>[] = [
    {
      header: () => t('customer:rating.attributes.rating'),
      accessorKey: 'rating',
      cell: ({ row }) => <span>{row.original.rating}</span>,
    },
    {
      header: () => t('customer:rating.attributes.rental'),
      accessorKey: 'rental',
      cell: ({ row }) => <span>{row.original.rental?.rental_number}</span>,
    },
    {
      header: () => t('customer:rating.attributes.comment'),
      accessorKey: 'comment',
      cell: ({ row }) => <p className="max-w-[250px] truncate" title={row.original.comment}>{row.original.comment}</p>,
    },
    {
      header: () => t('common:actions'),
      accessorKey: 'actions',
      cell: ({ row }) => <div className="flex gap-2 justify-end">{actions?.(row.original)}</div>,
    },
  ];
  return { columns };
}

export function CustomerRatingTable({
  data,
  loading,
  actions,
}: {
  data: CustomerRatingResource[];
  loading?: boolean;
  actions?: (rating: CustomerRatingResource) => React.ReactNode;
}) {
  const { columns } = useCustomerRatingTableColumns({ actions });
  return <DataTable data={data} loading={loading} columns={columns} rowId={row => row.id!} />;
}
