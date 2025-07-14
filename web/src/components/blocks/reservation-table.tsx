import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ReservationResource } from "@/features/reservations";
import { CustomerTableCard } from "./customer-table-card";
import { VehicleTableCard } from "./vehicle-table-card";
import { DateCard } from "./date-card";

export type ReservationTableProps = {
  data: ReservationResource[];
  loading?: boolean;
  actions?: (reservation: ReservationResource) => React.ReactNode;
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
          <TableHead>Total Price</TableHead>
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
                <CustomerTableCard
                  id={reservation.customer_id}
                  fullName={reservation.customer.full_name}
                  identifier={reservation.customer.identifier}
                  phone={reservation.customer.phone}
                />
              </TableCell>
              <TableCell>
                <VehicleTableCard
                  id={reservation.vehicle_id}
                  make={reservation.vehicle.make}
                  model={reservation.vehicle.model}
                  year={reservation.vehicle.year}
                  license_plate={reservation.vehicle.license_plate}
                />
              </TableCell>
              <TableCell>
                <DateCard date={reservation.check_in_date} />
              </TableCell>
              <TableCell>
                <DateCard date={reservation.check_out_date} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {reservation.total_price} Dh
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {reservation.total_days} days
                  </span>
                </div>
              </TableCell>
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
