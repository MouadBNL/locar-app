import type { Resolver, UseFormReturn } from 'react-hook-form';
import type { CustomerData } from '@/features/customers';
import type { RentalData } from '@/features/rentals';
import type { VehicleData } from '@/features/vehicles';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RentalSchema } from '@/features/rentals';
import { fmt_date, generate_rental_code, get_date } from '@/lib/utils';
import { Button } from '../ui/button';
import { DateInput } from '../ui/dateinput';
import { DateTimeInput } from '../ui/datetime-input';
import { AppFormField, Form } from '../ui/form';
import { Input } from '../ui/input';
import { NumberInput } from '../ui/number-input';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { Heading4 } from '../ui/typography';
import { CustomerSelect } from './customer-select';
import { DocumentUpload } from './document-upload';
import { VehicleSelect } from './vehicle-select';

export interface RentalFormProps {
  loading?: boolean;
  submit?: (data: RentalData) => void;
}
export default function RentalInitializationForm({
  loading,
  submit,
}: RentalFormProps) {
  const form = useForm<RentalData>({
    resolver: zodResolver(RentalSchema) as unknown as Resolver<RentalData>,
    defaultValues: {
      vehicle: {
        vehicle_id: null,
        make: undefined,
        model: undefined,
        year: undefined,
        license_plate: undefined,
      },
      rental_number: generate_rental_code(),
      timeframe: {
        departure_date: fmt_date(get_date(), { format: 'datetime' }),
        return_date: fmt_date(get_date({ day: 1 }), { format: 'datetime' }),
      },
      rate: {
        day_rate: 300,
        day_quantity: 1,
        day_total: 300,
        extra_rate: 100,
        extra_quantity: 0,
        extra_total: 100,
        total: 300,
      },
      renter: {
        customer_id: null,
        full_name: 'John Doe',
        phone: '+212 6 66 66 66 66',
        address_primary: '123 Main St',
        address_secondary: 'Apt 4B',
        id_card_number: '1234567890',
        birth_date: fmt_date(get_date(), { format: 'date' }),
        driver_license_number: '1234567890',
        driver_license_issuing_city: 'Casablanca',
        driver_license_issuing_date: fmt_date(get_date(), { format: 'date' }),
        driver_license_expiration_date: fmt_date(get_date({ day: 365 * 5 }), {
          format: 'date',
        }),
      },
    },
  });

  const onSubmit = (data: RentalData) => {
    submit?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <RentalCodeForm form={form} />

        <Separator />
        <RentalVehicleForm form={form} />

        <Separator />
        <RentalPeriodForm form={form} />

        <Separator />
        <RentalRateForm form={form} />

        <Separator />
        <RentalCustomerForm form={form} />

        <Separator />
        <RentalNotesForm form={form} />

        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </form>

      {/* <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
      <pre>{JSON.stringify(form.getValues(), null, 2)}</pre> */}
    </Form>
  );
}

function RentalCodeForm({ form }: { form: UseFormReturn<RentalData> }) {
  return (
    <div>
      <AppFormField
        control={form.control}
        name="rental_number"
        label="Rental Number"
        render={({ field }) => (
          <Input {...field} value={field.value ?? undefined} />
        )}
      />
    </div>
  );
}

function RentalPeriodForm({ form }: { form: UseFormReturn<RentalData> }) {
  return (
    <div>
      <FormSectionSeparator
        heading="Period"
        subheading="Select the period of the rental"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AppFormField
          control={form.control}
          name="timeframe.departure_date"
          label="Departure Date"
          render={({ field }) => (
            <DateTimeInput
              {...field}
              value={field.value ?? undefined}
              onChange={value => field.onChange(value)}
              type="string"
            />
          )}
        />

        <AppFormField
          control={form.control}
          name="timeframe.return_date"
          label="Return Date"
          render={({ field }) => (
            <DateTimeInput
              {...field}
              value={field.value ?? undefined}
              onChange={value => field.onChange(value)}
              type="string"
            />
          )}
        />
      </div>
    </div>
  );
}

