import {
  vehicleMaintenanceSchema,
  type VehicleMaintenanceRequest,
} from "@/features/vehicle-maintenances";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppFormField, Form } from "../ui/form";
import { DateTimeInput } from "../ui/datetime-input";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { DocumentUpload } from "./document-upload";
import { Button } from "../ui/button";
import { fmt_date, get_date } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { VehicleExpenseList } from "./vehicle-expense-list";

export type VehicleMaintenanceFormProps = {
  vehicleId: string;
  loading?: boolean;
  initialValues?: Partial<VehicleMaintenanceRequest>;
  submit?: (data: VehicleMaintenanceRequest) => void;
};

export const VehicleMaintenanceForm = ({
  vehicleId,
  loading,
  initialValues,
  submit,
}: VehicleMaintenanceFormProps) => {
  const form = useForm({
    resolver: zodResolver(vehicleMaintenanceSchema),
    defaultValues: {
      started_at: fmt_date(get_date()),
      finished_at: null,
      expenses: [],
      ...initialValues,
    },
  });

  const onSubmit = (data: VehicleMaintenanceRequest) => {
    console.log(data);
    submit?.(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <ScrollArea className="h-[70vh]">
              <AppFormField
                control={form.control}
                label="Started At"
                name="started_at"
                render={({ field }) => (
                  <DateTimeInput {...field} type="string" />
                )}
              />
              <AppFormField
                control={form.control}
                label="Finished At"
                name="finished_at"
                render={({ field }) => (
                  <DateTimeInput {...field} type="string" />
                )}
              />
              <AppFormField
                control={form.control}
                label="Title"
                name="title"
                render={({ field }) => (
                  <Input {...field} value={field.value ?? ""} />
                )}
              />
              <AppFormField
                control={form.control}
                label="Reference"
                name="reference"
                render={({ field }) => (
                  <Input {...field} value={field.value ?? ""} />
                )}
              />
              <AppFormField
                control={form.control}
                label="Notes"
                name="notes"
                render={({ field }) => (
                  <Textarea {...field} value={field.value ?? ""} />
                )}
              />
              <AppFormField
                control={form.control}
                label="Receipt Document"
                name="receipt_document_id"
                render={({ field }) => <DocumentUpload {...field} />}
              />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="expenses">
            <ScrollArea className="h-[70vh]">
              <AppFormField
                control={form.control}
                name="expenses"
                render={({ field }) => (
                  <VehicleExpenseList
                    vehicleId={vehicleId}
                    value={field.value ?? []}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
