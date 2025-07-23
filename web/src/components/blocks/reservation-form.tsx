import { zodResolver } from "@hookform/resolvers/zod";
import { AppFormField, Form } from "../ui/form";
import { VehicleSelect } from "./vehicle-select";
import { DateInput } from "../ui/dateinput";
import { Button } from "../ui/button";
import { NumberInput } from "../ui/number-input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { CustomerSelect } from "./customer-select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "../ui/dialog";
import {
  ReservationSchema,
  type ReservationData,
} from "@/features/reservations";
import { fmt_date, get_date } from "@/lib/utils";
import { Plus } from "lucide-react";
import CustomerForm from "./customer-form";
import { useCustomerCreate } from "@/features/customers";
import { useQueryClient } from "@tanstack/react-query";


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
      customer_id: "",
      vehicle_id: "",
      check_in_date: fmt_date(get_date(), { format: "date" }),
      check_out_date: fmt_date(get_date({ day: 1 }), { format: "date" }),
      total_price: 0,
      daily_rate: 300,
      total_days: 1,
      ...initialValues,
    },
  });
  const queryClient = useQueryClient();

  const { mutateAsync: createCustomer } = useCustomerCreate({
    onSuccess: (response) => {
      // Invalidate cached customer list to refresh the Select
      queryClient.invalidateQueries({ queryKey: ["customers"] });

      const customerId = response?.data?.id;
      if (customerId) {
        form.setValue("customer_id", customerId);
      }

    },
  });

  const checkin_date = form.watch("check_in_date");
  const checkout_date = form.watch("check_out_date");
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
    const number_of_days = dateDiffInDays(checkin_date, checkout_date);
    const total_price = number_of_days * (daily_rate ?? 0);
    form.setValue("total_days", number_of_days);
    form.setValue("total_price", total_price);
  }, [checkin_date, checkout_date, daily_rate, form]);

  const onSubmit = (data: ReservationData) => {
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
                value={field.value}
              />
            )}
          />

          <div className="flex justify-center items-center gap-2">
            <div className="flex-1">
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
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Customer</DialogTitle>
                  <DialogDescription>
                    Add new customer
                  </DialogDescription>
                </DialogHeader>

              <CustomerForm submit={(data) => createCustomer({ data })} />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>

              </DialogContent>
            </Dialog>
          </div>


          <AppFormField
            control={form.control}
            name="check_in_date"
            label="Checkin Date"
            render={({ field }) => (
              <DateInput
                {...field}
                type="string"
                value={field.value ?? undefined}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />

          <AppFormField
            control={form.control}
            name="check_out_date"
            label="Checkout Date"
            render={({ field }) => (
              <DateInput
                {...field}
                type="string"
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
