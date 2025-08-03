import type { VehicleExpenseRequest } from '@/features/vehicle-expenses';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {

  vehicleExpenseSchema,
  VehicleExpenseTypeEnum,
} from '@/features/vehicle-expenses';
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
import { DocumentUpload } from './document-upload';

export interface VehicleExpenseFormProps {
  initialValues?: Partial<VehicleExpenseRequest>;
  loading?: boolean;
  submit?: (data: VehicleExpenseRequest) => void;
}

export function VehicleExpenseForm({
  initialValues,
  loading,
  submit,
}: VehicleExpenseFormProps) {
  const { t } = useTranslation(['expenses', 'common']);
  const form = useForm({
    resolver: zodResolver(vehicleExpenseSchema),
    defaultValues: {
      type: 'fuel',
      amount: 0,
      date: fmt_date(get_date()),
      title: '',
      reference: '',
      receipt_document_id: '',
      notes: '',
      ...initialValues,
    },
  });

  const onSubmit = (data: VehicleExpenseRequest) => {
    submit?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AppFormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('expenses:attributes.type')} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(VehicleExpenseTypeEnum).map(([key]) => (
                  <SelectItem key={key} value={key}>
                    {t(`expenses:type_enum.${key as keyof typeof VehicleExpenseTypeEnum}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <AppFormField
          control={form.control}
          name="amount"
          render={({ field }) => <NumberInput value={field.value ?? undefined} onChange={field.onChange} />}
        />

        <AppFormField
          control={form.control}
          name="date"
          render={({ field }) => <DateTimeInput {...field} type="string" />}
        />

        <AppFormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <Input {...field} placeholder={t('expenses:attributes.title')} value={field.value ?? ''} />
          )}
        />
        {/*
        <AppFormField
          control={form.control}
          name="reference"
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t('expenses:attributes.reference')}
              value={field.value ?? ''}
            />
          )}
        /> */}

        <AppFormField
          control={form.control}
          label={t('expenses:attributes.receipt')}
          name="receipt_document_id"
          render={({ field }) => <DocumentUpload {...field} />}
        />

        <AppFormField
          control={form.control}
          label={t('expenses:attributes.notes')}
          name="notes"
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder={t('expenses:attributes.notes')}
              value={field.value ?? ''}
            />
          )}
        />

        <Button type="submit" loading={loading}>
          {t('common:submit')}
        </Button>
      </form>
    </Form>
  );
}
