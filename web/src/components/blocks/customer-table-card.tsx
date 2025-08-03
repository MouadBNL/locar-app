import { Link } from '@tanstack/react-router';
import { PhoneIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export interface CustomerTableCardProps {
  id: string;
  fullName: string;
  identifier: string;
  phone: string;
}
export function CustomerTableCard(props: CustomerTableCardProps) {
  const { t } = useTranslation(['customer', 'common']);
  return (
    <div className="flex gap-6 w-full justify-start items-center">
      <div>
        <Link to="/app/customers/$id" params={{ id: props.id }} className="hover:underline">
          <p className="text-sm">{props.fullName}</p>
        </Link>
        <p className="text-muted-foreground text-xs">
          <span className="font-bold">{t('customer:attributes.id_number')}</span>
          {' '}
          {props.identifier}
        </p>
      </div>
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" disabled={!props.phone}>
              <PhoneIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{props.phone}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
