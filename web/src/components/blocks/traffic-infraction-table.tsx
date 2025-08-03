import type { TrafficInfractionResource } from '@/features/traffic-infractions';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { CustomerTableCard } from './customer-table-card';
import { DateCard } from './date-card';
import { VehicleTableCard } from './vehicle-table-card';

export function TrafficInfractionTable({
  data,
  loading,
  actions,
}: {
  data: TrafficInfractionResource[];
  loading?: boolean;
  actions?: (trafficInfraction: TrafficInfractionResource) => React.ReactNode;
}) {
  const { t } = useTranslation(['common', 'traffic']);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('traffic:attributes.date')}</TableHead>
          <TableHead>{t('traffic:attributes.vehicle')}</TableHead>
          <TableHead>{t('traffic:attributes.customer')}</TableHead>
          <TableHead>{t('traffic:attributes.title')}</TableHead>
          <TableHead>{t('traffic:attributes.location')}</TableHead>
          <TableHead>{t('traffic:attributes.document')}</TableHead>
          {actions && <TableHead>{t('common:actions')}</TableHead>}
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
              {t('common:no_data_found')}
            </TableCell>
          </TableRow>
        )}
        {data
          && data.length > 0
          && data.map(trafficInfraction => (
            <TableRow key={trafficInfraction.id}>
              <TableCell>
                {trafficInfraction.date
                  ? (
                      <DateCard
                        date={trafficInfraction.date}
                      />
                    )
                  : (
                      <span className="text-sm text-muted-foreground">
                        {t('common:no_data_found')}
                      </span>
                    )}
              </TableCell>

              <TableCell>
                <CustomerTableCard
                  id={trafficInfraction.customer_id ?? ''}
                  fullName={trafficInfraction.customer.full_name}
                  identifier={trafficInfraction.customer.identifier}
                  phone={trafficInfraction.customer.phone}
                />
              </TableCell>

              <TableCell>
                <VehicleTableCard
                  id={trafficInfraction.vehicle_id ?? ''}
                  make={trafficInfraction.vehicle.make}
                  model={trafficInfraction.vehicle.model}
                  year={trafficInfraction.vehicle.year}
                  license_plate={trafficInfraction.vehicle.license_plate}
                />
              </TableCell>

              <TableCell>
                {trafficInfraction.title}
              </TableCell>

              <TableCell>
                {trafficInfraction.location}
              </TableCell>

              {actions && (
                <TableCell className="flex gap-2">
                  {actions(trafficInfraction)}
                </TableCell>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
