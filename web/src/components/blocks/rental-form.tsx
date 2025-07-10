import { zodResolver } from "@hookform/resolvers/zod";
import { RentalSchema, type RentalData } from "@locar/api/entities";
import { AppFormField, Form } from "../ui/form";
import { VehicleSelect } from "./vehicle-select";
import { DateInput } from "../ui/dateinput";
import { Button } from "../ui/button";
import { NumberInput } from "../ui/number-input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { CustomerSelect } from "./customer-select";
import { Input } from "../ui/input";
import { generate_rental_code } from "@/lib/utils";

export type RentalFormProps = {
  initialValues?: Partial<RentalData>;
  loading?: boolean;
  submit?: (data: RentalData) => void;
};
export default function RentalForm({
  initialValues,
  loading,
  submit,
}: RentalFormProps) {
  const form = useForm({
    resolver: zodResolver(RentalSchema),
    defaultValues: {
      code: generate_rental_code(),
      customer_id: "",
      vehicle_id: "",
      total_price: 0,
      daily_rate: 300,
      started_at: new Date().toISOString().split("T")[0],
      finished_at: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0],
      ...initialValues,
    },
  });

  const isEdit = !!initialValues?.id;

  const started_at = form.watch("started_at");
  const finished_at = form.watch("finished_at");
  const daily_rate = form.watch("daily_rate");

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
    const number_of_days = dateDiffInDays(started_at, finished_at);
    const total_price = number_of_days * (daily_rate ?? 0);
    form.setValue("total_days", number_of_days);
    form.setValue("total_price", total_price);
  }, [started_at, finished_at, daily_rate, form]);

  const onSubmit = (data: RentalData) => {
    console.log(data);
    submit?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="lg:col-span-2">
            <AppFormField
              control={form.control}
              name="code"
              label="Code"
              render={({ field }) => (
                <Input disabled={isEdit} {...field} value={field.value} />
              )}
            />
          </div>
          <AppFormField
            control={form.control}
            name="vehicle_id"
            label="Vehicle"
            render={({ field }) => (
              <VehicleSelect
                onValueChange={field.onChange}
                value={field.value}
              />
            )}
          />

          <AppFormField
            control={form.control}
            name="customer_id"
            label="Customer"
            render={({ field }) => (
              <CustomerSelect
                onValueChange={field.onChange}
                value={field.value}
              />
            )}
          />

          <AppFormField
            control={form.control}
            name="started_at"
            label="Started At"
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
            name="finished_at"
            label="Finished At"
            render={({ field }) => (
              <DateInput
                {...field}
                value={field.value ?? undefined}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <AppFormField
            control={form.control}
            name="daily_rate"
            label="Daily Rate"
            render={({ field }) => (
              <NumberInput {...field} value={field.value ?? undefined} />
            )}
          />

          <AppFormField
            control={form.control}
            name="total_days"
            label="Total Days"
            render={({ field }) => (
              <NumberInput value={field.value ?? undefined} disabled />
            )}
          />

          <AppFormField
            control={form.control}
            name="total_price"
            label="Total Price"
            render={({ field }) => (
              <NumberInput
                {...field}
                value={field.value ?? undefined}
                disabled
              />
            )}
          />
        </div>

        <div>
          <AppFormField
            control={form.control}
            name="notes"
            label="Notes"
            render={({ field }) => (
              <Textarea {...field} value={field.value ?? undefined} />
            )}
          />
        </div>

        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
