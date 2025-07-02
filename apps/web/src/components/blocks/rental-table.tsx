import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type RentalData } from "@locar/api/entities";

export type RentalTableProps = {
  data: RentalData[];
  loading?: boolean;
  actions?: (rental: RentalData) => React.ReactNode;
};

export function RentalTable({ data, loading, actions }: RentalTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Vehicle</TableHead>
          <TableHead>Started At</TableHead>
          <TableHead>Finished At</TableHead>
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
              No rentals found
            </TableCell>
          </TableRow>
        )}
        {data &&
          data.length > 0 &&
          data.map((rental) => (
            <TableRow key={rental.id}>
              <TableCell>{rental.code}</TableCell>
              <TableCell>
                {rental.customer?.first_name} {rental.customer?.last_name}
              </TableCell>
              <TableCell>
                {rental.vehicle?.make} {rental.vehicle?.model}
              </TableCell>
              <TableCell>{rental.started_at}</TableCell>
              <TableCell>{rental.finished_at}</TableCell>
              {actions && (
                <TableCell className="flex gap-2">{actions(rental)}</TableCell>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
