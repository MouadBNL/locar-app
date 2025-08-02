import type { RentalChargesSummaryData } from '@/features/rentals';
import { BanknoteIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn, fmt_currency } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

export function RentalChargesSummary(props: {
  charges?: RentalChargesSummaryData;
}) {
  const { t } = useTranslation(['rental', 'payment', 'common']);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BanknoteIcon />
          {t('rental:charges.summary')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!props.charges
          ? (
              <div className="flex items-center justify-center">
                <span className="text-muted-foreground text-lg">
                  {t('rental:charges.no_charges_found')}
                </span>
              </div>
            )
          : (
              <div className="grid grid-cols-1 gap-2">
                <RentalChargesSummaryItem
                  label={t('rental:charges.attributes.day_rate')}
                  value={fmt_currency(props.charges.day_rate)}
                />
                <RentalChargesSummaryItem
                  label={t('rental:charges.attributes.day_quantity')}
                  value={props.charges.day_quantity.toString()}
                />
                <RentalChargesSummaryItem
                  label={t('rental:charges.attributes.day_total')}
                  value={fmt_currency(props.charges.day_total)}
                />

                <Separator />

                <RentalChargesSummaryItem
                  label={t('rental:charges.attributes.extra_rate')}
                  value={fmt_currency(props.charges.extra_rate)}
                />
                <RentalChargesSummaryItem
                  label={t('rental:charges.attributes.extra_quantity')}
                  value={props.charges.extra_quantity.toString()}
                />
                <RentalChargesSummaryItem
                  label={t('rental:charges.attributes.extra_total')}
                  value={fmt_currency(props.charges.extra_total)}
                />

                <Separator />

                <RentalChargesSummaryItem
                  label={t('rental:charges.attributes.total')}
                  value={fmt_currency(props.charges.total)}
                  labelClassName="font-bold text-base"
                  valueClassName="font-bold text-base"
                />
                <RentalChargesSummaryItem
                  label={t('payment:extra.total_paid')}
                  value={fmt_currency(props.charges.paid)}
                  labelClassName="font-bold text-base"
                  valueClassName="font-bold text-base"
                />
                <RentalChargesSummaryItem
                  label={t('payment:extra.total_due')}
                  value={fmt_currency(props.charges.due)}
                  labelClassName="font-bold text-base"
                  valueClassName="font-bold text-base"
                />
                <Separator />
                <RentalChargesSummaryItem
                  label={t('payment:extra.deposit_total')}
                  value={fmt_currency(props.charges.deposit)}
                />
                <RentalChargesSummaryItem
                  label={t('payment:extra.deposit_refunded')}
                  value={fmt_currency(props.charges.refunded)}
                />
                <RentalChargesSummaryItem
                  label={t('payment:extra.deposit_due')}
                  value={fmt_currency(props.charges.refund_due)}
                />
              </div>
            )}
      </CardContent>
    </Card>
  );
}

function RentalChargesSummaryItem({
  label,
  value,
  className,
  labelClassName,
  valueClassName,
}: {
  label: string;
  value: string;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}) {
  return (
    <div className={cn('flex justify-between text-sm', className)}>
      <span className={cn('text-muted-foreground', labelClassName)}>
        {label}
      </span>
      <span className={cn('font-medium', valueClassName)}>{value}</span>
    </div>
  );
}
