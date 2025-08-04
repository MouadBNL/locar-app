import type { ColumnDef } from '@tanstack/react-table';
import type { RentalPaymentResource } from '@/features/rental-payments';
import { useTranslation } from 'react-i18next';
import { fmt_currency, str_to_titlecase } from '@/lib/utils';
import { DataTable } from './datatable';
import { DateCard } from './date-card';

function useRentalPaymentTableColumns({ actions }: { actions?: (payment: RentalPaymentResource) => React.ReactNode }) {
  const { t } = useTranslation(['payment', 'common']);
  const columns: ColumnDef<RentalPaymentResource>[] = [
    {
      header: () => t('payment:attributes.method'),
      accessorKey: 'method',
      cell: ({ row }) => (
        <span>
          {t(`payment:method_enum.${row.original.method}`, {
            defaultValue: str_to_titlecase(row.original.method),
          })}
        </span>
      ),
    },
    {
      header: () => t('payment:attributes.type'),
      accessorKey: 'type',
      cell: ({ row }) => (
        <span>
          {t(`payment:type_enum.${row.original.type}`, {
            defaultValue: str_to_titlecase(row.original.type),
          })}
        </span>
      ),
    },
    {
      header: () => t('payment:attributes.amount'),
      accessorKey: 'amount',
      cell: ({ row }) => <span>{fmt_currency(row.original.amount)}</span>,
    },
    {
      header: () => t('payment:attributes.date'),
      accessorKey: 'date',
      cell: ({ row }) => <DateCard date={row.original.date} />,
    },
    {
      header: () => t('payment:attributes.reference'),
      accessorKey: 'reference',
      cell: ({ row }) => <span>{row.original.reference}</span>,
    },
    {
      header: () => t('payment:attributes.notes'),
      accessorKey: 'notes',
      cell: ({ row }) => <span>{row.original.notes}</span>,
    },
    {
      header: () => t('common:actions'),
      accessorKey: 'actions',
      cell: ({ row }) => <div className="flex gap-2 justify-end">{actions?.(row.original)}</div>,
    },
  ];
  return { columns };
}

export function RentalPaymentTable({
  payments,
  actions,
  loading,
}: {
  payments: RentalPaymentResource[];
  actions?: (payment: RentalPaymentResource) => React.ReactNode;
  loading?: boolean;
}) {
  const { columns } = useRentalPaymentTableColumns({ actions });
  return <DataTable data={payments} loading={loading} columns={columns} rowId={row => row.id!} />;
}
