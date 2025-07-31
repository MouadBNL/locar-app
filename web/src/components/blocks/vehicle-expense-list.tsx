import type { VehicleExpenseResource } from '@/features/vehicle-expenses';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  useVehicleExpenseIndex,
} from '@/features/vehicle-expenses';
import { fmt_currency } from '@/lib/utils';
import { Button } from '../ui/button';

export interface VehicleExpenseListProps {
  vehicleId: string;
  value: string[];
  onValueChange?: (value: string[]) => void;
  onAddExpense?: () => void;
  onEditExpense?: (expense: VehicleExpenseResource) => void;
  onDeleteExpense?: (expense: VehicleExpenseResource) => void;
}

export function VehicleExpenseList({
  vehicleId,
  value,
  onAddExpense,
  onEditExpense,
  onDeleteExpense,
}: VehicleExpenseListProps) {
  const { t } = useTranslation(['expenses', 'common']);
  const { data: expenses, isLoading } = useVehicleExpenseIndex({
    vehicleId,
    ids: value,
  });

  return (
    <div className="mt-2">
      <div className="flex gap-2 justify-between items-center">
        <div>
          <p className="text-base font-bold">
            {t('expenses:total')}
            {' '}
            {fmt_currency(
              expenses?.data?.reduce(
                (acc, expense) => acc + expense.amount,
                0,
              ) ?? 0,
            )}
          </p>
          <p className="text-sm text-muted-foreground">
            {expenses?.data?.length}
            {' '}
            {t('expenses:label_plural')}
          </p>
        </div>

        <Button variant="outline" onClick={onAddExpense}>
          <PlusIcon />
          {t('expenses:add_expense')}
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-2 mt-6">
        {isLoading && <div>{t('common:loading')}</div>}
        {expenses?.data?.map(expense => (
          <div
            key={expense.id}
            className="flex items-center justify-between gap-2 p-2 bg-muted/50 rounded-md"
          >
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">
                {expense.title}
                {' '}
                {t(`expenses:type_enum.${expense.type}`, {
                  defaultValue: t('expenses:type_enum.other'),
                })}
              </div>
              <div className="text-sm text-muted-foreground">
                {fmt_currency(expense.amount)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onEditExpense?.(expense);
                }}
              >
                <PencilIcon />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  onDeleteExpense?.(expense);
                }}
              >
                <TrashIcon />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
