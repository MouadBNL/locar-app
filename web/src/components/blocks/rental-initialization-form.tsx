import { zodResolver } from "@hookform/resolvers/zod";
import { AppFormField, Form } from "../ui/form";
import { VehicleSelect } from "./vehicle-select";
import { DateInput } from "../ui/dateinput";
import { Button } from "../ui/button";
import { NumberInput } from "../ui/number-input";
import { Textarea } from "../ui/textarea";
import { useForm, type Resolver, type UseFormReturn } from "react-hook-form";
import { CustomerSelect } from "./customer-select";
import { Input } from "../ui/input";
import { fmt_date, generate_rental_code, get_date } from "@/lib/utils";
import { Heading4 } from "../ui/typography";
import { useEffect } from "react";
import { RentalSchema, type RentalData } from "@/features/rentals";
import { Separator } from "../ui/separator";
import { DateTimeInput } from "../ui/datetime-input";
import { useCustomerIndex } from "@/features/customers";
import { DocumentUpload } from "./document-upload";

export type RentalFormProps = {
  loading?: boolean;
  submit?: (data: RentalData) => void;
};
export default function RentalInitializationForm({
  loading,
  submit,
}: RentalFormProps) {
  const form = useForm<RentalData>({
    resolver: zodResolver(RentalSchema) as unknown as Resolver<RentalData>,
    defaultValues: {
      vehicle: {
        vehicle_id: null,
        make: "Dacia",
        model: "Duster",
        year: 2020,
        license_plate: "1234567890",
      },
      rental_number: generate_rental_code(),
      timeframe: {
        departure_date: fmt_date(get_date(), { format: "datetime" }),
        return_date: fmt_date(get_date({ day: 1 }), { format: "datetime" }),
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
        full_name: "John Doe",
        phone: "+212 6 66 66 66 66",
        address_primary: "123 Main St",
        address_secondary: "Apt 4B",
        id_card_number: "1234567890",
        birth_date: fmt_date(get_date(), { format: "date" }),
        driver_license_number: "1234567890",
        driver_license_issuing_city: "Casablanca",
        driver_license_issuing_date: fmt_date(get_date(), { format: "date" }),
        driver_license_expiration_date: fmt_date(get_date({ day: 365 * 5 }), {
          format: "date",
        }),
      },
    },
  });

  const onSubmit = (data: RentalData) => {
    console.log(data);
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

const RentalCodeForm = ({ form }: { form: UseFormReturn<RentalData> }) => {
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
};

const RentalPeriodForm = ({ form }: { form: UseFormReturn<RentalData> }) => {
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
              onChange={(value) => field.onChange(value)}
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
              onChange={(value) => field.onChange(value)}
              type="string"
            />
          )}
        />
      </div>
    </div>
  );
};

const RentalCustomerForm = ({ form }: { form: UseFormReturn<RentalData> }) => {
  const { data } = useCustomerIndex();
  const customers = data?.data ?? [];
  const customer_id = form.watch("renter.customer_id");

  useEffect(() => {
    if (customers && customers.length > 0 && customer_id) {
      const customer = customers.find((c: any) => c.id === customer_id);
      if (!customer) {
        return;
      }
      form.setValue("renter.customer_id", customer.id);
      form.setValue(
        "renter.full_name",
        customer.first_name + " " + customer.last_name
      );
      form.setValue("renter.phone", customer.phone);
      form.setValue("renter.address_primary", customer.address ?? "");
      // form.setValue("customer.id_number", customer. ?? "");
      form.setValue(
        "renter.driver_license_number",
        customer.driver_license_number ?? ""
      );
      form.setValue(
        "renter.driver_license_issuing_city",
        customer.address ?? ""
      );
      form.setValue(
        "renter.driver_license_issuing_date",
        customer.birth_date ?? ""
      );
      form.setValue(
        "renter.driver_license_expiration_date",
        customer.birth_date ?? ""
      );
    }
  }, [customers, customer_id, form]);

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
};

const RentalVehicleForm = ({ form }: { form: UseFormReturn<RentalData> }) => {
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
            <NumberInput
              {...field}
              value={field.value ?? undefined}
              placeholder="2020"
            />
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
};

const RentalRateForm = ({ form }: { form: UseFormReturn<RentalData> }) => {
  const departure_date = form.watch("timeframe.departure_date");
  const return_date = form.watch("timeframe.return_date");
  const daily_rate = form.watch("rate.day_rate");
  const extra_rate = form.watch("rate.extra_rate");
  const extra_quantity = form.watch("rate.extra_quantity");

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
    form.setValue("rate.extra_total", extra_total_price);
    form.setValue("rate.total", extra_total_price);
    const number_of_days = dateDiffInDays(departure_date, return_date);
    const day_total_price = number_of_days * (daily_rate ?? 0);
    form.setValue("rate.day_quantity", number_of_days);
    form.setValue("rate.day_total", day_total_price);
    const total_price = (extra_total_price ?? 0) + (day_total_price ?? 0);
    form.setValue("rate.total", total_price);
  }, [extra_rate, extra_quantity, daily_rate, departure_date, return_date]);

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
            <NumberInput {...field} value={field.value ?? undefined} />
          )}
        />

        <AppFormField
          control={form.control}
          name="rate.day_quantity"
          label="Day Quantity"
          render={({ field }) => (
            <NumberInput value={field.value ?? undefined} disabled />
          )}
        />

        <AppFormField
          control={form.control}
          name="rate.day_total"
          label="Day Total"
          render={({ field }) => (
            <NumberInput {...field} value={field.value ?? undefined} disabled />
          )}
        />

        <AppFormField
          control={form.control}
          name="rate.extra_rate"
          label="Extra Rate"
          render={({ field }) => (
            <NumberInput {...field} value={field.value ?? undefined} />
          )}
        />

        <AppFormField
          control={form.control}
          name="rate.extra_quantity"
          label="Extra Quantity"
          render={({ field }) => (
            <NumberInput {...field} value={field.value ?? undefined} />
          )}
        />

        <AppFormField
          control={form.control}
          name="rate.extra_total"
          label="Extra Total"
          render={({ field }) => (
            <NumberInput {...field} value={field.value ?? undefined} />
          )}
        />

        <div className="col-span-3">
          <AppFormField
            control={form.control}
            name="rate.total"
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
    </div>
  );
};

const RentalNotesForm = ({ form }: { form: UseFormReturn<RentalData> }) => {
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
};

const FormSectionSeparator = ({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) => {
  return (
    <div className="flex flex-col gap-0 mb-4">
      <Heading4 className="mb-0">{heading}</Heading4>
      <p className="text-sm text-muted-foreground">{subheading}</p>
    </div>
  );
};
