import type { VehicleExpenseResource } from '@/features/vehicle-expenses';
import type { VehicleMaintenanceRequest } from '@/features/vehicle-maintenances';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  useVehicleExpenseCreate,
  useVehicleExpenseDelete,
  useVehicleExpenseIndex,
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
  const { t } = useTranslation(['maintenance', 'common']);

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
        useVehicleExpenseIndex.invalidate({ vehicleId, ids: Array.from(new Set([...expenses, data.data.id])) });
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
              <TabsTrigger value="details">{t('maintenance:details')}</TabsTrigger>
              <TabsTrigger value="expenses">{t('maintenance:expenses')}</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <ScrollArea className="h-[70vh]">
                <AppFormField
                  control={form.control}
                  label={t('maintenance:attributes.started_at')}
                  name="started_at"
                  render={({ field }) => (
                    <DateTimeInput {...field} type="string" />
                  )}
                />
                <AppFormField
                  control={form.control}
                  label={t('maintenance:attributes.finished_at')}
                  name="finished_at"
                  render={({ field }) => (
                    <DateTimeInput {...field} type="string" />
                  )}
                />
                <AppFormField
                  control={form.control}
                  label={t('maintenance:attributes.title')}
                  name="title"
                  render={({ field }) => (
                    <Input {...field} value={field.value ?? ''} />
                  )}
                />
                <AppFormField
                  control={form.control}
                  label={t('maintenance:attributes.reference')}
                  name="reference"
                  render={({ field }) => (
                    <Input {...field} value={field.value ?? ''} />
                  )}
                />
                <AppFormField
                  control={form.control}
                  label={t('maintenance:attributes.notes')}
                  name="notes"
                  render={({ field }) => (
                    <Textarea {...field} value={field.value ?? ''} />
                  )}
                />
                <AppFormField
                  control={form.control}
                  label={t('maintenance:attributes.receipt')}
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
            {t('common:submit')}
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
      { editExpense && (
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
      )}
    </div>
  );
}
