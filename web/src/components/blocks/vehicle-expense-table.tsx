import type { ColumnDef } from '@tanstack/react-table';
import type { VehicleExpenseResource } from '@/features/vehicle-expenses';
import { useTranslation } from 'react-i18next';
import { fmt_currency } from '@/lib/utils';
import { DataTable } from './datatable';
import { DateCard } from './date-card';

function useVehicleExpenseTableColumns({ actions }: { actions?: (vehicleExpense: VehicleExpenseResource) => React.ReactNode }) {
  const { t } = useTranslation(['expenses', 'common']);
  const columns: ColumnDef<VehicleExpenseResource>[] = [
    {
      header: () => t('expenses:attributes.type'),
      accessorKey: 'type',
      cell: ({ row }) => (
        <span>
          {t(`expenses:type_enum.${row.original.type}`, {
            defaultValue: t('expenses:type_enum.other'),
          })}
        </span>
      ),
    },
    {
      header: () => t('expenses:attributes.amount'),
      accessorKey: 'amount',
      cell: ({ row }) => <span>{fmt_currency(row.original.amount)}</span>,
    },
    {
      header: () => t('expenses:attributes.date'),
      accessorKey: 'date',
      cell: ({ row }) => <DateCard date={row.original.date} />,
    },
    {
      header: () => t('expenses:attributes.title'),
      accessorKey: 'title',
      cell: ({ row }) => <p className="max-w-[150px] truncate" title={row.original.title ?? ''}>{row.original.title}</p>,
    },
    {
      header: () => t('expenses:attributes.notes'),
      accessorKey: 'notes',
      cell: ({ row }) => <p className="max-w-[250px] truncate" title={row.original.notes ?? ''}>{row.original.notes}</p>,
    },
    {
      header: () => t('common:actions'),
      accessorKey: 'actions',
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end">
          {actions?.(row.original)}
        </div>
      ),
    },
  ];
  return { columns };
}

export interface VehicleExpenseTableProps {
  data: VehicleExpenseResource[];
  loading?: boolean;
  actions?: (vehicleExpense: VehicleExpenseResource) => React.ReactNode;
}

export function VehicleExpenseTable({
  data,
  loading,
  actions,
}: VehicleExpenseTableProps) {
  const { columns } = useVehicleExpenseTableColumns({ actions });
  return <DataTable data={data} loading={loading} columns={columns} rowId={row => row.id} />;
}
