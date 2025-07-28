import type { CustomerResource } from '@/features/customers';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CustomerStatusBadge } from './customer-status-badge';

export interface CustomerTableProps {
  data: CustomerResource[];
  loading?: boolean;
  actions?: (customer: CustomerResource) => React.ReactNode;
}

export function CustomerTable({ data, loading, actions }: CustomerTableProps) {
  const { t } = useTranslation(['customer', 'common']);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('customer:attributes.first_name')}</TableHead>
          <TableHead>{t('customer:attributes.last_name')}</TableHead>
          <TableHead>{t('customer:attributes.email')}</TableHead>
          <TableHead>{t('customer:attributes.phone')}</TableHead>
          <TableHead>{t('customer:attributes.status')}</TableHead>
          {actions && <TableHead>{t('common:actions')}</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          && [1, 2, 3].map(i => (
            <TableRow key={i}>
              <TableCell colSpan={5} className="text-center">
                <div className="w-full animate-pulse bg-muted h-8 rounded-md"></div>
              </TableCell>
            </TableRow>
          ))}
        {data && data.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              {t('customer:no_customers_found')}
            </TableCell>
          </TableRow>
        )}
        {data
          && data.length > 0
          && data.map(customer => (
            <TableRow key={customer.id}>
              <TableCell>{customer.first_name}</TableCell>
              <TableCell>{customer.last_name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>
                <CustomerStatusBadge status={customer.status} />
              </TableCell>
              {actions && (
                <TableCell className="flex gap-2">
                  {actions(customer)}
                </TableCell>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
