import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { RentalSummaryData } from "@/features/rentals";
import { DateCard } from "./date-card";
import { CustomerTableCard } from "./customer-table-card";
import { VehicleTableCard } from "./vehicle-table-card";

export type RentalTableProps = {
  data: RentalSummaryData[];
  loading?: boolean;
  actions?: (rental: RentalSummaryData) => React.ReactNode;
};

export function RentalTable({ data, loading, actions }: RentalTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Vehicle</TableHead>
          <TableHead>Pickup Date</TableHead>
          <TableHead>Return Date</TableHead>
          <TableHead>Total Price</TableHead>
          {actions && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading &&
          [1, 2, 3].map((i) => (
            <TableRow key={i}>
              <TableCell colSpan={6} className="text-center">
                <div className="w-full animate-pulse bg-muted h-8 rounded-md"></div>
              </TableCell>
            </TableRow>
          ))}
        {data && data.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No rentals found
            </TableCell>
          </TableRow>
        )}
        {data &&
          data.length > 0 &&
          data.map((rental) => (
            <TableRow key={rental.id}>
              <TableCell>{rental.rental_number}</TableCell>
              <TableCell>
                <CustomerTableCard
                  id={rental.customer.id}
                  fullName={rental.customer.full_name}
                  identifier={rental.customer.identifier}
                  phone={rental.customer.phone}
                />
              </TableCell>
              <TableCell>
                <VehicleTableCard
                  id={rental.vehicle.id}
                  make={rental.vehicle.make}
                  model={rental.vehicle.model}
                  year={rental.vehicle.year}
                  license_plate={rental.vehicle.license_plate}
                />
              </TableCell>
              <TableCell>
                <DateCard date={rental.departure_date} />
              </TableCell>
              <TableCell>
                <DateCard date={rental.return_date} />
              </TableCell>
              <TableCell>{rental.total_price}</TableCell>
              {actions && (
                <TableCell className="flex gap-2">{actions(rental)}</TableCell>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
