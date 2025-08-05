import type { ColumnDef } from '@tanstack/react-table';
import type { RentalSummaryData } from '@/features/rentals';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { fmt_currency } from '@/lib/utils';
import { CustomerTableCard } from './customer-table-card';
import { DateCard } from './date-card';
import { RentalStatusBadge } from './rental-status-badge';
import { VehicleTableCard } from './vehicle-table-card';

export function useRentalTableColumns({ actions }: { actions?: (rental: RentalSummaryData) => React.ReactNode }) {
  const { t } = useTranslation(['rental', 'common']);

  const columns: ColumnDef<RentalSummaryData>[] = [
    {
      id: 'code',
      accessorKey: 'rental_number',
      header: () => t('rental:attributes.code'),
      cell(props) {
        return (
          <Link to="/app/rentals/$id" params={{ id: props.row.original.rental_number }} className="hover:underline">
            {props.row.original.rental_number}
          </Link>
        );
      },
    },
    {
      id: 'customer',
      accessorKey: 'customer.full_name',
      header: () => t('rental:attributes.customer'),
      cell(props) {
        return (
          <CustomerTableCard
            id={props.row.original.customer.id}
            fullName={props.row.original.customer.full_name}
            identifier={props.row.original.customer.identifier}
            phone={props.row.original.customer.phone}
          />
        );
      },
    },
    {
      id: 'vehicle',
      accessorKey: 'vehicle.make',
      header: () => t('rental:attributes.vehicle'),
      cell(props) {
        return (
          <VehicleTableCard
            id={props.row.original.vehicle.id}
            make={props.row.original.vehicle.make}
            model={props.row.original.vehicle.model}
            year={props.row.original.vehicle.year}
            license_plate={props.row.original.vehicle.license_plate}
          />
        );
      },
    },
    {
      id: 'pickup_date',
      accessorKey: 'departure_date',
      header: () => t('rental:attributes.pickup_date'),
      cell(props) {
        return (
          <DateCard date={props.row.original.departure_date} />
        );
      },
    },
    {
      id: 'dropoff_date',
      accessorKey: 'return_date',
      header: () => t('rental:attributes.dropoff_date'),
      cell(props) {
        return (
          <DateCard date={props.row.original.return_date} />
        );
      },
    },
    {
      id: 'total_price',
      accessorKey: 'total_price',
      header: () => t('rental:attributes.total_price'),
      cell(props) {
        return (
          <div className="text-right">{fmt_currency(props.row.original.total_price)}</div>
        );
      },
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: () => t('rental:attributes.status'),
      cell(props) {
        return (
          <RentalStatusBadge status={props.row.original.status ?? 'draft'} />
        );
      },
    },
    {
      id: 'actions',
      accessorKey: 'actions',
      header: () => t('common:actions'),
      cell(props) {
        return actions?.(props.row.original);
      },
    },
  ];

  return columns;
}
