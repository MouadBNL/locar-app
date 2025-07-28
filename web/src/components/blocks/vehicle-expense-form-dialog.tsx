import type { VehicleExpenseRequest } from '@/features/vehicle-expenses';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { VehicleExpenseForm } from './vehicle-expense-form';

export interface VehicleExpenseFormDialogProps {
  children?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  loading?: boolean;
  submit?: (data: VehicleExpenseRequest) => void;
  initialValues?: Partial<VehicleExpenseRequest>;
}

export function VehicleExpenseFormDialog({
  children,
  open,
  setOpen,
  loading,
  submit,
  initialValues,
}: VehicleExpenseFormDialogProps) {
  const { t } = useTranslation(['expenses', 'common']);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children ?? <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogTitle>{t('expenses:add_expense')}</DialogTitle>
        <DialogDescription>
          {t('expenses:add_expense_description')}
        </DialogDescription>
        <VehicleExpenseForm
          loading={loading}
          submit={submit}
          initialValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
}
