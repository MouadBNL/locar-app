import {
  rentalDocumentSchema,
  rentalDocumentTypeMap,
  rentalDocumentTypeSchema,
  type RentalDocumentData,
} from "@/features/rental-documents";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppFormField, Form } from "../ui/form";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DocumentUpload } from "./document-upload";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { DocumentResource } from "@/features/documents";

export type RentalDocumentFormProps = {
  initialValues?: Partial<RentalDocumentData>;
  loading?: boolean;
  submit?: (data: RentalDocumentData) => void;
};
export const RentalDocumentForm = ({
  initialValues,
  submit,
  loading,
}: RentalDocumentFormProps) => {
  const form = useForm({
    resolver: zodResolver(rentalDocumentSchema),
    defaultValues: {
      type: "rental_agreement",
      description: "",
      ...initialValues,
    },
  });

  const onDocumentSelected = (document: DocumentResource) => {
    if (!form.getValues("title")) {
      form.setValue("title", document.filename);
    }
  };

  const onSubmit = (data: RentalDocumentData) => {
    submit?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-2 lg:gap-4">
          <AppFormField
            control={form.control}
            name="type"
            label="Type"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  {rentalDocumentTypeSchema.map((type) => (
                    <SelectItem key={type} value={type}>
                      {rentalDocumentTypeMap[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <AppFormField
            control={form.control}
            name="document_id"
            label="Document"
            render={({ field }) => (
              <DocumentUpload
                {...field}
                onDocumentSelected={onDocumentSelected}
              />
            )}
          />
          <AppFormField
            control={form.control}
            name="title"
            label="Title"
            render={({ field }) => <Input placeholder="Title" {...field} />}
          />
          <AppFormField
            control={form.control}
            name="description"
            label="Description"
            render={({ field }) => (
              <Textarea rows={3} placeholder="Description" {...field} />
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" loading={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
