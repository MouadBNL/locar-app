import type { CustomerResource } from '@/features/customers';
import { useCustomerTableColumns } from './customer-table-columns';
import { DataTable } from './datatable';

export interface CustomerTableProps {
  data: CustomerResource[];
  loading?: boolean;
  actions?: (customer: CustomerResource) => React.ReactNode;
}

export function CustomerTable({ data, loading, actions }: CustomerTableProps) {
  const { columns } = useCustomerTableColumns({ actions });
  return <DataTable data={data} loading={loading} columns={columns} rowId={row => row.id!} />;
}
