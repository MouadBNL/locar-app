import type { ReservationResource } from '@/features/reservations';
import { DataTable } from './datatable';
import { useReservationTableColumns } from './reservation-table-columns';

export interface ReservationTableProps {
  data: ReservationResource[];
  loading?: boolean;
  actions?: (reservation: ReservationResource) => React.ReactNode;
}

export function ReservationTable({
  data,
  loading,
  actions,
}: ReservationTableProps) {
  const { columns } = useReservationTableColumns({ actions });

  return <DataTable data={data} loading={loading} columns={columns} rowId={row => row.id} />;
}
