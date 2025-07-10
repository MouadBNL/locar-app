import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type ReservationData } from "@locar/api/entities";

export type ReservationTableProps = {
  data: ReservationData[];
  loading?: boolean;
  actions?: (reservation: ReservationData) => React.ReactNode;
};

export function ReservationTable({
  data,
  loading,
  actions,
}: ReservationTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Vehicle</TableHead>
          <TableHead>Checkin Date</TableHead>
          <TableHead>Checkout Date</TableHead>
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
              No reservations found
            </TableCell>
          </TableRow>
        )}
        {data &&
          data.length > 0 &&
          data.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>
                {reservation.customer?.first_name}{" "}
                {reservation.customer?.last_name}
              </TableCell>
              <TableCell>
                {reservation.vehicle?.make} {reservation.vehicle?.model}
              </TableCell>
              <TableCell>{reservation.checkin_date}</TableCell>
              <TableCell>{reservation.checkout_date}</TableCell>
              {actions && (             
                <TableCell className="flex gap-2">
                  {actions(reservation)}
                </TableCell>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