function RentalCustomerForm({ form }: { form: UseFormReturn<RentalData> }) {
  const onCustomerSelected = (customer: CustomerData) => {
    if (!customer)
      return;
    form.setValue('renter.customer_id', customer.id);
    form.setValue(
      'renter.full_name',
      `${customer.first_name} ${customer.last_name}`,
    );
    form.setValue('renter.phone', customer.phone);
    form.setValue('renter.address_primary', customer.address ?? '');
    form.setValue('renter.id_card_number', customer.id_card_number ?? '');
    form.setValue(
      'renter.driver_license_number',
      customer.driver_license_number ?? '',
    );
  };

  return (
    <div>
      <FormSectionSeparator
        heading="Customer"
        subheading="Select the customer for the rental"
      />
      <AppFormField
        control={form.control}
        name="renter.customer_id"
        label="Customer"
        render={({ field }) => (
          <CustomerSelect
            onValueChange={field.onChange}
            onCustomerSelected={onCustomerSelected}
            value={field.value ?? undefined}
          />
        )}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AppFormField
          control={form.control}
          name="renter.full_name"
          label="Full Name"
          render={({ field }) => (
            <Input {...field} value={field.value ?? undefined} />
          )}
        />
        <AppFormField
          control={form.control}
          name="renter.phone"
          label="Phone"
          render={({ field }) => (
            <Input {...field} value={field.value ?? undefined} />
          )}
        />
        <AppFormField
          control={form.control}
          name="renter.address_primary"
          label="Address 1"
          render={({ field }) => (
            <Input {...field} value={field.value ?? undefined} />
          )}
        />
        <AppFormField
          control={form.control}
          name="renter.address_secondary"
          label="Address 2"
          render={({ field }) => (
            <Input {...field} value={field.value ?? undefined} />
          )}
        />
        <AppFormField
          control={form.control}
          name="renter.id_card_number"
          label="ID Number"
          render={({ field }) => (
            <Input {...field} value={field.value ?? undefined} />
          )}
        />
        <AppFormField
          control={form.control}
          name="renter.birth_date"
          label="Birth Date"
          render={({ field }) => (
            <DateInput
              {...field}
              value={field.value ?? undefined}
              type="string"
            />
          )}
        />
        <AppFormField
          control={form.control}
          name="renter.driver_license_number"
          label="DriverLicense Number"
          render={({ field }) => (
            <Input {...field} value={field.value ?? undefined} />
          )}
        />

        <AppFormField
          control={form.control}
          name="renter.driver_license_issuing_city"
          label="DriverLicense Issuing City"
          render={({ field }) => (
            <Input {...field} value={field.value ?? undefined} />
          )}
        />
        <AppFormField
          control={form.control}
          name="renter.driver_license_issuing_date"
          label="DriverLicense Issuing Date"
          render={({ field }) => (
            <DateInput
              {...field}
              value={field.value ?? undefined}
              type="string"
            />
          )}
        />

        <AppFormField
          control={form.control}
          name="renter.driver_license_expiration_date"
          label="DriverLicense Expiration Date"
          render={({ field }) => (
            <DateInput
              {...field}
              value={field.value ?? undefined}
              type="string"
            />
          )}
        />
        <AppFormField
          control={form.control}
          name="renter.passport_number"
          label="Passport Number"
          render={({ field }) => (
            <Input {...field} value={field.value ?? undefined} />
          )}
        />

        <AppFormField
          control={form.control}
          name="renter.passport_country"
          label="Passport Country"
          render={({ field }) => (
            <Input {...field} value={field.value ?? undefined} />
          )}
        />

        <AppFormField
          control={form.control}
          name="renter.passport_issuing_date"
          label="Passport Issuing Date"
          render={({ field }) => (
            <DateInput
              {...field}
              value={field.value ?? undefined}
              type="string"
            />
          )}
        />

        <AppFormField
          control={form.control}
          name="renter.passport_expiration_date"
          label="Passport Expiration Date"
          render={({ field }) => (
            <DateInput
              {...field}
              value={field.value ?? undefined}
              type="string"
            />
          )}
        />

        <AppFormField
          control={form.control}
          name="renter.id_card_scan_document"
          label="ID Card Scan Document"
          render={({ field }) => (
            <DocumentUpload {...field} value={field.value ?? undefined} />
          )}
        />

        <AppFormField
          control={form.control}
          name="renter.driver_license_scan_document"
          label="Driver License Scan Document"
          render={({ field }) => (
            <DocumentUpload {...field} value={field.value ?? undefined} />
          )}
        />
      </div>
    </div>
  );
}

