import type { RentalPaymentResource } from '@/features/rental-payments';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fmt_currency, str_to_titlecase } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { DateCard } from './date-card';

export function RentalPaymentTable({
  payments,
  actions,
  loading,
}: {
  payments: RentalPaymentResource[];
  actions?: (payment: RentalPaymentResource) => React.ReactNode;
  loading?: boolean;
}) {
  const { t } = useTranslation(['payment', 'common']);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('payment:attributes.method')}</TableHead>
          <TableHead>{t('payment:attributes.type')}</TableHead>
          <TableHead>{t('payment:attributes.amount')}</TableHead>
          <TableHead>{t('payment:attributes.date')}</TableHead>
          <TableHead>{t('payment:attributes.reference')}</TableHead>
          <TableHead>{t('payment:attributes.notes')}</TableHead>
          <TableHead>{t('common:actions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center bg-background animate-pulse"
                >
                  <Loader2 className="animate-spin" />
                </TableCell>
              </TableRow>
            )
          : (
              <>
                {payments.map(payment => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      {t(`payment:method_enum.${payment.method}`, {
                        defaultValue: str_to_titlecase(payment.method),
                      })}
                    </TableCell>
                    <TableCell>
                      {t(`payment:type_enum.${payment.type}`, {
                        defaultValue: str_to_titlecase(payment.type),
                      })}
                    </TableCell>
                    <TableCell>{fmt_currency(payment.amount)}</TableCell>
                    <TableCell>
                      <DateCard date={payment.date} />
                    </TableCell>
                    <TableCell>{payment.reference}</TableCell>
                    <TableCell>{payment.notes}</TableCell>
                    <TableCell>{actions?.(payment)}</TableCell>
                  </TableRow>
                ))}
              </>
            )}
      </TableBody>
    </Table>
  );
}
