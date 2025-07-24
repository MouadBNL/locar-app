import {
  useVehicleExpenseDelete,
  useVehicleExpenseIndex,
  VehicleExpenseTypeEnum,
  type VehicleExpenseResource,
} from "@/features/vehicle-expenses";
import {
  AddExpenseDialog,
  EditExpenseDialog,
} from "@/routes/app/vehicles/$id/expenses";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { fmt_currency } from "@/lib/utils";

export type VehicleExpenseListProps = {
  vehicleId: string;
  value: string[];
  onValueChange?: (value: string[]) => void;
};

export function VehicleExpenseList({
  vehicleId,
  value,
  onValueChange,
}: VehicleExpenseListProps) {
  const [editExpense, setEditExpense] = useState<VehicleExpenseResource | null>(
    null
  );
  const {
    data: expenses,
    isLoading,
    refetch,
  } = useVehicleExpenseIndex({
    vehicleId,
    ids: value,
  });

  const { mutate: deleteExpense } = useVehicleExpenseDelete({
    onSuccess: () => {
      onValueChange?.(value.filter((id) => id !== editExpense?.id));
    },
  });

  const handleValueChange = (expense: VehicleExpenseResource) => {
    const newValues = Array.from(new Set([...value, expense.id]));
    console.log("newValues", newValues);
    onValueChange?.(newValues);
    refetch();
  };

  return (
    <div className="mt-2">
      <div className="flex gap-2 justify-between items-center">
        <div>
          <p className="text-base font-bold">
            Total:{" "}
            {fmt_currency(
              expenses?.data?.reduce(
                (acc, expense) => acc + expense.amount,
                0
              ) ?? 0
            )}
          </p>
          <p className="text-sm text-muted-foreground">
            {expenses?.data?.length} expenses
          </p>
        </div>
        <AddExpenseDialog vehicleId={vehicleId} onChange={handleValueChange} />
      </div>
      <div className="grid grid-cols-1 gap-2 mt-6">
        {isLoading && <div>Loading...</div>}
        {expenses?.data?.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between gap-2 p-2 bg-muted/50 rounded-md"
          >
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">
                {expense.title}{" "}
                {VehicleExpenseTypeEnum[expense.type] ?? "Other"}
              </div>
              <div className="text-sm text-muted-foreground">
                {fmt_currency(expense.amount)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditExpense(expense);
                }}
              >
                <PencilIcon />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  deleteExpense({
                    vehicleId,
                    expenseId: expense.id,
                  });
                }}
              >
                <TrashIcon />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <EditExpenseDialog
        vehicleId={vehicleId}
        expense={editExpense}
        setEditExpense={setEditExpense}
        onChange={handleValueChange}
      />
    </div>
  );
}
