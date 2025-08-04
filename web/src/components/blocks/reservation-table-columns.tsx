import type { ColumnDef } from '@tanstack/react-table';
import type { ReservationResource } from '@/features/reservations';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { CustomerTableCard } from './customer-table-card';
import { DateCard } from './date-card';
import { VehicleTableCard } from './vehicle-table-card';

export function useReservationTableColumns({ actions }: { actions?: (reservation: ReservationResource) => React.ReactNode }) {
  const { t } = useTranslation(['common', 'reservation']);

  const columns: ColumnDef<ReservationResource>[] = [
    {
      header: () => t('common:reservations'),
      accessorKey: 'reservation_number',
      cell: ({ row }) => (
        <Link to="/app/reservations/$number" params={{ number: row.original.reservation_number }} className="hover:underline">
          {row.original.reservation_number}
        </Link>
      ),
    },
    {
      header: () => t('reservation:attributes.customer'),
      accessorKey: 'customer.full_name',
      cell: ({ row }) => (
        <CustomerTableCard
          id={row.original.customer_id}
          fullName={row.original.customer.full_name}
          identifier={row.original.customer.identifier}
          phone={row.original.customer.phone}
        />
      ),
    },
    {
      header: () => t('reservation:attributes.vehicle'),
      accessorKey: 'vehicle.make',
      cell: ({ row }) => (
        <VehicleTableCard
          id={row.original.vehicle_id}
          make={row.original.vehicle.make}
          model={row.original.vehicle.model}
          year={row.original.vehicle.year}
          license_plate={row.original.vehicle.license_plate}
        />
      ),
    },
    {
      header: () => t('reservation:attributes.check_in_date'),
      accessorKey: 'check_in_date',
      cell: ({ row }) => <DateCard date={row.original.check_in_date} />,
    },
    {
      header: () => t('reservation:attributes.check_out_date'),
      accessorKey: 'check_out_date',
      cell: ({ row }) => <DateCard date={row.original.check_out_date} />,
    },
    {
      header: () => t('reservation:attributes.total_price'),
      accessorKey: 'total_price',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium -mb-1">
            {row.original.total_price}
            {' '}
            {t('common:dh')}
          </span>
          <span className="text-sm text-muted-foreground">
            {row.original.total_days}
            {' '}
            {t('common:days')}
          </span>
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
