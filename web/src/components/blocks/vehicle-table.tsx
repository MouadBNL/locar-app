import type { VehicleResource } from '@/features/vehicles';

import { DataTable } from './datatable';
import { useVehicleTableColumns } from './vehicle-table-columns';

export interface VehicleTableProps {
  data: VehicleResource[];
  loading?: boolean;
  actions?: (vehicle: VehicleResource) => React.ReactNode;
}

export function VehicleTable({ data, loading, actions }: VehicleTableProps) {
  const { columns } = useVehicleTableColumns({ actions });
  return <DataTable data={data} loading={loading} columns={columns} rowId={row => row.id} />;
}