function RentalVehicleForm({ form }: { form: UseFormReturn<RentalData> }) {
  const onVehicleSelected = (vehicle: VehicleData) => {
    form.setValue('vehicle.make', vehicle.make);
    form.setValue('vehicle.model', vehicle.model);
    form.setValue('vehicle.year', vehicle.year);
    form.setValue('vehicle.license_plate', vehicle.license_plate);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <FormSectionSeparator
          heading="Vehicle"
          subheading="Enter information about the vehicle"
        />
        <div className="w-48">
          <AppFormField
            control={form.control}
            name="vehicle.vehicle_id"
            label="Vehicle"
            render={({ field }) => (
              <VehicleSelect
                onValueChange={field.onChange}
                onVehicleSelected={onVehicleSelected}
                value={field.value ?? undefined}
              />
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AppFormField
          control={form.control}
          name="vehicle.make"
          label="Make"
          render={({ field }) => (
            <Input
              {...field}
              value={field.value ?? undefined}
              placeholder="Dacia"
            />
          )}
        />
        <AppFormField
          control={form.control}
          name="vehicle.model"
          label="Model"
          render={({ field }) => (
            <Input
              {...field}
              value={field.value ?? undefined}
              placeholder="Duster"
            />
          )}
        />
        <AppFormField
          control={form.control}
          name="vehicle.year"
          label="Year"
          render={({ field }) => (
            <NumberInput placeholder="2020" value={field.value} onChange={field.onChange} />
          )}
        />
        <AppFormField
          control={form.control}
          name="vehicle.license_plate"
          label="License Plate"
          render={({ field }) => (
            <Input
              {...field}
              value={field.value ?? undefined}
              placeholder="1234567890"
            />
          )}
        />
      </div>
    </div>
  );
}

function RentalRateForm({ form }: { form: UseFormReturn<RentalData> }) {
  const departure_date = form.watch('timeframe.departure_date');
  const return_date = form.watch('timeframe.return_date');
  const daily_rate = form.watch('rate.day_rate');
  const extra_rate = form.watch('rate.extra_rate');
  const extra_quantity = form.watch('rate.extra_quantity');

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
    const extra_total_price = (extra_rate ?? 0) * (extra_quantity ?? 0);
    form.setValue('rate.extra_total', extra_total_price);
    form.setValue('rate.total', extra_total_price);
    const number_of_days = dateDiffInDays(departure_date, return_date);
    const day_total_price = number_of_days * (daily_rate ?? 0);
    form.setValue('rate.day_quantity', number_of_days);
    form.setValue('rate.day_total', day_total_price);
    const total_price = (extra_total_price ?? 0) + (day_total_price ?? 0);
    form.setValue('rate.total', total_price);
  }, [
    extra_rate,
    extra_quantity,
    daily_rate,
    departure_date,
    return_date,
    form,
  ]);

  return (
    <div>
      <FormSectionSeparator
        heading="Rate & pricing"
        subheading="Select the rate for the rental"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* <AppFormField
          control={form.control}
          name="rate.unit"
          label="Unit"
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value ?? undefined}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="km">KM</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          )}
        /> */}
        <AppFormField
          control={form.control}
          name="rate.day_rate"
          label="Day Rate"
          render={({ field }) => (
            <NumberInput value={field.value} onChange={field.onChange} />
          )}
        />

        <AppFormField
          control={form.control}
          name="rate.day_quantity"
          label="Day Quantity"
          render={({ field }) => (
            <NumberInput value={field.value} onChange={field.onChange} disabled />
          )}
        />

        <AppFormField
          control={form.control}
          name="rate.day_total"
          label="Day Total"
          render={({ field }) => (
            <NumberInput value={field.value} onChange={field.onChange} disabled />
          )}
        />

        <AppFormField
          control={form.control}
          name="rate.extra_rate"
          label="Extra Rate"
          render={({ field }) => (
            <NumberInput value={field.value} onChange={field.onChange} />
          )}
        />

        <AppFormField
          control={form.control}
          name="rate.extra_quantity"
          label="Extra Quantity"
          render={({ field }) => (
            <NumberInput value={field.value} onChange={field.onChange} />
          )}
        />

        <AppFormField
          control={form.control}
          name="rate.extra_total"
          label="Extra Total"
          render={({ field }) => (
            <NumberInput value={field.value} onChange={field.onChange} />
          )}
        />

        <div className="col-span-3">
          <AppFormField
            control={form.control}
            name="rate.total"
            label="Total"
            render={({ field }) => (
              <NumberInput value={field.value} onChange={field.onChange} disabled />
            )}
          />
        </div>
      </div>
    </div>
  );
}

function RentalNotesForm({ form }: { form: UseFormReturn<RentalData> }) {
  return (
    <div className="space-y-4">
      <FormSectionSeparator
        heading="Notes"
        subheading="Add any additional notes for the rental"
      />
      <AppFormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <Textarea
            {...field}
            value={field.value ?? undefined}
            rows={10}
            className="h-36"
          />
        )}
      />
    </div>
  );
}

function FormSectionSeparator({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) {
  return (
    <div className="flex flex-col gap-0 mb-4">
      <Heading4 className="mb-0">{heading}</Heading4>
      <p className="text-sm text-muted-foreground">{subheading}</p>
    </div>
  );
}
