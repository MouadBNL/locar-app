import { BanknoteIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { cn, fmt_currency } from "@/lib/utils";
import type { RentalChargesSummaryData } from "@/features/rentals";

export function RentalChargesSummary(props: {
  charges?: RentalChargesSummaryData;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BanknoteIcon />
          Summary of charges
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!props.charges ? (
          <div className="flex items-center justify-center">
            <span className="text-muted-foreground text-lg">
              No charges found
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            <RentalChargesSummaryItem
              label="Day Rate"
              value={fmt_currency(props.charges.day_rate)}
            />
            <RentalChargesSummaryItem
              label="Day Quantity"
              value={props.charges.day_quantity.toString()}
            />
            <RentalChargesSummaryItem
              label="Day Total"
              value={fmt_currency(props.charges.day_total)}
            />

            <Separator />

            <RentalChargesSummaryItem
              label="Extra Rate"
              value={fmt_currency(props.charges.extra_rate)}
            />
            <RentalChargesSummaryItem
              label="Extra Quantity"
              value={props.charges.extra_quantity.toString()}
            />
            <RentalChargesSummaryItem
              label="Extra Total"
              value={fmt_currency(props.charges.extra_total)}
            />

            <Separator />

            <RentalChargesSummaryItem
              label="Insurance Rate"
              value={fmt_currency(props.charges.insurance_rate)}
            />
            <RentalChargesSummaryItem
              label="Insurance Quantity"
              value={props.charges.insurance_quantity.toString()}
            />
            <RentalChargesSummaryItem
              label="Insurance Total"
              value={fmt_currency(props.charges.insurance_total)}
            />

            <Separator />

            <RentalChargesSummaryItem
              label="Total"
              value={fmt_currency(props.charges.total)}
              labelClassName="font-bold text-base"
              valueClassName="font-bold text-base"
            />
            <RentalChargesSummaryItem
              label="Paid"
              value={fmt_currency(props.charges.paid)}
              labelClassName="font-bold text-base"
              valueClassName="font-bold text-base"
            />
            <RentalChargesSummaryItem
              label="Due"
              value={fmt_currency(props.charges.due)}
              labelClassName="font-bold text-base"
              valueClassName="font-bold text-base"
            />
            <Separator />
            <RentalChargesSummaryItem
              label="Deposit"
              value={fmt_currency(props.charges.deposit)}
            />
            <RentalChargesSummaryItem
              label="Refunded"
              value={fmt_currency(props.charges.refunded)}
            />
            <RentalChargesSummaryItem
              label="Refund due"
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
    <div className={cn("flex justify-between text-sm", className)}>
      <span className={cn("text-muted-foreground", labelClassName)}>
        {label}
      </span>
      <span className={cn("font-medium", valueClassName)}>{value}</span>
    </div>
  );
}
