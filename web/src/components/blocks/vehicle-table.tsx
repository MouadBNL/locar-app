import type { VehicleResource } from '@/features/vehicles';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { VehicleLicensePlateBadge } from './vehicle-license-plate-badge';
import { VehicleStatusBadge } from './vehicle-status-badge';

export interface VehicleTableProps {
  data: VehicleResource[];
  loading?: boolean;
  actions?: (vehicle: VehicleResource) => React.ReactNode;
}

export function VehicleTable({ data, loading, actions }: VehicleTableProps) {
  const { t } = useTranslation(['vehicle', 'common']);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            {t('vehicle:attributes.model')}
            {' '}
            {t('common:and')}
            {' '}
            {t('vehicle:attributes.make')}
          </TableHead>
          <TableHead>{t('vehicle:attributes.plate')}</TableHead>
          <TableHead>{t('vehicle:attributes.year')}</TableHead>
          <TableHead>{t('vehicle:attributes.status')}</TableHead>
          {actions && <TableHead className="text-right">{t('common:actions')}</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          && [1, 2, 3].map(i => (
            <TableRow key={i}>
              <TableCell colSpan={5} className="text-center">
                <div className="w-full animate-pulse bg-muted h-8 rounded-md"></div>
              </TableCell>
            </TableRow>
          ))}
        {data && data.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              {t('vehicle:no_vehicles_found')}
            </TableCell>
          </TableRow>
        )}
        {data
          && data.length > 0
          && data.map(vehicle => (
            <TableRow key={vehicle.id}>
              <TableCell>
                <Link to="/app/vehicles/$id" params={{ id: vehicle.id! }} className="hover:underline">
                  {vehicle.make}
                  {' '}
                  {vehicle.model}
                </Link>
              </TableCell>
              <TableCell>
                <VehicleLicensePlateBadge>
                  {vehicle.license_plate}
                </VehicleLicensePlateBadge>
              </TableCell>
              <TableCell>{vehicle.year}</TableCell>
              <TableCell>
                <VehicleStatusBadge status={vehicle.status} />
              </TableCell>
              {actions && (
                <TableCell className="flex gap-2 justify-end">{actions(vehicle)}</TableCell>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
