import type { RentalStartData } from '@/features/rentals';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RentalStartSchema } from '@/features/rentals';
import { fmt_date, get_date } from '@/lib/utils';
import { Button } from '../ui/button';
import { DateTimeInput } from '../ui/datetime-input';
import { AppFormField, Form } from '../ui/form';
import { NumberInput } from '../ui/number-input';

export function RentalStartForm({
  initialValues,
  loading,
  submit,
}: {
  initialValues?: Partial<RentalStartData>;
  loading?: boolean;
  submit: (data: RentalStartData) => void;
}) {
  const { t } = useTranslation(['rental', 'common']);
  const form = useForm({
    resolver: zodResolver(RentalStartSchema),
    defaultValues: {
      actual_departure_date: fmt_date(get_date(), { format: 'datetime' }),
      mileage: 0,
      ...initialValues,
    },
  });

  function onSubmit(data: RentalStartData) {
    submit?.(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AppFormField
          control={form.control}
          name="actual_departure_date"
          label={t('rental:start_form.attributes.actual_departure_date')}
          render={({ field }) => <DateTimeInput type="string" {...field} />}
        />

        <AppFormField
          control={form.control}
          name="mileage"
          label={t('common:mileage')}
          render={({ field }) => (
            <NumberInput value={field.value ?? undefined} onChange={field.onChange} />
          )}
        />

        <Button type="submit" loading={loading}>
          {t('common:submit')}
        </Button>
      </form>
    </Form>
  );
}
