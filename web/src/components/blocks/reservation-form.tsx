'use no memo';
import type { ReservationData } from '@/features/reservations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ReservationSchema,
} from '@/features/reservations';
import { date_diff_in_days, fmt_date, generate_reservation_number, get_date } from '@/lib/utils';
import { Button } from '../ui/button';
import { DateInput } from '../ui/dateinput';
import { AppFormField, Form } from '../ui/form';
import { Input } from '../ui/input';
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
      reservation_number: generate_reservation_number(),
      customer_id: '',
      vehicle_id: '',
      check_in_date: fmt_date(get_date(), { format: 'date' }),
      check_out_date: fmt_date(get_date({ day: 1 }), { format: 'date' }),
      total_price: 0,
      daily_rate: 300,
      total_days: 1,
      deposit: 0,
      ...initialValues,
    },
  });

  const checkin_date = form.watch('check_in_date');
  const checkout_date = form.watch('check_out_date');
  const daily_rate = form.watch('daily_rate');

  useEffect(() => {
    const number_of_days = date_diff_in_days(checkin_date, checkout_date);
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
          <div className="md:col-span-2">

            <AppFormField
              control={form.control}
              name="reservation_number"
              label={t('reservation:attributes.reservation_number')}
              render={({ field }) => (
                <Input {...field} value={field.value ?? undefined} />
              )}
            />
          </div>
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

          <div className="md:col-span-3">
            <AppFormField
              control={form.control}
              name="deposit"
              label={t('reservation:attributes.deposit')}
              render={({ field }) => (
                <NumberInput value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
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
