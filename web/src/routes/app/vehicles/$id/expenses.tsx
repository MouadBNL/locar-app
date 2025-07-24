import { VehicleExpenseForm } from "@/components/blocks/vehicle-expense-form";
import { VehicleExpenseTable } from "@/components/blocks/vehicle-expense-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useVehicleExpenseCreate,
  useVehicleExpenseDelete,
  useVehicleExpenseIndex,
  useVehicleExpenseUpdate,
  type VehicleExpenseResource,
} from "@/features/vehicle-expenses";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/vehicles/$id/expenses")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();

  const [editExpense, setEditExpense] = useState<VehicleExpenseResource | null>(
    null
  );

  const { data: vehicleExpenses, isLoading } = useVehicleExpenseIndex({
    vehicleId: id,
  });

  const { mutate: deleteVehicleExpense, isPending: isDeletingVehicleExpense } =
    useVehicleExpenseDelete({
      onSuccess: () => {
        toast.success("Expense deleted");
        queryClient.invalidateQueries({ queryKey: ["vehicle-expenses"] });
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to delete expense");
      },
    });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Vehicle Expenses</CardTitle>
        <CardAction>
          <AddExpenseDialog />
        </CardAction>
      </CardHeader>

      <CardContent>
        <VehicleExpenseTable
          data={vehicleExpenses?.data ?? []}
          loading={isLoading || isDeletingVehicleExpense}
          actions={(expense) => (
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
                  })
                }
              >
                <TrashIcon />
              </Button>
            </div>
          )}
        />
      </CardContent>

      <EditExpenseDialog
        expense={editExpense}
        setEditExpense={setEditExpense}
      />
    </Card>
  );
}

function AddExpenseDialog() {
  const { id } = Route.useParams();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: createVehicleExpense, isPending: isCreatingVehicleExpense } =
    useVehicleExpenseCreate({
      onSuccess: () => {
        toast.success("Expense created");
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["vehicle-expenses"] });
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to create expense");
      },
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon />
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Expense</DialogTitle>
        <DialogDescription>
          Add a new expense for the vehicle.
        </DialogDescription>
        <VehicleExpenseForm
          loading={isCreatingVehicleExpense}
          submit={(data) => {
            createVehicleExpense({ vehicleId: id, data });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

function EditExpenseDialog({
  expense,
  setEditExpense,
}: {
  expense: VehicleExpenseResource | null;
  setEditExpense: (expense: VehicleExpenseResource | null) => void;
}) {
  const queryClient = useQueryClient();
  const { id } = Route.useParams();

  const { mutate: updateVehicleExpense, isPending: isUpdatingVehicleExpense } =
    useVehicleExpenseUpdate({
      onSuccess: () => {
        toast.success("Expense updated");
        setEditExpense(null);
        queryClient.invalidateQueries({ queryKey: ["vehicle-expenses"] });
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to update expense");
      },
    });

  return (
    <Dialog open={!!expense} onOpenChange={() => setEditExpense(null)}>
      <DialogContent>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogDescription>Edit the expense for the vehicle.</DialogDescription>
        <VehicleExpenseForm
          initialValues={{ ...expense }}
          loading={isUpdatingVehicleExpense}
          submit={(data) => {
            updateVehicleExpense({
              vehicleId: id,
              expenseId: expense!.id,
              data,
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
