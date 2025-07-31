import type { VehicleData } from '@/features/vehicles';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { VehicleSchema } from '@/features/vehicles';
import { Button } from '../ui/button';
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

export interface VehicleFormProps {
  initialValues?: Partial<VehicleData>;
  loading?: boolean;
  submit?: (data: VehicleData) => void;
}
export default function VehicleForm({
  initialValues,
  loading,
  submit,
}: VehicleFormProps) {
  const { t } = useTranslation(['vehicle', 'common']);
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(VehicleSchema),
    defaultValues: {
      make: '',
      model: '',
      color: '',
      photo_url: '',
      license_plate: '',
      mileage: 0,
      number_of_seats: 1,
      number_of_doors: 1,
      year: 2025,
      transmission: 'AT',
      fuel_type: 'gasoline',
      ...initialValues,
    },
  });

  const onSubmit = (data: VehicleData) => {
    submit?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AppFormField
            control={form.control}
            name="make"
            label={t('vehicle:attributes.make')}
            render={({ field }) => (
              <Input type="text" placeholder={t('vehicle:attributes.make')} {...field} />
            )}
          />

          <AppFormField
            control={form.control}
            name="model"
            label={t('vehicle:attributes.model')}
            render={({ field }) => (
              <Input type="text" placeholder={t('vehicle:attributes.model')} {...field} />
            )}
          />

          <AppFormField
            control={form.control}
            name="year"
            label={t('vehicle:attributes.year')}
            render={({ field }) => (
              <NumberInput placeholder={t('vehicle:attributes.year')} value={field.value} onChange={field.onChange} />
            )}
          />

          <AppFormField
            control={form.control}
            name="transmission"
            label={t('vehicle:attributes.transmission')}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value ?? undefined}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('vehicle:attributes.transmission')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AT">{t('vehicle:transmission_enum.AT')}</SelectItem>
                  <SelectItem value="MT">{t('vehicle:transmission_enum.MT')}</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <AppFormField
            control={form.control}
            name="fuel_type"
            label={t('vehicle:attributes.fuel_type')}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value ?? undefined}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('vehicle:attributes.fuel_type')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gasoline">{t('vehicle:fuel_type_enum.gasoline')}</SelectItem>
                  <SelectItem value="diesel">{t('vehicle:fuel_type_enum.diesel')}</SelectItem>
                  <SelectItem value="electric">{t('vehicle:fuel_type_enum.electric')}</SelectItem>
                  <SelectItem value="hybrid">{t('vehicle:fuel_type_enum.hybrid')}</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <AppFormField
            control={form.control}
            name="number_of_seats"
            label={t('vehicle:attributes.seats')}
            render={({ field }) => (
              <NumberInput placeholder={t('vehicle:attributes.seats')} value={field.value} onChange={field.onChange} />
            )}
          />

          <AppFormField
            control={form.control}
            name="number_of_doors"
            label={t('vehicle:attributes.doors')}
            render={({ field }) => (
              <NumberInput placeholder={t('vehicle:attributes.doors')} value={field.value} onChange={field.onChange} />
            )}
          />

          <AppFormField
            control={form.control}
            name="license_plate"
            label={t('vehicle:attributes.plate')}
            render={({ field }) => (
              <Input
                type="text"
                placeholder={t('vehicle:attributes.plate')}
                {...field}
              />
            )}
          />

          <AppFormField
            control={form.control}
            name="mileage"
            label={t('vehicle:attributes.mileage')}
            render={({ field }) => (
              <NumberInput placeholder={t('vehicle:attributes.mileage')} value={field.value} onChange={field.onChange} />
            )}
          />

          <AppFormField
            control={form.control}
            name="color"
            label={t('vehicle:attributes.color')}
            render={({ field }) => (
              <Input
                placeholder={t('vehicle:attributes.color')}
                className="w-full"
                {...field}
                value={field.value ?? ''}
              />
            )}
          />

          <AppFormField
            control={form.control}
            name="photo_url"
            label={t('vehicle:attributes.photo_url')}
            render={({ field }) => (
              <Input
                type="text"
                placeholder={t('vehicle:attributes.photo_url')}
                {...field}
                value={field.value ?? ''}
                className="w-full"
              />
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
