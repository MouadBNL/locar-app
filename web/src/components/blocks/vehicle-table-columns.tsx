import type { ColumnDef } from '@tanstack/react-table';
import type { VehicleResource } from '@/features/vehicles';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { VehicleLicensePlateBadge } from './vehicle-license-plate-badge';
import { VehicleStatusBadge } from './vehicle-status-badge';

export function useVehicleTableColumns({ actions }: { actions?: (vehicle: VehicleResource) => React.ReactNode }) {
  const { t } = useTranslation(['vehicle', 'common']);
  const columns: ColumnDef<VehicleResource>[] = [
    {
      header: () => (
        <>
          {t('vehicle:attributes.model')}
          {' '}
          {t('common:and')}
          {' '}
          {t('vehicle:attributes.make')}
        </>
      ),
      accessorKey: 'model',
      cell: ({ row }) => (
        <Link to="/app/vehicles/$id" params={{ id: row.original.id }} className="hover:underline">
          {row.original.make}
          {' '}
          {row.original.model}
        </Link>
      ),
    },
    {
      header: () => t('vehicle:attributes.plate'),
      accessorKey: 'license_plate',
      cell: ({ row }) => <VehicleLicensePlateBadge>{row.original.license_plate}</VehicleLicensePlateBadge>,
    },
    {
      header: () => t('vehicle:attributes.year'),
      accessorKey: 'year',
      cell: ({ row }) => <span>{row.original.year}</span>,
    },
    {
      header: () => t('vehicle:attributes.status'),
      accessorKey: 'status',
      cell: ({ row }) => <VehicleStatusBadge status={row.original.status} />,
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
