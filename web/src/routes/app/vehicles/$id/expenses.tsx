import type { VehicleExpenseResource } from '@/features/vehicle-expenses';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { VehicleExpenseFormDialog } from '@/components/blocks/vehicle-expense-form-dialog';
import { VehicleExpenseTable } from '@/components/blocks/vehicle-expense-table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  useVehicleExpenseCreate,
  useVehicleExpenseDelete,
  useVehicleExpenseIndex,
  useVehicleExpenseUpdate,

} from '@/features/vehicle-expenses';

export const Route = createFileRoute('/app/vehicles/$id/expenses')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [editExpense, setEditExpense] = useState<VehicleExpenseResource | null>(
    null,
  );

  const { data: vehicleExpenses, isLoading } = useVehicleExpenseIndex({
    vehicleId: id,
  });

  const { mutate: deleteVehicleExpense, isPending: isDeletingVehicleExpense }
    = useVehicleExpenseDelete({
      onSuccess: () => {
        toast.success('Expense deleted');
        queryClient.invalidateQueries({ queryKey: ['vehicle-expenses'] });
      },
      onError: (error) => {
        console.error(error);
        toast.error('Failed to delete expense');
      },
    });

  const handleExpensesChange = () => {
    queryClient.invalidateQueries({ queryKey: ['vehicle-expenses'] });
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Vehicle Expenses</CardTitle>
        <CardAction>
          <AddExpenseDialog
            vehicleId={id}
            onChange={handleExpensesChange}
            open={openCreateDialog}
            setOpen={setOpenCreateDialog}
            trigger={(
              <Button
                variant="outline"
                onClick={() => setOpenCreateDialog(true)}
              >
                <PlusIcon />
                Add Expense
              </Button>
            )}
          />
        </CardAction>
      </CardHeader>

      <CardContent>
        <VehicleExpenseTable
          data={vehicleExpenses?.data ?? []}
          loading={isLoading || isDeletingVehicleExpense}
          actions={expense => (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditExpense(expense)}
              >
                <PencilIcon />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() =>
                  deleteVehicleExpense({
                    vehicleId: id,
                    expenseId: expense.id,
                  })}
              >
                <TrashIcon />
              </Button>
            </div>
          )}
        />
      </CardContent>

      <EditExpenseDialog
        vehicleId={id}
        expense={editExpense}
        setEditExpense={setEditExpense}
        onChange={handleExpensesChange}
      />
    </Card>
  );
}

function AddExpenseDialog({
  vehicleId,
  onChange,
  trigger,
  open,
  setOpen,
}: {
  vehicleId: string;
  onChange?: (expense: VehicleExpenseResource) => void;
  trigger: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { mutate: createVehicleExpense, isPending: isCreatingVehicleExpense }
    = useVehicleExpenseCreate({
      onSuccess: (data) => {
        toast.success('Expense created');
        setOpen?.(false);
        onChange?.(data.data);
      },
      onError: (error) => {
        console.error(error);
        toast.error('Failed to create expense');
      },
    });

  return (
    <VehicleExpenseFormDialog
      open={open}
      setOpen={setOpen}
      loading={isCreatingVehicleExpense}
      submit={(data) => {
        createVehicleExpense({ vehicleId, data });
      }}
      children={trigger}
    />
    // <Dialog open={open} onOpenChange={setOpen}>
    //   {trigger ?? <DialogTrigger asChild>{trigger}</DialogTrigger>}
    //   <DialogContent>
    //     <DialogTitle>Add Expense</DialogTitle>
    //     <DialogDescription>
    //       Add a new expense for the vehicle.
    //     </DialogDescription>
    //     <VehicleExpenseForm
    //       loading={isCreatingVehicleExpense}
    //       submit={(data) => {
    //         createVehicleExpense({ vehicleId, data });
    //       }}
    //     />
    //   </DialogContent>
    // </Dialog>
  );
}

function EditExpenseDialog({
  vehicleId,
  expense,
  setEditExpense,
  onChange,
}: {
  vehicleId: string;
  expense: VehicleExpenseResource | null;
  setEditExpense: (expense: VehicleExpenseResource | null) => void;
  onChange?: (expense: VehicleExpenseResource) => void;
}) {
  const { mutate: updateVehicleExpense, isPending: isUpdatingVehicleExpense }
    = useVehicleExpenseUpdate({
      onSuccess: (data) => {
        toast.success('Expense updated');
        setEditExpense(null);
        onChange?.(data.data);
      },
      onError: (error) => {
        console.error(error);
        toast.error('Failed to update expense');
      },
    });

  return (
    <VehicleExpenseFormDialog
      open={!!expense}
      setOpen={() => setEditExpense(null)}
      loading={isUpdatingVehicleExpense}
      initialValues={{ ...expense }}
      submit={(data) => {
        updateVehicleExpense({ vehicleId, expenseId: expense!.id, data });
      }}
    />
    // <Dialog open={!!expense} onOpenChange={() => setEditExpense(null)}>
    //   <DialogContent>
    //     <DialogTitle>Edit Expense</DialogTitle>
    //     <DialogDescription>Edit the expense for the vehicle.</DialogDescription>
    //     <VehicleExpenseForm
    //       initialValues={{ ...expense }}
    //       loading={isUpdatingVehicleExpense}
    //       submit={(data) => {
    //         updateVehicleExpense({
    //           vehicleId: vehicleId,
    //           expenseId: expense!.id,
    //           data,
    //         });
    //       }}
    //     />
    //   </DialogContent>
    // </Dialog>
  );
}
