import { RentalReturnSchema, type RentalReturnData } from "@/features/rentals";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppFormField, Form } from "../ui/form";
import { DateTimeInput } from "../ui/datetime-input";
import { fmt_date, get_date } from "@/lib/utils";
import { NumberInput } from "../ui/number-input";
import { Button } from "../ui/button";

export function RentalReturnForm({
  initialValues,
  loading,
  submit,
}: {
  initialValues?: Partial<RentalReturnData>;
  loading?: boolean;
  submit: (data: RentalReturnData) => void;
}) {
  const form = useForm({
    resolver: zodResolver(RentalReturnSchema),
    defaultValues: {
      actual_return_date: fmt_date(get_date(), { format: "datetime" }),
      mileage: 0,
      ...initialValues,
    },
  });

  function onSubmit(data: RentalReturnData) {
    submit?.(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AppFormField
          control={form.control}
          name="actual_return_date"
          label="Actual Return Date"
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
          Return Rental
        </Button>
      </form>
    </Form>
  );
}
