import {
  vehicleExpenseSchema,
  type VehicleExpenseRequest,
} from "@/features/vehicle-expenses";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppFormField, Form } from "../ui/form";
import { Select } from "../ui/select";
import { NumberInput } from "../ui/number-input";
import { DateTimeInput } from "../ui/datetime-input";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { DocumentUpload } from "./document-upload";
import { fmt_date, get_date } from "@/lib/utils";

export type VehicleExpenseFormProps = {
  initialValues?: Partial<VehicleExpenseRequest>;
  loading?: boolean;
  submit?: (data: VehicleExpenseRequest) => void;
};

export const VehicleExpenseForm = ({
  initialValues,
  loading,
  submit,
}: VehicleExpenseFormProps) => {
  const form = useForm({
    resolver: zodResolver(vehicleExpenseSchema),
    defaultValues: {
      type: "maintenance",
      amount: 0,
      date: fmt_date(get_date()),
      title: "",
      reference: "",
      receipt_document_id: "",
      notes: "",
      ...initialValues,
    },
  });

  const onSubmit = (data: VehicleExpenseRequest) => {
    submit?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AppFormField
          control={form.control}
          name="type"
          render={({ field }) => <Select {...field} />}
        />

        <AppFormField
          control={form.control}
          name="amount"
          render={({ field }) => <NumberInput {...field} />}
        />

        <AppFormField
          control={form.control}
          name="date"
          render={({ field }) => <DateTimeInput {...field} type="string" />}
        />

        <AppFormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <Input {...field} placeholder="Title" value={field.value ?? ""} />
          )}
        />

        <AppFormField
          control={form.control}
          name="reference"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Reference"
              value={field.value ?? ""}
            />
          )}
        />

        <AppFormField
          control={form.control}
          name="receipt_document_id"
          render={({ field }) => <DocumentUpload {...field} />}
        />

        <AppFormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder="Notes"
              value={field.value ?? ""}
            />
          )}
        />

        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
