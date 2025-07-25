import type { VehicleExpenseRequest } from "@/features/vehicle-expenses";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { VehicleExpenseForm } from "./vehicle-expense-form";

export type VehicleExpenseFormDialogProps = {
  children?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  loading?: boolean;
  submit?: (data: VehicleExpenseRequest) => void;
  initialValues?: Partial<VehicleExpenseRequest>;
};

export function VehicleExpenseFormDialog({
  children,
  open,
  setOpen,
  loading,
  submit,
  initialValues,
}: VehicleExpenseFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children ?? <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogTitle>Add Expense</DialogTitle>
        <DialogDescription>
          Add a new expense for the vehicle.
        </DialogDescription>
        <VehicleExpenseForm
          loading={loading}
          submit={submit}
          initialValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
}
