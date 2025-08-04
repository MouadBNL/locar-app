import type { RentalRateData, RentalTimeframeData, RentalVehichleData, RenterData } from '@/features/rentals';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import z from 'zod';
import { RentalChargesSummary } from '@/components/blocks/rental-charges-summary';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DateInput } from '@/components/ui/dateinput';
import { DateTimeInput } from '@/components/ui/datetime-input';
import { AppFormField, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NumberInput } from '@/components/ui/number-input';
import { Textarea } from '@/components/ui/textarea';
import { useRentalPaymentIndex } from '@/features/rental-payments';
import {
  RentalRateSchema,
  RentalTimeframeSchema,
  RentalVehichleSchema,
  RenterSchema,
  useRentalNotesUpdate,
  useRentalRateUpdate,
  useRentalRenterUpdate,
  useRentalShow,
  useRentalTimeframeUpdate,
  useRentalVehicleUpdate,
} from '@/features/rentals';
import { parse_availability_error } from '@/lib/utils';

export const Route = createFileRoute('/app/rentals/$id/')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const rental = await useRentalShow.prefetch({ number: params.id });

    return { rental: rental.data };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data } = useRentalShow({ number: id });
  const rental = data?.data;
  function handleUpdate() {
    useRentalShow.invalidate({ number: id });
    useRentalPaymentIndex.invalidate({ rental_code: id });
  }

  if (!rental)
    return null;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 grid grid-cols-1 gap-8">
        <RentalVehicleFormSection
          code={id}
          vehicle={rental.vehicle}
          onUpdate={handleUpdate}
        />
        <RentalPeriodFormSection
          code={id}
          period={rental.timeframe}
          onUpdate={handleUpdate}
        />
        <RentalRenterFormSection
          code={id}
          renter={rental.renter}
          onUpdate={handleUpdate}
        />
        <RentalRateFormSection
          code={id}
          rate={rental.rate}
          period={rental.timeframe}
          onUpdate={handleUpdate}
        />
        <RentalNotesFormSection
          code={id}
          notes={rental.notes ?? undefined}
          onUpdate={handleUpdate}
        />
      </div>
      <div className="col-span-1">
        <RentalChargesSummary charges={rental.charges_summary ?? undefined} />
      </div>
    </div>
  );
}

/**
 * -------------------------------------------
 *
 * Vehicle
 *
 * -------------------------------------------
 */
function RentalVehicleFormSection({
  vehicle,
  onUpdate,
  code,
}: {
  vehicle?: Partial<RentalVehichleData>;
  onUpdate: () => void;
  code: string;
}) {
  const { t } = useTranslation(['rental', 'common', 'vehicle']);
  const form = useForm<RentalVehichleData>({
    resolver: zodResolver(RentalVehichleSchema),
    defaultValues: {
      ...vehicle,
    },
  });

  const { mutate: updateVehicle, isPending } = useRentalVehicleUpdate({
    onSuccess: () => {
      toast.success(t('rental:vehicle.updated'));
      onUpdate();
    },
    onError: () => {
      toast.error(t('rental:vehicle.error'));
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    updateVehicle({ id: code, data });
  });

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle>{t('rental:vehicle.heading')}</CardTitle>
            <CardAction>
              {/* <div className="w-48">
                <AppFormField
                  control={form.control}
                  name="vehicle_id"
                  label="Vehicle"
                  render={({ field }) => (
                    <VehicleSelect
                      onValueChange={field.onChange}
                      value={field.value ?? undefined}
                    />
                  )}
                />
              </div> */}
              <Button type="submit" size="sm" loading={isPending}>
                {t('common:update')}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <AppFormField
                control={form.control}
                name="make"
                label={t('vehicle:attributes.make')}
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
                name="model"
                label={t('vehicle:attributes.model')}
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
                name="year"
                label={t('vehicle:attributes.year')}
                render={({ field }) => (
                  <NumberInput
                    onChange={value => field.onChange(value)}
                    value={field.value ?? undefined}
                    placeholder="2020"
                  />
                )}
              />
              <AppFormField
                control={form.control}
                name="license_plate"
                label={t('vehicle:attributes.plate')}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value ?? undefined}
                    placeholder="1234567890"
                  />
                )}
              />
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}

/**
 * -------------------------------------------
 *
 * Timeframe / Period
 *
 * -------------------------------------------
 */
