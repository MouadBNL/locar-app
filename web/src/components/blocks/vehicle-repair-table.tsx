import type { VehicleRepairResource } from '@/features/vehicle-repairs';
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
  const { t } = useTranslation(['repair', 'common']);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('repair:attributes.started_at')}</TableHead>
          <TableHead>{t('repair:attributes.finished_at')}</TableHead>
          <TableHead>{t('repair:attributes.title')}</TableHead>
          {/* <TableHead>{t('repair:attributes.reference')}</TableHead> */}
          <TableHead>{t('repair:attributes.notes')}</TableHead>
          <TableHead>{t('repair:attributes.expenses')}</TableHead>
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
              {t('repair:no_repairs_found')}
            </TableCell>
          </TableRow>
        )}
        {data
          && data.length > 0
          && data.map(vehicleRepair => (
            <TableRow key={vehicleRepair.id}>
              <TableCell>
                <DateCard date={vehicleRepair.started_at} />
              </TableCell>
              <TableCell>
                {vehicleRepair.finished_at && (
                  <DateCard date={vehicleRepair.finished_at} />
                )}
              </TableCell>
              <TableCell className="max-w-[150px] truncate" title={vehicleRepair.title ?? ''}>{vehicleRepair.title}</TableCell>
              {/* <TableCell>{vehicleRepair.reference}</TableCell> */}
              <TableCell className="max-w-[250px] truncate" title={vehicleRepair.notes ?? ''}>{vehicleRepair.notes}</TableCell>
              <TableCell>
                <div className="">
                  <p className="text-sm font-bold">
                    {fmt_currency(vehicleRepair.expenses_sum ?? 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {vehicleRepair.expenses_count}
                    {' '}
                    {t('repair:expenses')}
                  </p>
                </div>
              </TableCell>
              {actions && (
                <TableCell className="flex gap-2 justify-end">
                  {actions(vehicleRepair)}
                </TableCell>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
