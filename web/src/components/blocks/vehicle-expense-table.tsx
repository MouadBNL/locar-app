import type { VehicleExpenseResource } from '@/features/vehicle-expenses';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fmt_currency } from '@/lib/utils';
import { DateCard } from './date-card';

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
  const { t } = useTranslation(['expenses', 'common']);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('expenses:attributes.type')}</TableHead>
          <TableHead>{t('expenses:attributes.amount')}</TableHead>
          <TableHead>{t('expenses:attributes.date')}</TableHead>
          <TableHead>{t('expenses:attributes.title')}</TableHead>
          {/* <TableHead>{t('expenses:attributes.receipt')}</TableHead> */}
          <TableHead>{t('expenses:attributes.notes')}</TableHead>
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
              {t('expenses:no_expenses_found')}
            </TableCell>
          </TableRow>
        )}
        {data
          && data.length > 0
          && data.map(vehicleExpense => (
            <TableRow key={vehicleExpense.id}>
              <TableCell>
                {t(`expenses:type_enum.${vehicleExpense.type}`, {
                  defaultValue: t('expenses:type_enum.other'),
                })}
              </TableCell>
              <TableCell>{fmt_currency(vehicleExpense.amount)}</TableCell>
              <TableCell>
                <DateCard date={vehicleExpense.date} />
              </TableCell>
              <TableCell className="max-w-[150px] truncate" title={vehicleExpense.title}>{vehicleExpense.title}</TableCell>
              {/* <TableCell>{vehicleExpense.receipt_document?.id}</TableCell> */}
              <TableCell className="max-w-[250px] truncate" title={vehicleExpense.notes}>{vehicleExpense.notes}</TableCell>
              {actions && (
                <TableCell className="flex gap-2 justify-end">
                  {actions(vehicleExpense)}
                </TableCell>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
