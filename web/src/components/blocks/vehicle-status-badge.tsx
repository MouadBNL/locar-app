import type { VehicleStatusType } from '@/features/vehicles';
import { useTranslation } from 'react-i18next';
import { str_to_titlecase } from '@/lib/utils';
import { Badge } from '../ui/badge';

export function VehicleStatusBadge({ status }: { status: VehicleStatusType }) {
  const { t } = useTranslation();
  const color
    = status === 'booked' || status === 'rented'
      ? 'bg-yellow-500'
      : status === 'available'
        ? ' bg-emerald-500'
        : status === 'maintenance'
          ? 'bg-red-500'
          : 'bg-accent-foreground';

  return (
    <Badge variant="outline" className="gap-2 text-sm">
      <span
        className={`size-1.5 rounded-full ${color}`}
        aria-hidden="true"
      >
      </span>
      {t(`vehicle:status_enum.${status}`, {
        defaultValue: str_to_titlecase(status),
      })}
    </Badge>
  );
}
