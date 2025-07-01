import { zodResolver } from "@hookform/resolvers/zod";
import { ReservationSchema, type ReservationData } from "@locar/api/entities";
import {
  AppFormField,
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { VehicleSelect } from "./vehicle-select";
import { DateInput } from "../ui/dateinput";
import { Button } from "../ui/button";
import { NumberInput } from "../ui/number-input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export type ReservationFormProps = {
  initialValues?: Partial<ReservationData>;
  loading?: boolean;
  submit?: (data: ReservationData) => void;
};
export default function ReservationForm({
  initialValues,
  loading,
  submit,
}: ReservationFormProps) {
  const form = useForm({
    resolver: zodResolver(ReservationSchema),
    defaultValues: {
      total_price: 0,
      daily_rate: 300,
      checkin_date: new Date().toISOString().split("T")[0],
      checkout_date: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0],
      ...initialValues,
    },
  });

  const checkin_date = form.watch("checkin_date");
  const checkout_date = form.watch("checkout_date");
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

  const number_of_days = dateDiffInDays(checkin_date, checkout_date);

  const total_price = number_of_days * (daily_rate ?? 0);

  useEffect(() => {
    form.setValue("total_price", total_price);
  }, [number_of_days, daily_rate, form]);

  const onSubmit = (data: ReservationData) => {
    console.log(data);
    submit?.(data);
  };

  return (  
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <AppFormField
            control={form.control}
            name="customer_id"
            label="Customer"
            render={({ field }) => (
              <VehicleSelect
                onValueChange={field.onChange}
                value={field.value ?? undefined}
              />
            )}
          />

          <AppFormField
            control={form.control}
            name="checkin_date"
            label="Checkin Date"
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
            name="checkout_date"
            label="Checkout Date"
            render={({ field }) => (
              <DateInput
                {...field}
                value={field.value ?? undefined}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AppFormField
            control={form.control}
            name="daily_rate"
            label="Daily Rate"
            render={({ field }) => (
              <NumberInput {...field} value={field.value ?? undefined} />
            )}
          />

          <FormItem>
            <FormLabel>Number of Days</FormLabel>
            <FormControl>
              <NumberInput value={number_of_days} disabled />
            </FormControl>
            <FormMessage />
          </FormItem>

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

        <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>

        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
