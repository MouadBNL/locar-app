import type { CustomerStatus } from '@/features/customers';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { str_to_titlecase } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export function CustomerStatusBadge({ status }: { status?: CustomerStatus }) {
  const { t } = useTranslation(['customer', 'common']);

  if (!status)
    return null;

  if (status.status === 'booked') {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/app/reservations/$id" params={{ id: status.entity_id }}>
            <Badge variant="outline" className="gap-2">
              <span
                className="size-1.5 rounded-full bg-yellow-500"
                aria-hidden="true"
              >
              </span>
              {t(`customer:status_enum.${status.status}`, {
                defaultValue: str_to_titlecase(status.status),
              })}
            </Badge>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('customer:click_to_view_reservation')}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  if (status.status === 'renting') {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/app/rentals/$id" params={{ id: status.entity_id }}>
            <Badge variant="outline" className="gap-2">
              <span
                className="size-1.5 rounded-full bg-emerald-500"
                aria-hidden="true"
              >
              </span>
              {t(`customer:status_enum.${status.status}`, {
                defaultValue: str_to_titlecase(status.status),
              })}
            </Badge>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('customer:click_to_view_rental')}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Badge variant="outline" className="gap-2">
      <span
        className="size-1.5 rounded-full bg-accent-foreground"
        aria-hidden="true"
      >
      </span>
      {t(`customer:status_enum.${status.status}`, {
        defaultValue: str_to_titlecase(status.status),
      })}
    </Badge>
  );
}
