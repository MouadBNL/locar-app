import { zodResolver } from "@hookform/resolvers/zod";
import {
  RentalInitializationSchema,
  type RentalInitializationData,
} from "@locar/api/entities";
import { AppFormField, Form } from "../ui/form";
import { VehicleSelect } from "./vehicle-select";
import { DateInput } from "../ui/dateinput";
import { Button } from "../ui/button";
import { NumberInput } from "../ui/number-input";
import { Textarea } from "../ui/textarea";
import { useForm, type UseFormReturn } from "react-hook-form";
import { CustomerSelect } from "./customer-select";
import { Input } from "../ui/input";
import { generate_rental_code } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Heading4 } from "../ui/typography";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CustomerRepository } from "@/repositories";
import { useQuery } from "@tanstack/react-query";

export type RentalFormProps = {
  loading?: boolean;
  submit?: (data: RentalInitializationData) => void;
};
export default function RentalInitializationForm({
  loading,
  submit,
}: RentalFormProps) {
  const form = useForm<RentalInitializationData>({
    resolver: zodResolver(RentalInitializationSchema),
    defaultValues: {
      code: generate_rental_code(),
      period: {
        pickup_date: new Date().toISOString().split("T")[0],
        return_date: new Date(new Date().setDate(new Date().getDate() + 1))
          .toISOString()
          .split("T")[0],
      },
      customer: {
        customer_id: "",
        full_name: "",
        phone: "",
        address1: "",
        id_number: "",
        id_issued_at: "",
        id_expired_at: "",
        license_number: "",
        license_document: "",
        license_issued_at: "",
        license_expired_at: "",
      },
      rate: {
        unit: "daily",
        price_per_unit: 300,
      },
      vehicle: {
        vehicle_id: "",
      },
    },
  });

  const onSubmit = (data: RentalInitializationData) => {
    console.log(data);
    submit?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <RentalCodeForm form={form} />

        <FormSectionSeparator
          heading="Period"
          subheading="Select the period of the rental"
        />
        <RentalPeriodForm form={form} />

        <Separator />

        <RentalCustomerForm form={form} />

        <Separator />

        <FormSectionSeparator
          heading="Vehicle"
          subheading="Select the vehicle for the rental"
        />
        <RentalVehicleForm form={form} />

        <Separator />

        <FormSectionSeparator
          heading="Rate"
          subheading="Select the rate for the rental"
        />
        <RentalRateForm form={form} />

        <Separator />

        <RentalNotesForm form={form} />

        <Button type="submit" loading={loading}>
          Submit
        </Button>

        <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
        <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>
      </form>
    </Form>
  );
}

const RentalCodeForm = ({
  form,
}: {
  form: UseFormReturn<RentalInitializationData>;
}) => {
  return (
    <div>
      <AppFormField
        control={form.control}
        name="code"
        label="Code"
        render={({ field }) => <Input {...field} value={field.value} />}
      />
    </div>
  );
};

