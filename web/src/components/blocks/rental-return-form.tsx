import type { RentalReturnData } from '@/features/rentals';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RentalReturnSchema } from '@/features/rentals';
import { fmt_date, get_date } from '@/lib/utils';
import { Button } from '../ui/button';
import { DateTimeInput } from '../ui/datetime-input';
import { AppFormField, Form } from '../ui/form';
import { NumberInput } from '../ui/number-input';

export function RentalReturnForm({
  initialValues,
  loading,
  submit,
}: {
  initialValues?: Partial<RentalReturnData>;
  loading?: boolean;
  submit: (data: RentalReturnData) => void;
}) {
  const { t } = useTranslation(['rental', 'common']);
  const form = useForm({
    resolver: zodResolver(RentalReturnSchema),
    defaultValues: {
      actual_return_date: fmt_date(get_date(), { format: 'datetime' }),
      mileage: 0,
      ...initialValues,
    },
  });

  function onSubmit(data: RentalReturnData) {
    submit?.(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AppFormField
          control={form.control}
          name="actual_return_date"
          label={t('rental:return_form.attributes.actual_return_date')}
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
