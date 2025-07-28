import type { VehicleExpenseResource } from '@/features/vehicle-expenses';
import type { VehicleMaintenanceRequest } from '@/features/vehicle-maintenances';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useVehicleExpenseCreate,
  useVehicleExpenseDelete,
  useVehicleExpenseUpdate,

} from '@/features/vehicle-expenses';
import {

  vehicleMaintenanceSchema,
} from '@/features/vehicle-maintenances';
import { fmt_date, get_date } from '@/lib/utils';
import { Button } from '../ui/button';
import { DateTimeInput } from '../ui/datetime-input';
import { AppFormField, Form } from '../ui/form';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { DocumentUpload } from './document-upload';
import { VehicleExpenseFormDialog } from './vehicle-expense-form-dialog';
import { VehicleExpenseList } from './vehicle-expense-list';

export interface VehicleMaintenanceFormProps {
  vehicleId: string;
  loading?: boolean;
  initialValues?: Partial<VehicleMaintenanceRequest>;
  submit?: (data: VehicleMaintenanceRequest) => void;
}

export function VehicleMaintenanceForm({
  vehicleId,
  loading,
  initialValues,
  submit,
}: VehicleMaintenanceFormProps) {
  const queryClient = useQueryClient();

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [editExpense, setEditExpense] = useState<VehicleExpenseResource | null>(
    null,
  );

  const form = useForm({
    resolver: zodResolver(vehicleMaintenanceSchema),
    defaultValues: {
      started_at: fmt_date(get_date()),
      finished_at: null,
      expenses: [],
      ...initialValues,
    },
  });

  const { mutate: createExpense, isPending: isCreatingExpense }
    = useVehicleExpenseCreate({
      onSuccess: (data) => {
        setOpenCreateDialog(false);
        const expenses = form.getValues('expenses') ?? [];
        form.setValue(
          'expenses',
          Array.from(new Set([...expenses, data.data.id])),
        );
      },
    });

  const { mutate: updateExpense, isPending: isUpdatingExpense }
    = useVehicleExpenseUpdate({
      onSuccess: (data) => {
        const expenses = form.getValues('expenses') ?? [];
        form.setValue(
          'expenses',
          Array.from(new Set([...expenses, data.data.id])),
        );
        queryClient.invalidateQueries({
          queryKey: [
            'vehicle-expenses',
            {
              vehicleId,
              ids: Array.from(new Set([...expenses, data.data.id])),
            },
          ],
        });
        setEditExpense(null);
      },
    });

  const { mutate: deleteExpense } = useVehicleExpenseDelete({
    onSuccess: (_, variables) => {
      const expenses = form.getValues('expenses') ?? [];
      form.setValue(
        'expenses',
        expenses.filter(id => id !== variables.expenseId),
      );
    },
  });

  const onSubmit = (data: VehicleMaintenanceRequest) => {
    submit?.(data);
  };
  return (
    <div>
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
                    <Input {...field} value={field.value ?? ''} />
                  )}
                />
                <AppFormField
                  control={form.control}
                  label="Reference"
                  name="reference"
                  render={({ field }) => (
                    <Input {...field} value={field.value ?? ''} />
                  )}
                />
                <AppFormField
                  control={form.control}
                  label="Notes"
                  name="notes"
                  render={({ field }) => (
                    <Textarea {...field} value={field.value ?? ''} />
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
                      onAddExpense={() => setOpenCreateDialog(true)}
                      onEditExpense={expense => setEditExpense(expense)}
                      onDeleteExpense={(expense) => {
                        deleteExpense({
                          vehicleId,
                          expenseId: expense.id,
                        });
                      }}
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

      <VehicleExpenseFormDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        loading={isCreatingExpense}
        submit={(data) => {
          createExpense({ vehicleId, data });
        }}
      />

      <VehicleExpenseFormDialog
        open={!!editExpense}
        setOpen={(v) => {
          if (!v)
            setEditExpense(null);
        }}
        initialValues={{ ...editExpense }}
        loading={isUpdatingExpense}
        submit={(data) => {
          updateExpense({
            vehicleId,
            expenseId: editExpense!.id,
            data,
          });
        }}
      />
    </div>
  );
}