function RentalPeriodFormSection({
  period,
  onUpdate,
  code,
}: {
  period?: Partial<RentalTimeframeData>;
  onUpdate: () => void;
  code: string;
}) {
  const { t } = useTranslation(['rental', 'common', 'exceptions']);
  const form = useForm<RentalTimeframeData>({
    resolver: zodResolver(RentalTimeframeSchema),
    defaultValues: {
      ...period,
    },
  });

  const { mutate: updatePeriod, isPending } = useRentalTimeframeUpdate({
    onSuccess: () => {
      toast.success(t('rental:period.updated'));
      onUpdate();
    },
    onError: (error) => {
      const msg = parse_availability_error(error);
      if (msg) {
        toast.error(t(`exceptions:availability.${msg.code}`, {
          start_date: msg.start_date,
          end_date: msg.end_date,
        }));
      }
      else {
        toast.error(t('rental:period.error'));
      }
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    updatePeriod({ id: code, data });
  });

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle>{t('rental:period.heading')}</CardTitle>
            <CardAction>
              <Button type="submit" size="sm" loading={isPending}>
                {t('common:update')}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              <AppFormField
                control={form.control}
                name="departure_date"
                label={t('rental:period.attributes.departure_date')}
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
                name="return_date"
                label={t('rental:period.attributes.return_date')}
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
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}

/**
 * -------------------------------------------
 *
 * Rate
 *
 * -------------------------------------------
 */
function RentalRateFormSection({
  rate,
  period,
  onUpdate,
  code,
}: {
  rate?: Partial<RentalRateData>;
  period?: RentalTimeframeData;
  onUpdate: () => void;
  code: string;
}) {
  const { t } = useTranslation(['rental', 'common']);
  const form = useForm<RentalRateData>({
    resolver: zodResolver(RentalRateSchema),
    defaultValues: {
      day_rate: 300,
      ...rate,
    },
  });

  const { mutate: updateRate, isPending } = useRentalRateUpdate({
    onSuccess: () => {
      toast.success(t('rental:rate.updated'));
      onUpdate();
    },
    onError: () => {
      toast.error(t('rental:rate.error'));
    },
  });

  const departure_date = period?.departure_date;
  const return_date = period?.return_date;
  const daily_rate = form.watch('day_rate');
  const extra_rate = form.watch('extra_rate');
  const extra_quantity = form.watch('extra_quantity');
  const discount = form.watch('discount');

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
    form.setValue('extra_total', extra_total_price);
    form.setValue('total', extra_total_price);
    const number_of_days = dateDiffInDays(departure_date, return_date);
    const day_total_price = number_of_days * (daily_rate ?? 0);
    form.setValue('day_quantity', number_of_days);
    form.setValue('day_total', day_total_price);
    const total_price = (extra_total_price ?? 0) + (day_total_price ?? 0) - (discount ?? 0);
    form.setValue('total', total_price);
  }, [
    extra_rate,
    extra_quantity,
    daily_rate,
    departure_date,
    return_date,
    form,
  ]);

  const onSubmit = form.handleSubmit((data) => {
    updateRate({ id: code, data });
  });

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle>{t('rental:rate.heading')}</CardTitle>
            <CardAction>
              <Button type="submit" size="sm" loading={isPending}>
                {t('common:update')}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <AppFormField
                control={form.control}
                name="day_rate"
                label={t('rental:rate.attributes.day_rate')}
                render={({ field }) => (
                  <NumberInput
                    value={field.value ?? undefined}
                    placeholder={t('rental:rate.attributes.day_rate')}
                    onChange={value => field.onChange(value)}
                  />
                )}
              />

              <AppFormField
                control={form.control}
                name="day_quantity"
                label={t('rental:rate.attributes.day_quantity')}
                render={({ field }) => (
                  <NumberInput
                    value={field.value ?? undefined}
                    disabled
                  />
                )}
              />

              <AppFormField
                control={form.control}
                name="day_total"
                label={t('rental:rate.attributes.day_total')}
                render={({ field }) => (
                  <NumberInput
                    onChange={value => field.onChange(value)}
                    value={field.value ?? undefined}
                    disabled
                  />
                )}
              />

              <AppFormField
                control={form.control}
                name="extra_rate"
                label={t('rental:rate.attributes.extra_rate')}
                render={({ field }) => (
                  <NumberInput
                    value={field.value ?? undefined}
                    placeholder={t('rental:rate.attributes.extra_rate')}
                    onChange={value => field.onChange(value)}
                  />
                )}
              />

              <AppFormField
                control={form.control}
                name="extra_quantity"
                label={t('rental:rate.attributes.extra_quantity')}
                render={({ field }) => (
                  <NumberInput
                    value={field.value ?? undefined}
                    placeholder={t('rental:rate.attributes.extra_quantity')}
                    onChange={value => field.onChange(value)}
                  />
                )}
              />

              <AppFormField
                control={form.control}
                name="extra_total"
                label={t('rental:rate.attributes.extra_total')}
                render={({ field }) => (
                  <NumberInput
                    value={field.value ?? undefined}
                    placeholder={t('rental:rate.attributes.extra_total')}
                    onChange={value => field.onChange(value)}
                  />
                )}
              />

              <AppFormField
                control={form.control}
                name="discount"
                label={t('rental:rate.attributes.discount')}
                render={({ field }) => (
                  <NumberInput value={field.value ?? undefined} placeholder={t('rental:rate.attributes.discount')} onChange={value => field.onChange(value)} />
                )}
              />

              <div className="col-span-2">
                <AppFormField
                  control={form.control}
                  name="total"
                  label={t('rental:rate.attributes.total')}
                  render={({ field }) => (
                    <NumberInput
                      value={field.value ?? undefined}
                      placeholder={t('rental:rate.attributes.total')}
                      onChange={value => field.onChange(value)}
                      disabled
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}

/**
 * -------------------------------------------
 *
 * Renter / Customer
 *
 * -------------------------------------------
 */
function RentalRenterFormSection({
  renter,
  onUpdate,
  code,
}: {
  renter?: Partial<RenterData>;
  onUpdate: () => void;
  code: string;
}) {
  const { t } = useTranslation(['rental', 'common', 'customer']);
  const form = useForm<RenterData>({
    resolver: zodResolver(RenterSchema),
    defaultValues: {
      ...renter,
    },
  });

  const { mutate: updateRenter, isPending } = useRentalRenterUpdate({
    onSuccess: () => {
      toast.success(t('rental:customer.updated'));
      onUpdate();
    },
    onError: () => {
      toast.error(t('rental:customer.error'));
    },
  });
  const onSubmit = form.handleSubmit((data) => {
    updateRenter({ id: code, data });
  });

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle>{t('rental:customer.heading')}</CardTitle>
            <CardAction>
              <Button type="submit" size="sm" loading={isPending}>
                {t('common:update')}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              <AppFormField
                control={form.control}
                name="full_name"
                label={t('rental:customer.attributes.full_name')}
                render={({ field }) => (
                  <Input {...field} value={field.value ?? undefined} />
                )}
              />
              <AppFormField
                control={form.control}
                name="phone"
                label={t('customer:attributes.phone')}
                render={({ field }) => (
                  <Input {...field} value={field.value ?? undefined} />
                )}
              />
              <AppFormField
                control={form.control}
                name="id_card_number"
                label={t('customer:attributes.id_number')}
                render={({ field }) => (
                  <Input {...field} value={field.value ?? undefined} />
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
                    type="string"
                  />
                )}
              />
              <AppFormField
                control={form.control}
                name="address_primary"
                label={t('customer:attributes.address')}
                render={({ field }) => (
                  <Input {...field} value={field.value ?? undefined} />
                )}
              />
              <AppFormField
                control={form.control}
                name="address_secondary"
                label={t('customer:attributes.address')}
                render={({ field }) => (
                  <Input {...field} value={field.value ?? undefined} />
                )}
              />
              <AppFormField
                control={form.control}
                name="driver_license_number"
                label={t('customer:attributes.driver_license_number')}
                render={({ field }) => (
                  <Input {...field} value={field.value ?? undefined} />
                )}
              />

              <AppFormField
                control={form.control}
                name="driver_license_issuing_city"
                label={t('customer:attributes.driver_license_issuing_city')}
                render={({ field }) => (
                  <Input {...field} value={field.value ?? undefined} />
                )}
              />
              <AppFormField
                control={form.control}
                name="driver_license_issuing_date"
                label={t('customer:attributes.driver_license_issuing_date')}
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
                name="driver_license_expiration_date"
                label={t('customer:attributes.driver_license_expiration_date')}
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
                name="passport_number"
                label={t('customer:attributes.passport_number')}
                render={({ field }) => (
                  <Input {...field} value={field.value ?? undefined} />
                )}
              />

              <AppFormField
                control={form.control}
                name="passport_country"
                label={t('customer:attributes.passport_country')}
                render={({ field }) => (
                  <Input {...field} value={field.value ?? undefined} />
                )}
              />

              <AppFormField
                control={form.control}
                name="passport_issuing_date"
                label={t('customer:attributes.passport_issuing_date')}
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
                name="passport_expiration_date"
                label={t('customer:attributes.passport_expiration_date')}
                render={({ field }) => (
                  <DateInput
                    {...field}
                    value={field.value ?? undefined}
                    type="string"
                  />
                )}
              />
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}

/**
 * -------------------------------------------
 *
 * Notes
 *
 * -------------------------------------------
 */
function RentalNotesFormSection({
  notes,
  onUpdate,
  code,
}: {
  notes?: string;
  onUpdate: () => void;
  code: string;
}) {
  const { t } = useTranslation(['rental', 'common']);
  const form = useForm<{ notes: string }>({
    resolver: zodResolver(z.object({ notes: z.string() })),
    defaultValues: {
      notes: notes ?? '',
    },
  });

  const { mutate: updateNotes, isPending } = useRentalNotesUpdate({
    onSuccess: () => {
      toast.success(t('rental:notes.updated'));
      onUpdate();
    },
    onError: () => {
      toast.error(t('rental:notes.error'));
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    updateNotes({ id: code, data });
  });

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle>{t('rental:notes.heading')}</CardTitle>
            <CardAction>
              <Button type="submit" size="sm" loading={isPending}>
                {t('common:update')}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <AppFormField
              control={form.control}
              name="notes"
              label={t('rental:notes.attributes.notes')}
              render={({ field }) => (
                <Textarea {...field} value={field.value ?? undefined} />
              )}
            />
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
