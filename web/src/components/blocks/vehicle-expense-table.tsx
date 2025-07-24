import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DateCard } from "./date-card";
import {
  VehicleExpenseTypeEnum,
  type VehicleExpenseResource,
} from "@/features/vehicle-expenses";
import { fmt_currency } from "@/lib/utils";

export type VehicleExpenseTableProps = {
  data: VehicleExpenseResource[];
  loading?: boolean;
  actions?: (vehicleExpense: VehicleExpenseResource) => React.ReactNode;
};

export function VehicleExpenseTable({
  data,
  loading,
  actions,
}: VehicleExpenseTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Reference</TableHead>
          <TableHead>Receipt</TableHead>
          <TableHead>Notes</TableHead>
          {actions && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading &&
          [1, 2, 3].map((i) => (
            <TableRow key={i}>
              <TableCell colSpan={5} className="text-center">
                <div className="w-full animate-pulse bg-muted h-8 rounded-md"></div>
              </TableCell>
            </TableRow>
          ))}
        {data && data.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No vehicle expenses found
            </TableCell>
          </TableRow>
        )}
        {data &&
          data.length > 0 &&
          data.map((vehicleExpense) => (
            <TableRow key={vehicleExpense.id}>
              <TableCell>
                {VehicleExpenseTypeEnum[vehicleExpense.type] ?? "Other"}
              </TableCell>
              <TableCell>{fmt_currency(vehicleExpense.amount)}</TableCell>
              <TableCell>
                <DateCard date={vehicleExpense.date} />
              </TableCell>
              <TableCell>{vehicleExpense.title}</TableCell>
              <TableCell>{vehicleExpense.reference}</TableCell>
              <TableCell>{vehicleExpense.receipt_document?.id}</TableCell>
              <TableCell>{vehicleExpense.notes}</TableCell>
              {actions && (
                <TableCell className="flex gap-2">
                  {actions(vehicleExpense)}
                </TableCell>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
