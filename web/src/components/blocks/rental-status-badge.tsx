import type { RentalStatus } from '@/features/rentals';
import { CheckIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { str_to_titlecase } from '@/lib/utils';
import { Badge } from '../ui/badge';

export function RentalStatusBadge({ status }: { status: RentalStatus }) {
  const { t } = useTranslation(['rental', 'common']);
  const color
    = status === 'draft'
      ? 'bg-accent-foreground'
      : status === 'started'
        ? ' bg-emerald-500'
        : status === 'finished'
          ? 'bg-blue-500'
          : 'bg-red-500';
  return (
    <Badge variant="outline" className="gap-2 text-sm">
      {status === 'finished'
        ? (
            <CheckIcon className="text-emerald-500" size={12} aria-hidden="true" />
          )
        : (
            <span
              className={`size-1.5 rounded-full ${color}`}
              aria-hidden="true"
            >
            </span>
          )}
      {t(`rental:status_enum.${status}`, {
        defaultValue: str_to_titlecase(status),
      })}
    </Badge>
  );
}
