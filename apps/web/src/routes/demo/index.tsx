import { createFileRoute } from "@tanstack/react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { AppFormField, Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { DateInput } from "@/components/ui/dateinput";

export const Route = createFileRoute("/demo/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex items-center justify-center gap-3 h-screen">
      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardContent>
            <DatePickerForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DatePickerForm() {
  const FormSchemaDemo = z.object({
    license_expiration_date: z
      .string({
        required_error: "A license expiration date is required.",
      })
      .date()
      .min(new Date().getTime(), {
        message: "License expiration date must be in the future",
      }),
  });
  const form = useForm<z.infer<typeof FormSchemaDemo>>({
    resolver: zodResolver(FormSchemaDemo),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof FormSchemaDemo>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">
            {JSON.stringify({ data: data.license_expiration_date }, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <AppFormField
          control={form.control}
          name="license_expiration_date"
          label="License Expiration"
          render={({ field }) => <DateInput {...field} />}
        />
        <Button type="submit">Submit</Button>
      </form>
      <pre className="h-96 overflow-y-auto">
        {JSON.stringify(form, null, 2)}
      </pre>
    </Form>
  );
}
