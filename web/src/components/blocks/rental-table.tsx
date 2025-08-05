import type { RentalSummaryData } from '@/features/rentals';

import { DataTable } from './datatable';
import { useRentalTableColumns } from './rental-table-columns';

export interface RentalTableProps {
  data: RentalSummaryData[];
  loading?: boolean;
  actions?: (rental: RentalSummaryData) => React.ReactNode;
}

export function RentalTable({ data, loading, actions }: RentalTableProps) {
  const columns = useRentalTableColumns({ actions });

  return <DataTable data={data} loading={loading} columns={columns} rowId={row => row.rental_number} />;
}
