import type { ReservationResource } from '@/features/reservations';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CustomerTableCard } from './customer-table-card';
import { DateCard } from './date-card';
import { VehicleTableCard } from './vehicle-table-card';

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
  const { t } = useTranslation(['reservation', 'common']);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('reservation:attributes.reservation_number')}</TableHead>
          <TableHead>{t('reservation:attributes.customer')}</TableHead>
          <TableHead>{t('reservation:attributes.vehicle')}</TableHead>
          <TableHead>{t('reservation:attributes.check_in_date')}</TableHead>
          <TableHead>{t('reservation:attributes.check_out_date')}</TableHead>
          <TableHead>{t('reservation:attributes.total_price')}</TableHead>
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
              {t('reservation:no_reservations_found')}
            </TableCell>
          </TableRow>
        )}
        {data
          && data.length > 0
          && data.map(reservation => (
            <TableRow key={reservation.id}>
              <TableCell>
                {reservation.reservation_number}
              </TableCell>
              <TableCell>
                <CustomerTableCard
                  id={reservation.customer_id}
                  fullName={reservation.customer.full_name}
                  identifier={reservation.customer.identifier}
                  phone={reservation.customer.phone}
                />
              </TableCell>
              <TableCell>
                <VehicleTableCard
                  id={reservation.vehicle_id}
                  make={reservation.vehicle.make}
                  model={reservation.vehicle.model}
                  year={reservation.vehicle.year}
                  license_plate={reservation.vehicle.license_plate}
                />
              </TableCell>
              <TableCell>
                <DateCard date={reservation.check_in_date} />
              </TableCell>
              <TableCell>
                <DateCard date={reservation.check_out_date} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {reservation.total_price}
                    {' '}
                    {t('common:dh')}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {reservation.total_days}
                    {' '}
                    {t('common:days')}
                  </span>
                </div>
              </TableCell>
              {actions && (
                <TableCell className="flex gap-2">
                  {actions(reservation)}
                </TableCell>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
