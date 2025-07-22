import { RentalChargesSummary } from "@/components/blocks/rental-charges-summary";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateInput } from "@/components/ui/dateinput";
import { DateTimeInput } from "@/components/ui/datetime-input";
import { AppFormField, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { Textarea } from "@/components/ui/textarea";
import {
  rentalShowFn,
  RentalTimeframeSchema,
  RentalVehichleSchema,
  RenterSchema,
  RentalRateSchema,
  type RentalRateData,
  type RentalTimeframeData,
  type RentalVehichleData,
  type RenterData,
  useRentalVehicleUpdate,
  useRentalTimeframeUpdate,
  useRentalRateUpdate,
  useRentalRenterUpdate,
  useRentalNotesUpdate,
} from "@/features/rentals";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const Route = createFileRoute("/app/rentals/$id/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const rental = await rentalShowFn({ number: params.id });
    return { rental: rental.data };
  },
});

function RouteComponent() {
  const { rental } = Route.useLoaderData();
  const { id } = Route.useParams();
  const router = useRouter();

  function handleUpdate() {
    router.invalidate({
      filter: (match) => match.id === id,
    });
  }

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
  const form = useForm<RentalVehichleData>({
    resolver: zodResolver(RentalVehichleSchema),
    defaultValues: {
      ...vehicle,
    },
  });

  const { mutate: updateVehicle, isPending } = useRentalVehicleUpdate({
    onSuccess: () => {
      toast.success("Vehicle updated");
      onUpdate();
    },
    onError: () => {
      toast.error("Failed to update vehicle");
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
            <CardTitle>Vehicle</CardTitle>
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
                Update
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <AppFormField
                control={form.control}
                name="make"
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
                name="model"
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
                name="year"
                label="Year"
                render={({ field }) => (
                  <NumberInput
                    {...field}
                    value={field.value ?? undefined}
                    placeholder="2020"
                  />
                )}
              />
              <AppFormField
                control={form.control}
                name="license_plate"
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
  const form = useForm<RentalTimeframeData>({
    resolver: zodResolver(RentalTimeframeSchema),
    defaultValues: {
      ...period,
    },
  });

  const { mutate: updatePeriod, isPending } = useRentalTimeframeUpdate({
    onSuccess: () => {
      toast.success("Period updated");
      onUpdate();
    },
    onError: () => {
      toast.error("Failed to update period");
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
            <CardTitle>Rental Period</CardTitle>
            <CardAction>
              <Button type="submit" size="sm" loading={isPending}>
                Update
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              <AppFormField
                control={form.control}
                name="departure_date"
                label="Departure Date"
                render={({ field }) => (
                  <DateTimeInput
                    {...field}
                    value={field.value ?? undefined}
                    onChange={(value) => field.onChange(value)}
                    type="string"
                  />
                )}
              />

              <AppFormField
                control={form.control}
                name="return_date"
                label="Return Date"
                render={({ field }) => (
                  <DateTimeInput
                    {...field}
                    value={field.value ?? undefined}
                    onChange={(value) => field.onChange(value)}
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
  const form = useForm<RentalRateData>({
    resolver: zodResolver(RentalRateSchema),
    defaultValues: {
      day_rate: 300,
      ...rate,
    },
  });

  const { mutate: updateRate, isPending } = useRentalRateUpdate({
    onSuccess: () => {
      toast.success("Rate updated");
      onUpdate();
    },
    onError: () => {
      toast.error("Failed to update rate");
    },
  });

  const departure_date = period?.departure_date;
  const return_date = period?.return_date;
  const daily_rate = form.watch("day_rate");
  const extra_rate = form.watch("extra_rate");
  const extra_quantity = form.watch("extra_quantity");

  function dateDiffInDays(a?: string | null, b?: string | null) {
    if (!a || !b) return 0;
    const dateA = new Date(a);
    const dateB = new Date(b);
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(
      dateA.getFullYear(),
      dateA.getMonth(),
      dateA.getDate()
    );
    const utc2 = Date.UTC(
      dateB.getFullYear(),
      dateB.getMonth(),
      dateB.getDate()
    );

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  useEffect(() => {
    const extra_total_price = (extra_rate ?? 0) * (extra_quantity ?? 0);
    form.setValue("extra_total", extra_total_price);
    form.setValue("total", extra_total_price);
    const number_of_days = dateDiffInDays(departure_date, return_date);
    const day_total_price = number_of_days * (daily_rate ?? 0);
    form.setValue("day_quantity", number_of_days);
    form.setValue("day_total", day_total_price);
    const total_price = (extra_total_price ?? 0) + (day_total_price ?? 0);
    form.setValue("total", total_price);
  }, [extra_rate, extra_quantity, daily_rate, departure_date, return_date]);

  const onSubmit = form.handleSubmit((data) => {
    updateRate({ id: code, data });
  });

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle>Rental Rate</CardTitle>
            <CardAction>
              <Button type="submit" size="sm" loading={isPending}>
                Update
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <AppFormField
                control={form.control}
                name="day_rate"
                label="Day Rate"
                render={({ field }) => (
                  <NumberInput {...field} value={field.value ?? undefined} />
                )}
              />

              <AppFormField
                control={form.control}
                name="day_quantity"
                label="Day Quantity"
                render={({ field }) => (
                  <NumberInput value={field.value ?? undefined} disabled />
                )}
              />

              <AppFormField
                control={form.control}
                name="day_total"
                label="Day Total"
                render={({ field }) => (
                  <NumberInput
                    {...field}
                    value={field.value ?? undefined}
                    disabled
                  />
                )}
              />

              <AppFormField
                control={form.control}
                name="extra_rate"
                label="Extra Rate"
                render={({ field }) => (
                  <NumberInput {...field} value={field.value ?? undefined} />
                )}
              />

              <AppFormField
                control={form.control}
                name="extra_quantity"
                label="Extra Quantity"
                render={({ field }) => (
                  <NumberInput {...field} value={field.value ?? undefined} />
                )}
              />

              <AppFormField
                control={form.control}
                name="extra_total"
                label="Extra Total"
                render={({ field }) => (
                  <NumberInput {...field} value={field.value ?? undefined} />
                )}
              />

              <div className="col-span-3">
                <AppFormField
                  control={form.control}
                  name="total"
                  label="Total"
                  render={({ field }) => (
                    <NumberInput
                      {...field}
                      value={field.value ?? undefined}
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
  const form = useForm<RenterData>({
    resolver: zodResolver(RenterSchema),
    defaultValues: {
      ...renter,
    },
  });

  const { mutate: updateRenter, isPending } = useRentalRenterUpdate({
    onSuccess: () => {
      toast.success("Renter updated");
      onUpdate();
    },
    onError: () => {
      toast.error("Failed to update renter");
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
            <CardTitle>Renter</CardTitle>
            <CardAction>
              <Button type="submit" size="sm" loading={isPending}>
                Update
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              <AppFormField
                control={form.control}
                name="full_name"
                label="Full Name"
                render={({ field }) => (
                  <Input {...field} value={field.value ?? undefined} />
                )}
              />
              <AppFormField
                control={form.control}
                name="phone"
                label="Phone"
                render={({ field }) => (
                  <Input {...field} value={field.value ?? undefined} />
                )}
              />
              <AppFormField
                control={form.control}
                name="address_primary"
                label="Address 1"
                render={({ field }) => (
                  <Input {...field} value={field.value ?? undefined} />
                )}
              />
              <AppFormField
                control={form.control}
                name="address_secondary"
                label="Address 2"
                render={({ field }) => (
                  <Input {...field} value={field.value ?? undefined} />
                )}
              />
              <AppFormField
                control={form.control}
                name="id_card_number"
                label="ID Number"
                render={({ field }) => (
                  <Input {...field} value={field.value ?? undefined} />
                )}
              />
              <AppFormField
                control={form.control}
                name="birth_date"
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
                name="driver_license_number"
                label="DriverLicense Number"
                render={({ field }) => (
                  <Input {...field} value={field.value ?? undefined} />
                )}
              />

              <AppFormField
                control={form.control}
                name="driver_license_issuing_city"
                label="DriverLicense Issuing City"
                render={({ field }) => (
                  <Input {...field} value={field.value ?? undefined} />
                )}
              />
              <AppFormField
                control={form.control}
                name="driver_license_issuing_date"
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
                name="driver_license_expiration_date"
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
                name="passport_number"
                label="Passport Number"
                render={({ field }) => (
                  <Input {...field} value={field.value ?? undefined} />
                )}
              />

              <AppFormField
                control={form.control}
                name="passport_country"
                label="Passport Country"
                render={({ field }) => (
                  <Input {...field} value={field.value ?? undefined} />
                )}
              />

              <AppFormField
                control={form.control}
                name="passport_issuing_date"
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
                name="passport_expiration_date"
                label="Passport Expiration Date"
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
  const form = useForm<{ notes: string }>({
    resolver: zodResolver(z.object({ notes: z.string() })),
    defaultValues: {
      notes: notes ?? "",
    },
  });

  const { mutate: updateNotes, isPending } = useRentalNotesUpdate({
    onSuccess: () => {
      toast.success("Notes updated");
      onUpdate();
    },
    onError: () => {
      toast.error("Failed to update notes");
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
            <CardTitle>Notes</CardTitle>
            <CardAction>
              <Button type="submit" size="sm" loading={isPending}>
                Update
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <AppFormField
              control={form.control}
              name="notes"
              label="Notes"
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
