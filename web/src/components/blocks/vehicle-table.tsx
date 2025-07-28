import type { VehicleResource } from '@/features/vehicles';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
          <TableHead>{t('vehicle:attributes.plate')}</TableHead>
          <TableHead>{t('vehicle:attributes.model')}</TableHead>
          <TableHead>{t('vehicle:attributes.year')}</TableHead>
          <TableHead>{t('vehicle:attributes.status')}</TableHead>
          {actions && <TableHead>{t('common:actions')}</TableHead>}
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
              <TableCell>{vehicle.license_plate}</TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{vehicle.year}</TableCell>
              <TableCell>
                <VehicleStatusBadge status={vehicle.status} />
              </TableCell>
              {actions && (
                <TableCell className="flex gap-2">{actions(vehicle)}</TableCell>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
