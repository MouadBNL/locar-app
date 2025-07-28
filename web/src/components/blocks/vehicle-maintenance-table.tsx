import type { VehicleMaintenanceResource } from '@/features/vehicle-maintenances';
import { useTranslation } from 'react-i18next';
import { fmt_currency } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { DateCard } from './date-card';

export interface VehicleMaintenanceTableProps {
  data: VehicleMaintenanceResource[];
  loading?: boolean;
  actions?: (vehicleMaintenance: VehicleMaintenanceResource) => React.ReactNode;
}

export function VehicleMaintenanceTable({
  data,
  loading,
  actions,
}: VehicleMaintenanceTableProps) {
  const { t } = useTranslation(['maintenance', 'common']);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('maintenance:attributes.started_at')}</TableHead>
          <TableHead>{t('maintenance:attributes.finished_at')}</TableHead>
          <TableHead>{t('maintenance:attributes.title')}</TableHead>
          <TableHead>{t('maintenance:attributes.reference')}</TableHead>
          <TableHead>{t('maintenance:attributes.notes')}</TableHead>
          <TableHead>{t('maintenance:attributes.expenses')}</TableHead>
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
              {t('maintenance:no_maintenances_found')}
            </TableCell>
          </TableRow>
        )}
        {data
          && data.length > 0
          && data.map(vehicleMaintenance => (
            <TableRow key={vehicleMaintenance.id}>
              <TableCell>
                <DateCard date={vehicleMaintenance.started_at} />
              </TableCell>
              <TableCell>
                {vehicleMaintenance.finished_at && (
                  <DateCard date={vehicleMaintenance.finished_at} />
                )}
              </TableCell>
              <TableCell>{vehicleMaintenance.title}</TableCell>
              <TableCell>{vehicleMaintenance.reference}</TableCell>
              <TableCell>{vehicleMaintenance.notes}</TableCell>
              <TableCell>
                <div className="">
                  <p className="text-sm font-bold">
                    {fmt_currency(vehicleMaintenance.expenses_sum ?? 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {vehicleMaintenance.expenses_count}
                    {' '}
                    {t('maintenance:expenses')}
                  </p>
                </div>
              </TableCell>
              {actions && (
                <TableCell className="flex gap-2">
                  {actions(vehicleMaintenance)}
                </TableCell>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
