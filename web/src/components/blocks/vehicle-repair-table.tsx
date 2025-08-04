import type { ColumnDef } from '@tanstack/react-table';
import type { VehicleRepairResource } from '@/features/vehicle-repairs';
import { useTranslation } from 'react-i18next';
import { fmt_currency } from '@/lib/utils';

import { DataTable } from './datatable';
import { DateCard } from './date-card';

function useVehicleRepairTableColumns({ actions }: { actions?: (vehicleRepair: VehicleRepairResource) => React.ReactNode }) {
  const { t } = useTranslation(['repair', 'common']);
  const columns: ColumnDef<VehicleRepairResource>[] = [
    {
      header: () => t('repair:attributes.started_at'),
      accessorKey: 'started_at',
      cell: ({ row }) => <DateCard date={row.original.started_at} />,
    },
    {
      header: () => t('repair:attributes.finished_at'),
      accessorKey: 'finished_at',
      cell: ({ row }) => (
        <>
          {row.original.finished_at && <DateCard date={row.original.finished_at} />}
        </>
      ),
    },
    {
      header: () => t('repair:attributes.title'),
      accessorKey: 'title',
      cell: ({ row }) => <p className="max-w-[150px] truncate" title={row.original.title ?? ''}>{row.original.title}</p>,
    },
    {
      header: () => t('repair:attributes.notes'),
      accessorKey: 'notes',
      cell: ({ row }) => <p className="max-w-[250px] truncate" title={row.original.notes ?? ''}>{row.original.notes}</p>,
    },
    {
      header: () => t('repair:attributes.expenses'),
      accessorKey: 'expenses_sum',
      cell: ({ row }) => (
        <div className="">
          <p className="text-sm font-bold">
            {fmt_currency(row.original.expenses_sum ?? 0)}
          </p>
        </div>
      ),
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

export interface VehicleRepairTableProps {
  data: VehicleRepairResource[];
  loading?: boolean;
  actions?: (vehicleRepair: VehicleRepairResource) => React.ReactNode;
}

export function VehicleRepairTable({
  data,
  loading,
  actions,
}: VehicleRepairTableProps) {
  const { columns } = useVehicleRepairTableColumns({ actions });
  return <DataTable data={data} loading={loading} columns={columns} rowId={row => row.id} />;
}
