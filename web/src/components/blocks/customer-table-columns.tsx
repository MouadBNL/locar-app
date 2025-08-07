import type { ColumnDef } from '@tanstack/react-table';
import type { CustomerResource } from '@/features/customers';
import { useTranslation } from 'react-i18next';

import { CustomerStatusBadge } from './customer-status-badge';

export function useCustomerTableColumns({ actions }: { actions?: (customer: CustomerResource) => React.ReactNode }) {
  const { t } = useTranslation(['customer', 'common']);
  const columns: ColumnDef<CustomerResource>[] = [
    {
      header: () => t('customer:attributes.first_name'),
      accessorKey: 'first_name',
      cell: ({ row }) => <span>{row.original.first_name}</span>,
    },
    {
      header: () => t('customer:attributes.last_name'),
      accessorKey: 'last_name',
      cell: ({ row }) => <span>{row.original.last_name}</span>,
    },
    {
      header: () => t('customer:attributes.id_card_number'),
      accessorKey: 'id_card_number',
      cell: ({ row }) => <span>{row.original.id_card_number}</span>,
    },
    // {
    //   header: () => t('customer:attributes.email'),
    //   accessorKey: 'email',
    //   cell: ({ row }) => <span>{row.original.email}</span>,
    // },
    {
      header: () => t('customer:attributes.phone'),
      accessorKey: 'phone',
      cell: ({ row }) => <span>{row.original.phone}</span>,
    },
    {
      header: () => t('customer:attributes.status'),
      accessorKey: 'status',
      cell: ({ row }) => <CustomerStatusBadge status={row.original.status} />,
    },
    {
      header: () => t('common:actions'),
      accessorKey: 'actions',
      cell: ({ row }) => <div className="flex gap-2 justify-end">{actions?.(row.original)}</div>,
    },
  ];
  return { columns };
}
