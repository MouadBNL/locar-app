import type { RentalPaymentResource } from "@/features/rental-payments";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "../ui/table";
import { Loader2 } from "lucide-react";

export const RentalPaymentTable = ({
  payments,
  actions,
  loading,
}: {
  payments: RentalPaymentResource[];
  actions?: (payment: RentalPaymentResource) => React.ReactNode;
  loading?: boolean;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Payment Method</TableHead>
          <TableHead>Payment Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Payment Date</TableHead>
          <TableHead>Reference</TableHead>
          <TableHead>Note</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center bg-background animate-pulse"
            >
              <Loader2 className="animate-spin" />
            </TableCell>
          </TableRow>
        ) : (
          <>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.method}</TableCell>
                <TableCell>{payment.type}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.reference}</TableCell>
                <TableCell>{payment.note}</TableCell>
                <TableCell>{actions?.(payment)}</TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
};
