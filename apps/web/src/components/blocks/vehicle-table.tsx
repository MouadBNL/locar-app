import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type VehicleData } from "@locar/api/entities";

export type VehicleTableProps = {
  data: VehicleData[];
  loading?: boolean;
  actions?: (vehicle: VehicleData) => React.ReactNode;
};

export function VehicleTable({ data, loading, actions }: VehicleTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Plate</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Color</TableHead>
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
              No vehicles found
            </TableCell>
          </TableRow>
        )}
        {data &&
          data.length > 0 &&
          data.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.license_plate}</TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{vehicle.year}</TableCell>
              <TableCell>{vehicle.color}</TableCell>
              {actions && (
                <TableCell className="flex gap-2">{actions(vehicle)}</TableCell>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
