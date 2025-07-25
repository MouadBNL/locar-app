import {
  useVehicleExpenseIndex,
  VehicleExpenseTypeEnum,
  type VehicleExpenseResource,
} from "@/features/vehicle-expenses";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { fmt_currency } from "@/lib/utils";

export type VehicleExpenseListProps = {
  vehicleId: string;
  value: string[];
  onValueChange?: (value: string[]) => void;
  onAddExpense?: () => void;
  onEditExpense?: (expense: VehicleExpenseResource) => void;
  onDeleteExpense?: (expense: VehicleExpenseResource) => void;
};

export function VehicleExpenseList({
  vehicleId,
  value,
  onAddExpense,
  onEditExpense,
  onDeleteExpense,
}: VehicleExpenseListProps) {
  const { data: expenses, isLoading } = useVehicleExpenseIndex({
    vehicleId,
    ids: value,
  });

  // const handleAddExpense = async () => {
  //   const expense = await onAddExpense?.();
  //   if (!expense) return;
  //   const newValues = Array.from(new Set([...value, expense.id]));
  //   console.log("newValues", newValues);
  //   onValueChange?.(newValues);
  // };

  // const handleEditExpense = async (expense: VehicleExpenseResource) => {
  //   const newExpense = await onEditExpense?.(expense);
  //   if (!expense) return;
  //   const newValues = Array.from(new Set([...value, expense.id]));
  //   console.log("newValues", newValues);
  //   onValueChange?.(newValues);
  // };

  // const handleDeleteExpense = async (expense: VehicleExpenseResource) => {
  //   await onDeleteExpense?.(expense);
  //   const newValues = value.filter((id) => id !== expense.id);
  //   onValueChange?.(newValues);
  // };

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

        <Button variant="outline" onClick={onAddExpense}>
          <PlusIcon />
          Add Expense
        </Button>
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
                  onEditExpense?.(expense);
                }}
              >
                <PencilIcon />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  onDeleteExpense?.(expense);
                }}
              >
                <TrashIcon />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