const RentalPeriodForm = ({
  form,
}: {
  form: UseFormReturn<RentalInitializationData>;
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <AppFormField
        control={form.control}
        name="period.pickup_date"
        label="Pickup Date"
        render={({ field }) => (
          <DateInput
            {...field}
            value={field.value ?? undefined}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />

      <AppFormField
        control={form.control}
        name="period.return_date"
        label="Return Date"
        render={({ field }) => (
          <DateInput
            {...field}
            value={field.value ?? undefined}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
    </div>
  );
};

const RentalCustomerForm = ({
  form,
}: {
  form: UseFormReturn<RentalInitializationData>;
}) => {
  const { data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: () => CustomerRepository.index(),
  });

  const customer_id = form.watch("customer.customer_id");

  useEffect(() => {
    console.log("customers", customers);
    if (customers && customers.length > 0 && customer_id) {
      const customer = customers.find((c) => c.id === customer_id);
      if (!customer) {
        return;
      }
      form.setValue("customer.customer_id", customer.id);
      form.setValue(
        "customer.full_name",
        customer.first_name + " " + customer.last_name
      );
      form.setValue("customer.phone", customer.phone);
      form.setValue("customer.address1", customer.address ?? "");
      // form.setValue("customer.id_number", customer. ?? "");
      form.setValue("customer.license_number", customer.license_number ?? "");
      form.setValue("customer.license_number", customer.license_number ?? "");
      form.setValue(
        "customer.license_issued_at",
        customer.license_issuing_date ?? ""
      );
      form.setValue(
        "customer.license_expired_at",
        customer.license_expiration_date ?? ""
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
        name="customer.customer_id"
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
          name="customer.full_name"
          label="Full Name"
          render={({ field }) => (
            <Input {...field} value={field.value ?? undefined} />
          )}
        />
        <AppFormField
          control={form.control}
          name="customer.phone"
          label="Phone"
          render={({ field }) => (
            <Input {...field} value={field.value ?? undefined} />
          )}
        />
        <AppFormField
          control={form.control}
          name="customer.address1"
          label="Address 1"
          render={({ field }) => (
            <Input {...field} value={field.value ?? undefined} />
          )}
        />
        <AppFormField
          control={form.control}
          name="customer.address2"
          label="Address 2"
          render={({ field }) => (
            <Input {...field} value={field.value ?? undefined} />
          )}
        />
        <AppFormField
          control={form.control}
          name="customer.id_number"
          label="ID Number"
          render={({ field }) => (
            <Input {...field} value={field.value ?? undefined} />
          )}
        />
        <AppFormField
          control={form.control}
          name="customer.license_number"
          label="License Number"
          render={({ field }) => (
            <Input {...field} value={field.value ?? undefined} />
          )}
        />

        <AppFormField
          control={form.control}
          name="customer.id_issued_at"
          label="ID Issued At"
          render={({ field }) => (
            <DateInput {...field} value={field.value ?? undefined} />
          )}
        />
        <AppFormField
          control={form.control}
          name="customer.license_issued_at"
          label="License Issued At"
          render={({ field }) => (
            <DateInput {...field} value={field.value ?? undefined} />
          )}
        />

        <AppFormField
          control={form.control}
          name="customer.id_expired_at"
          label="ID Expired At"
          render={({ field }) => (
            <DateInput {...field} value={field.value ?? undefined} />
          )}
        />
        <AppFormField
          control={form.control}
          name="customer.license_expired_at"
          label="License Expired At"
          render={({ field }) => (
            <DateInput {...field} value={field.value ?? undefined} />
          )}
        />

        <AppFormField
          control={form.control}
          name="customer.id_document"
          label="ID Document"
          render={({ field }) => (
            <Input {...field} value={field.value ?? undefined} />
          )}
        />

        <AppFormField
          control={form.control}
          name="customer.license_document"
          label="License Document"
          render={({ field }) => (
            <Input {...field} value={field.value ?? undefined} />
          )}
        />
      </div>
    </div>
  );
};

const RentalVehicleForm = ({
  form,
}: {
  form: UseFormReturn<RentalInitializationData>;
}) => {
  return (
    <div>
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
  );
};

const RentalRateForm = ({
  form,
}: {
  form: UseFormReturn<RentalInitializationData>;
}) => {
  const pickup_date = form.watch("period.pickup_date");
  const return_date = form.watch("period.return_date");
  const daily_rate = form.watch("rate.price_per_unit");

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
    const number_of_days = dateDiffInDays(pickup_date, return_date);
    const total_price = number_of_days * (daily_rate ?? 0);
    form.setValue("rate.number_of_units", number_of_days);
    form.setValue("rate.total_price", total_price);
  }, [pickup_date, return_date, daily_rate, form]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <AppFormField
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
      />
      <AppFormField
        control={form.control}
        name="rate.price_per_unit"
        label="Price Per Unit"
        render={({ field }) => (
          <NumberInput {...field} value={field.value ?? undefined} />
        )}
      />

      <AppFormField
        control={form.control}
        name="rate.number_of_units"
        label="Number Of Units"
        render={({ field }) => (
          <NumberInput value={field.value ?? undefined} disabled />
        )}
      />

      <AppFormField
        control={form.control}
        name="rate.total_price"
        label="Total Price"
        render={({ field }) => (
          <NumberInput {...field} value={field.value ?? undefined} disabled />
        )}
      />
    </div>
  );
};

const RentalNotesForm = ({
  form,
}: {
  form: UseFormReturn<RentalInitializationData>;
}) => {
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
          <Textarea {...field} value={field.value ?? undefined} cols={10} />
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
    <div className="flex flex-col gap-2">
      <Heading4>{heading}</Heading4>
      <p className="text-sm text-muted-foreground">{subheading}</p>
    </div>
  );
};
