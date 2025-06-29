import { useForm } from "react-hook-form";
import { AppFormField, Form } from "../ui/form";
import { Input } from "../ui/input";
import { CustomerSchema, type CustomerData } from "@locar/api/entities";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { DateInput } from "../ui/dateinput";

export type CustomerFormProps = {
  initialValues?: Partial<CustomerData>;
  loading?: boolean;
  submit?: (data: CustomerData) => void;
};
export default function CustomerForm({
  initialValues,
  loading,
  submit,
}: CustomerFormProps) {
  const form = useForm({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      ...initialValues,
    },
  });

  const onSubmit = (data: CustomerData) => {
    console.log(data);
    submit?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AppFormField
            control={form.control}
            name="first_name"
            label="First Name"
            render={({ field }) => (
              <Input type="text" placeholder="First name" {...field} />
            )}
          />

          <AppFormField
            control={form.control}
            name="last_name"
            label="Last Name"
            render={({ field }) => (
              <Input type="text" placeholder="Last name" {...field} />
            )}
          />

          <AppFormField
            control={form.control}
            name="email"
            label="Email"
            render={({ field }) => (
              <Input type="email" placeholder="Email" {...field} />
            )}
          />

          <AppFormField
            control={form.control}
            name="phone"
            label="Phone"
            render={({ field }) => (
              <Input type="text" placeholder="Phone" {...field} />
            )}
          />

          <AppFormField
            control={form.control}
            name="address"
            label="Address"
            render={({ field }) => (
              <Input type="text" placeholder="Address" {...field} />
            )}
          />

          <AppFormField
            control={form.control}
            name="license_number"
            label="License Number"
            render={({ field }) => (
              <Input type="text" placeholder="License number" {...field} />
            )}
          />

          <AppFormField
            control={form.control}
            name="license_expiration_date"
            label="License Expiration Date"
            render={({ field }) => <DateInput {...field} />}
          />
        </div>

        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
