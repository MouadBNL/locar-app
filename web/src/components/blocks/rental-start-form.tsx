import { RentalStartSchema, type RentalStartData } from "@/features/rentals";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppFormField, Form } from "../ui/form";
import { DateTimeInput } from "../ui/datetime-input";
import { fmt_date, get_date } from "@/lib/utils";
import { NumberInput } from "../ui/number-input";
import { Button } from "../ui/button";

export function RentalStartForm({
  initialValues,
  loading,
  submit,
}: {
  initialValues?: Partial<RentalStartData>;
  loading?: boolean;
  submit: (data: RentalStartData) => void;
}) {
  const form = useForm({
    resolver: zodResolver(RentalStartSchema),
    defaultValues: {
      actual_departure_date: fmt_date(get_date(), { format: "datetime" }),
      mileage: 0,
      ...initialValues,
    },
  });

  function onSubmit(data: RentalStartData) {
    submit?.(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AppFormField
          control={form.control}
          name="actual_departure_date"
          label="Actual Departure Date"
          render={({ field }) => <DateTimeInput type="string" {...field} />}
        />

        <AppFormField
          control={form.control}
          name="mileage"
          label="Mileage"
          render={({ field }) => (
            <NumberInput {...field} value={field.value ?? undefined} />
          )}
        />

        <Button type="submit" loading={loading}>
          Start Rental
        </Button>
      </form>
    </Form>
  );
}
