import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface CustomerSummaryCardProps {
  id: string;
  firstName: string;
  lastName: string;
  id_number: string;
  license: string;
  phone: string;
  address: string;
}

export function CustomerSummaryCard(props: CustomerSummaryCardProps) {
  const { t } = useTranslation(['customer', 'common']);
  const fallback
    = props.firstName.toUpperCase().charAt(0)
      + props.lastName.toUpperCase().charAt(0);

  return (
    <div className="flex h-full w-full items-start justify-between gap-4">
      <div>
        <Avatar className="size-12 rounded-lg">
          <AvatarImage src="#" />
          <AvatarFallback className="rounded-lg">{fallback}</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full">
        <div className="mb-4">
          <h4 className="text-lg font-bold -mb-1">
            {props.firstName}
            {' '}
            {props.lastName}
          </h4>
          <h5 className="text-sm text-muted-foreground">{props.phone}</h5>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 text-sm gap-2">
          <div className="flex gap-2 items-start justify-between lg:justify-start">
            <span>{t('customer:attributes.id_number')}</span>
            {' '}
            <span className="text-muted-foreground">{props.id_number}</span>
          </div>
          <div className="flex gap-2 items-start justify-between lg:justify-start">
            <span>{t('customer:attributes.driver_license_number')}</span>
            {' '}
            <span className="text-muted-foreground">{props.license}</span>
          </div>
          <div className="flex gap-2 items-start justify-between lg:justify-start lg:col-span-2">
            <span>{t('customer:attributes.address')}</span>
            {' '}
            <span className="text-muted-foreground">{props.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
