import type { ColumnDef } from '@tanstack/react-table';
import type { TrafficInfractionResource } from '@/features/traffic-infractions';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { CustomerTableCard } from './customer-table-card';
import { DataTable } from './datatable';
import { DateCard } from './date-card';
import { VehicleTableCard } from './vehicle-table-card';

function useTrafficInfractionTableColumns({ actions }: { actions?: (trafficInfraction: TrafficInfractionResource) => React.ReactNode }) {
  const { t } = useTranslation(['common', 'traffic']);
  const columns: ColumnDef<TrafficInfractionResource>[] = [
    {
      header: () => t('traffic:attributes.date'),
      accessorKey: 'date',
      cell: ({ row }) => (
        <>
          {row.original.date && <DateCard date={row.original.date} />}
        </>
      ),
    },
    {
      header: () => t('traffic:attributes.rental'),
      accessorKey: 'rental',
      cell: ({ row }) => (
        <>
          {row.original.rental && (
            <Link to="/app/rentals/$id" params={{ id: row.original.rental.rental_number }} className="text-sm hover:underline">
              {row.original.rental.rental_number}
            </Link>
          )}
        </>
      ),
    },
    {
      header: () => t('traffic:attributes.customer'),
      accessorKey: 'customer',
      cell: ({ row }) => (
        <>
          {row.original.customer && (
            <CustomerTableCard
              id={row.original.customer_id ?? ''}
              fullName={row.original.customer.full_name}
              identifier={row.original.customer.identifier}
              phone={row.original.customer.phone}
            />
          )}
        </>
      ),
    },
    {
      header: () => t('traffic:attributes.vehicle'),
      accessorKey: 'vehicle',
      cell: ({ row }) => (
        <>
          {row.original.vehicle && (
            <VehicleTableCard id={row.original.vehicle_id ?? ''} make={row.original.vehicle.make} model={row.original.vehicle.model} year={row.original.vehicle.year} license_plate={row.original.vehicle.license_plate} />
          )}
        </>
      ),
    },
    {
      header: () => t('traffic:attributes.title'),
      accessorKey: 'title',
      cell: ({ row }) => <p className="max-w-[150px] truncate" title={row.original.title ?? ''}>{row.original.title}</p>,
    },
    {
      header: () => t('traffic:attributes.location'),
      accessorKey: 'location',
      cell: ({ row }) => <p className="max-w-[150px] truncate" title={row.original.location ?? ''}>{row.original.location}</p>,
    },
    {
      header: () => t('traffic:attributes.document'),
      accessorKey: 'document',
      cell: ({ row }) => (
        <>
          {row.original.document && <p>{row.original.document.filename}</p>}
        </>
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

export function TrafficInfractionTable({
  data,
  loading,
  actions,
}: {
  data: TrafficInfractionResource[];
  loading?: boolean;
  actions?: (trafficInfraction: TrafficInfractionResource) => React.ReactNode;
}) {
  const { columns } = useTrafficInfractionTableColumns({ actions });

  return <DataTable data={data} loading={loading} columns={columns} rowId={row => row.id!} />;
}
