import { CarIcon } from 'lucide-react';

interface PeriodSummaryCardProps {
  pickupDate: string;
  dropoffDate: string;
  rentalDays: number;
}

export function PeriodSummaryCard(props: PeriodSummaryCardProps) {
  const pickupDate = new Date(props.pickupDate);
  const dropoffDate = new Date(props.dropoffDate);

  return (
    <div className="flex h-full w-full items-center justify-between">
      <div className="flex flex-col items-start justify-center">
        <span className="text-xs text-muted-foreground">Pickup date</span>
        <span className="text-lg font-bold">
          {pickupDate.toLocaleDateString()}
        </span>
        <span className="text-sm text-muted-foreground">
          {pickupDate.toLocaleTimeString()}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <span className="block text-sm mb-2 text-muted-foreground">
          {props.rentalDays}
          {' '}
          days
        </span>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-muted-foreground" />
          <div className="w-24 h-0.5 relative text-muted-foreground bg-gradient-to-r from-muted-foreground/0 via-muted-foreground/100 to-muted-foreground/0">
            <CarIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-1 rounded-full h-8 w-8 bg-radial from-card/100  from-70% to-card/0" />
          </div>
          <div className="h-3 w-3 rounded-full bg-muted-foreground" />
        </div>
      </div>
      <div className="flex flex-col items-end justify-center">
        <span className="text-xs text-muted-foreground">Dropoff date</span>
        <span className="text-lg font-bold">
          {dropoffDate.toLocaleDateString()}
        </span>
        <span className="text-sm text-muted-foreground">
          {dropoffDate.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
