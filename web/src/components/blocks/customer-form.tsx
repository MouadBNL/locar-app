import type { CustomerData } from '@/features/customers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CustomerSchema } from '@/features/customers';
import { Button } from '../ui/button';
import { DateInput } from '../ui/dateinput';
import { AppFormField, Form } from '../ui/form';
import { Input } from '../ui/input';

export interface CustomerFormProps {
  initialValues?: Partial<CustomerData>;
  loading?: boolean;
  submit?: (data: CustomerData) => void;
}
export default function CustomerForm({
  initialValues,
  loading,
  submit,
}: CustomerFormProps) {
  const { t } = useTranslation(['customer', 'common']);
  const form = useForm({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      first_name: 'john',
      last_name: 'doe',
      email: '',
      phone: '060807040201',
      id_card_number: 'AA456789',
      driver_license_number: 'BB98765',
      passport_number: 'XX123456',
      id_card_address: 'test id card address',
      driver_license_address: 'test driver license address',
      passport_address: 'test passport address',
      ...initialValues,
    },
  });
  console.log(initialValues)

  const onSubmit = (data: CustomerData) => {
    submit?.(data);
    console.log('Submitted data:', data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit(onSubmit)(e);
        }}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <AppFormField
            control={form.control}
            name="first_name"
            label={t('customer:attributes.first_name')}
            render={({ field }) => (
              <Input type="text" placeholder={t('customer:attributes.first_name')} {...field} />
            )}
          />

          <AppFormField
            control={form.control}
            name="last_name"
            label={t('customer:attributes.last_name')}
            render={({ field }) => (
              <Input type="text" placeholder={t('customer:attributes.last_name')} {...field} />
            )}
          />

          <AppFormField
            control={form.control}
            name="phone"
            label={t('customer:attributes.phone')}
            render={({ field }) => (
              <Input
                type="text"
                placeholder={t('customer:attributes.phone')}
                {...field}
                value={field.value ?? ''}
              />
            )}
          />

          <AppFormField
            control={form.control}
            name="birth_date"
            label={t('customer:attributes.birth_date')}
            render={({ field }) => (
              <DateInput
                {...field}
                value={field.value ?? undefined}
                onChange={value => field.onChange(value)}
                type="string"
              />
            )}
          />

          <AppFormField
            control={form.control}
            name="id_card_number"
            label={t('customer:attributes.id_card_number')}
            render={({ field }) => (
              <Input
                type="text"
                placeholder={t('customer:attributes.id_card_number')}
                {...field}
                value={field.value ?? ''}
              />
            )}
          />


          <AppFormField
            control={form.control}
            name="id_card_issuing_date"
            label={t('customer:attributes.id_card_issuing_date')}
            render={({ field }) => (
              <DateInput {...field} value={field.value ?? undefined} type="string" />
            )}
          />

          <AppFormField
            control={form.control}
            name="id_card_expiration_date"
            label={t('customer:attributes.id_card_expiration_date')}
            render={({ field }) => (
              <DateInput {...field} value={field.value ?? undefined} type="string" />
            )}
          />

          <AppFormField
            control={form.control}
            name="id_card_address"
            label={t('customer:attributes.id_card_address')}
            render={({ field }) => (
              <Input
                type="text"
                placeholder={t('customer:attributes.id_card_address')}
                {...field}
                value={field.value ?? ''}
              />
            )}
          />

          <AppFormField
            control={form.control}
            name="driver_license_number"
            label={t('customer:attributes.driver_license_number')}
            render={({ field }) => (
              <Input
                type="text"
                placeholder={t('customer:attributes.driver_license_number')}
                {...field}
                value={field.value ?? ''}
              />
            )}
          />

          <AppFormField
            control={form.control}
            name="driver_license_issuing_date"
            label={t('customer:attributes.driver_license_issuing_date')}
            render={({ field }) => (
              <DateInput {...field} value={field.value ?? undefined} type="string" />
            )}
          />

          <AppFormField
            control={form.control}
            name="driver_license_expiration_date"
            label={t('customer:attributes.driver_license_expiration_date')}
            render={({ field }) => (
              <DateInput {...field} value={field.value ?? undefined} type="string" />
            )}
          />

          <AppFormField
            control={form.control}
            name="driver_license_address"
            label={t('customer:attributes.driver_license_address')}
            render={({ field }) => (
              <Input
                type="text"
                placeholder={t('customer:attributes.driver_license_address')}
                {...field}
                value={field.value ?? ''}
              />
            )}
          />

          <AppFormField
            control={form.control}
            name="passport_number"
            label={t('customer:attributes.passport_number')}
            render={({ field }) => (
              <Input
                type="text"
                placeholder={t('customer:attributes.passport_number')}
                {...field}
                value={field.value ?? ''}
              />
            )}
          />

          <AppFormField
            control={form.control}
            name="passport_issuing_date"
            label={t('customer:attributes.passport_issuing_date')}
            render={({ field }) => (
              <DateInput {...field} value={field.value ?? undefined} type="string" />
            )}
          />

          <AppFormField
            control={form.control}
            name="passport_expiration_date"
            label={t('customer:attributes.passport_expiration_date')}
            render={({ field }) => (
              <DateInput {...field} value={field.value ?? undefined} type="string" />
            )}
          />

          <AppFormField
            control={form.control}
            name="passport_address"
            label={t('customer:attributes.passport_address')}
            render={({ field }) => (
              <Input
                type="text"
                placeholder={t('customer:attributes.passport_address')}
                {...field}
                value={field.value ?? ''}
              />
            )}
          />



          {/* //* Uncomment if email is needed
          <AppFormField
            control={form.control}
            name="email"
            label={t('customer:attributes.email')}
            render={({ field }) => (
              <Input
                type="email"
                placeholder={t('customer:attributes.email')}
                {...field}
                value={field.value ?? ''}
              />
            )}
          /> 
          */}

        </div>

        <Button type="submit" loading={loading}>
          {t('common:submit')}
        </Button>
      </form>
    </Form>
  );
}
