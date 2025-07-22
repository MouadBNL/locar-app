import { BanknoteIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { cn, fmt_currency } from "@/lib/utils";

export type RentalChargesSummaryProps = {
  day_rate: number;
  day_quantity: number;
  day_total: number;
  extra_rate: number;
  extra_quantity: number;
  extra_total: number;
  insurance_rate: number;
  insurance_quantity: number;
  insurance_total: number;
  total: number;
  paid: number;
  due: number;
  deposit: number;
  refunded: number;
  refund_due: number;
};
export function RentalChargesSummary(props: RentalChargesSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BanknoteIcon />
          Summary of charges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2">
          <RentalChargesSummaryItem
            label="Day Rate"
            value={fmt_currency(props.day_rate)}
          />
          <RentalChargesSummaryItem
            label="Day Quantity"
            value={props.day_quantity.toString()}
          />
          <RentalChargesSummaryItem
            label="Day Total"
            value={fmt_currency(props.day_total)}
          />

          <Separator />

          <RentalChargesSummaryItem
            label="Extra Rate"
            value={fmt_currency(props.extra_rate)}
          />
          <RentalChargesSummaryItem
            label="Extra Quantity"
            value={props.extra_quantity.toString()}
          />
          <RentalChargesSummaryItem
            label="Extra Total"
            value={fmt_currency(props.extra_total)}
          />

          <Separator />

          <RentalChargesSummaryItem
            label="Insurance Rate"
            value={fmt_currency(props.insurance_rate)}
          />
          <RentalChargesSummaryItem
            label="Insurance Quantity"
            value={props.insurance_quantity.toString()}
          />
          <RentalChargesSummaryItem
            label="Insurance Total"
            value={fmt_currency(props.insurance_total)}
          />

          <Separator />

          <RentalChargesSummaryItem
            label="Total"
            value={fmt_currency(props.total)}
            labelClassName="font-bold text-base"
            valueClassName="font-bold text-base"
          />
          <Separator />
          <RentalChargesSummaryItem
            label="Paid"
            value={fmt_currency(props.paid)}
          />
          <RentalChargesSummaryItem
            label="Due"
            value={fmt_currency(props.due)}
          />
          <RentalChargesSummaryItem
            label="Deposit"
            value={fmt_currency(props.deposit)}
          />
          <RentalChargesSummaryItem
            label="Refunded"
            value={fmt_currency(props.refunded)}
          />
          <RentalChargesSummaryItem
            label="Refund due"
            value={fmt_currency(props.refund_due)}
          />
        </div>
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
    <div className={cn("flex justify-between text-sm", className)}>
      <span className={cn("text-muted-foreground", labelClassName)}>
        {label}
      </span>
      <span className={cn("font-medium", valueClassName)}>{value}</span>
    </div>
  );
}
