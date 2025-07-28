import type { RentalPaymentData } from '@/features/rental-payments';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {

  RentalPaymentSchema,
} from '@/features/rental-payments';
import { fmt_date, get_date } from '@/lib/utils';
import { Button } from '../ui/button';
import { DateTimeInput } from '../ui/datetime-input';
import { AppFormField, Form } from '../ui/form';
import { Input } from '../ui/input';
import { NumberInput } from '../ui/number-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

export function RentalPaymentForm({
  initialValues,
  submit,
  loading,
}: {
  initialValues?: Partial<RentalPaymentData>;
  submit: (data: RentalPaymentData) => void;
  loading?: boolean;
}) {
  const { t } = useTranslation(['payment', 'common']);
  const form = useForm({
    resolver: zodResolver(RentalPaymentSchema),
    defaultValues: {
      method: 'cash',
      type: 'normal',
      amount: 0,
      date: fmt_date(get_date(), { format: 'datetime' }),
      ...initialValues,
    },
  });

  const onSubmit = (data: RentalPaymentData) => {
    submit?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AppFormField
          control={form.control}
          name="method"
          label={t('payment:attributes.method')}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">{t('payment:method_enum.cash')}</SelectItem>
                <SelectItem value="card">{t('payment:method_enum.card')}</SelectItem>
                <SelectItem value="bank_transfer">{t('payment:method_enum.bank_transfer')}</SelectItem>
                <SelectItem value="cheque">{t('payment:method_enum.cheque')}</SelectItem>
                <SelectItem value="other">{t('payment:method_enum.other')}</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <AppFormField
          control={form.control}
          name="type"
          label={t('payment:attributes.type')}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a payment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('payment:type_enum.normal')}</SelectItem>
                <SelectItem value="deposit">{t('payment:type_enum.deposit')}</SelectItem>
                <SelectItem value="refund">{t('payment:type_enum.refund')}</SelectItem>
                <SelectItem value="other">{t('payment:type_enum.other')}</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <AppFormField
          control={form.control}
          name="amount"
          label={t('payment:attributes.amount')}
          render={({ field }) => <NumberInput value={field.value} onChange={field.onChange} placeholder="Amount" />}
        />
        <AppFormField
          control={form.control}
          name="date"
          label={t('payment:attributes.date')}
          render={({ field }) => <DateTimeInput type="string" {...field} />}
        />
        <AppFormField
          control={form.control}
          name="reference"
          label={t('payment:attributes.reference')}
          render={({ field }) => <Input {...field} value={field.value ?? ''} />}
        />
        <AppFormField
          control={form.control}
          name="notes"
          label={t('payment:attributes.notes')}
          render={({ field }) => (
            <Textarea {...field} value={field.value ?? ''} />
          )}
        />
        <Button type="submit" loading={loading}>
          {t('common:submit')}
        </Button>
      </form>
    </Form>
  );
}
