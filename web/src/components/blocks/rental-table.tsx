import type { RentalSummaryData } from '@/features/rentals';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fmt_currency } from '@/lib/utils';
import { CustomerTableCard } from './customer-table-card';
import { DateCard } from './date-card';
import { RentalStatusBadge } from './rental-status-badge';
import { VehicleTableCard } from './vehicle-table-card';
import { Link } from '@tanstack/react-router';

export interface RentalTableProps {
  data: RentalSummaryData[];
  loading?: boolean;
  actions?: (rental: RentalSummaryData) => React.ReactNode;
}

export function RentalTable({ data, loading, actions }: RentalTableProps) {
  const { t } = useTranslation(['rental', 'common']);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('rental:attributes.code')}</TableHead>
          <TableHead>{t('rental:attributes.customer')}</TableHead>
          <TableHead>{t('rental:attributes.vehicle')}</TableHead>
          <TableHead>{t('rental:attributes.pickup_date')}</TableHead>
          <TableHead>{t('rental:attributes.dropoff_date')}</TableHead>
          <TableHead>{t('rental:attributes.total_price')}</TableHead>
          <TableHead>{t('rental:attributes.status')}</TableHead>
          {actions && <TableHead className="text-right">{t('common:actions')}</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          && [1, 2, 3].map(i => (
            <TableRow key={i}>
              <TableCell colSpan={6} className="text-center">
                <div className="w-full animate-pulse bg-muted h-8 rounded-md"></div>
              </TableCell>
            </TableRow>
          ))}
        {data && data.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              {t('rental:not_found')}
            </TableCell>
          </TableRow>
        )}
        {data
          && data.length > 0
          && data.map(rental => (
            <TableRow key={rental.id}>
              <TableCell>
                <Link to="/app/rentals/$id" params={{ id: rental.rental_number }} className="hover:underline">
                  {rental.rental_number}
                </Link>
              </TableCell>
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
              <TableCell>{fmt_currency(rental.total_price)}</TableCell>
              <TableCell>
                <RentalStatusBadge status={rental.status ?? 'draft'} />
              </TableCell>
              {actions && (
                <TableCell className="flex gap-2 justify-end">{actions(rental)}</TableCell>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
