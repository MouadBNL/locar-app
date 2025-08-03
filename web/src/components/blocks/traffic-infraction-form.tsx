import type { TrafficInfractionCreateRequest } from '@/features/traffic-infractions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TrafficInfractionSchema } from '@/features/traffic-infractions';
import { fmt_date, get_date } from '@/lib/utils';
import { Button } from '../ui/button';
import { DateInput } from '../ui/dateinput';
import { AppFormField, Form } from '../ui/form';
import { Input } from '../ui/input';
import { CustomerSelect } from './customer-select';
import { DocumentUpload } from './document-upload';
import { VehicleSelect } from './vehicle-select';

export function TrafficInfractionForm({
  data,
  submit,
}: {
  data: TrafficInfractionCreateRequest;
  submit?: (data: TrafficInfractionCreateRequest) => void;
}) {
  const { t } = useTranslation(['common', 'traffic']);
  const form = useForm({
    resolver: zodResolver(TrafficInfractionSchema),
    defaultValues: {
      date: fmt_date(get_date(), { format: 'date' }),
      ...data,
    },
  });

  const onSubmit = (data: TrafficInfractionCreateRequest) => {
    submit?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <AppFormField
            control={form.control}
            name="date"
            label={t('traffic:attributes.date')}
            render={({ field }) => (
              <DateInput
                {...field}
                value={field.value ?? undefined}
                onChange={value => field.onChange(value ?? undefined)}
                type="string"
              />
            )}
          />
          <AppFormField
            control={form.control}
            name="vehicle_id"
            label={t('traffic:attributes.vehicle')}
            render={({ field }) => <VehicleSelect {...field} value={field.value ?? undefined} />}
          />
          <AppFormField
            control={form.control}
            name="customer_id"
            label={t('traffic:attributes.customer')}
            render={({ field }) => <CustomerSelect {...field} value={field.value ?? undefined} />}
          />
          <AppFormField
            control={form.control}
            name="title"
            label={t('traffic:attributes.title')}
            render={({ field }) => <Input {...field} value={field.value ?? undefined} />}
          />
          <AppFormField
            control={form.control}
            name="location"
            label={t('traffic:attributes.location')}
            render={({ field }) => <Input {...field} value={field.value ?? undefined} />}
          />
          <AppFormField
            control={form.control}
            name="document_id"
            label={t('traffic:attributes.document')}
            render={({ field }) => <DocumentUpload {...field} value={field.value ?? undefined} />}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" loading={form.formState.isSubmitting}>
            {t('common:save')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
