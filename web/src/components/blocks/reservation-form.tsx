import type { ReservationData } from '@/features/reservations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ReservationSchema,
} from '@/features/reservations';
import { fmt_date, get_date } from '@/lib/utils';
import { Button } from '../ui/button';
import { DateInput } from '../ui/dateinput';
import { AppFormField, Form } from '../ui/form';
import { NumberInput } from '../ui/number-input';
import { Textarea } from '../ui/textarea';
import { CustomerSelect } from './customer-select';
import { VehicleSelect } from './vehicle-select';

export interface ReservationFormProps {
  initialValues?: Partial<ReservationData>;
  loading?: boolean;
  submit?: (data: ReservationData) => void;
}
export default function ReservationForm({
  initialValues,
  loading,
  submit,
}: ReservationFormProps) {
  const { t } = useTranslation(['reservation', 'common']);
  const form = useForm({
    resolver: zodResolver(ReservationSchema),
    defaultValues: {
      customer_id: '',
      vehicle_id: '',
      check_in_date: fmt_date(get_date(), { format: 'date' }),
      check_out_date: fmt_date(get_date({ day: 1 }), { format: 'date' }),
      total_price: 0,
      daily_rate: 300,
      total_days: 1,
      ...initialValues,
    },
  });

  const checkin_date = form.watch('check_in_date');
  const checkout_date = form.watch('check_out_date');
  const daily_rate = form.watch('daily_rate');

  function dateDiffInDays(a?: string | null, b?: string | null) {
    if (!a || !b)
      return 0;
    const dateA = new Date(a);
    const dateB = new Date(b);
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(
      dateA.getFullYear(),
      dateA.getMonth(),
      dateA.getDate(),
    );
    const utc2 = Date.UTC(
      dateB.getFullYear(),
      dateB.getMonth(),
      dateB.getDate(),
    );

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  useEffect(() => {
    const number_of_days = dateDiffInDays(checkin_date, checkout_date);
    const total_price = number_of_days * (daily_rate ?? 0);
    form.setValue('total_days', number_of_days);
    form.setValue('total_price', total_price);
  }, [checkin_date, checkout_date, daily_rate, form]);

  const onSubmit = (data: ReservationData) => {
    submit?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AppFormField
            control={form.control}
            name="vehicle_id"
            label={t('reservation:attributes.vehicle')}
            render={({ field }) => (
              <VehicleSelect
                onValueChange={field.onChange}
                value={field.value}
              />
            )}
          />

          <AppFormField
            control={form.control}
            name="customer_id"
            label={t('reservation:attributes.customer')}
            render={({ field }) => (
              <CustomerSelect
                onValueChange={field.onChange}
                value={field.value}
              />
            )}
          />

          <AppFormField
            control={form.control}
            name="check_in_date"
            label={t('reservation:attributes.check_in_date')}
            render={({ field }) => (
              <DateInput
                {...field}
                type="string"
                value={field.value ?? undefined}
                onChange={value => field.onChange(value)}
              />
            )}
          />

          <AppFormField
            control={form.control}
            name="check_out_date"
            label={t('reservation:attributes.check_out_date')}
            render={({ field }) => (
              <DateInput
                {...field}
                type="string"
                value={field.value ?? undefined}
                onChange={value => field.onChange(value)}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AppFormField
            control={form.control}
            name="daily_rate"
            label={t('reservation:attributes.daily_rate')}
            render={({ field }) => (
              <NumberInput value={field.value} onChange={field.onChange} />
            )}
          />

          <AppFormField
            control={form.control}
            name="total_days"
            label={t('reservation:attributes.total_days')}
            render={({ field }) => (
              <NumberInput value={field.value} onChange={field.onChange} disabled />
            )}
          />

          <AppFormField
            control={form.control}
            name="total_price"
            label={t('reservation:attributes.total_price')}
            render={({ field }) => (
              <NumberInput
                value={field.value}
                onChange={field.onChange}
                disabled
              />
            )}
          />
        </div>

        <div>
          <AppFormField
            control={form.control}
            name="notes"
            label={t('reservation:attributes.notes')}
            render={({ field }) => (
              <Textarea {...field} value={field.value ?? undefined} />
            )}
          />
        </div>

        <Button type="submit" loading={loading}>
          {t('common:submit')}
        </Button>
      </form>
    </Form>
  );
}
