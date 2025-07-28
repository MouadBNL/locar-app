import { CircleGaugeIcon, PaintBucketIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CarDoorIcon } from '../icons/car-door-icon';
import { CarEngineIcon } from '../icons/car-engine-icon';
import { CarSeatIcon } from '../icons/car-seat-icon';
import { CarTransmissionIcon } from '../icons/car-transmission-icon';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface VehicleSummaryCardProps {
  id: string;
  make: string;
  model: string;
  year: number;
  plate: string;
  doors: number;
  transmission: string;
  fuel: string;
  color: string;
  seats: number;
  mileage: number;
}

export function VehicleSummaryCard(props: VehicleSummaryCardProps) {
  const { t } = useTranslation(['vehicle', 'common']);
  const fallback
    = props.make.toUpperCase().charAt(0) + props.model.toUpperCase().charAt(0);

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
            {props.make}
            {' '}
            {props.model}
            {' '}
            {props.year}
          </h4>
          <h5 className="text-sm text-muted-foreground">{props.plate}</h5>
        </div>
        <div className="grid grid-cols-3 text-sm gap-2">
          <div className="flex gap-2 items-center">
            <CarDoorIcon className="size-4" />
            {' '}
            <span className="text-muted-foreground">
              {props.doors}
              {' '}
              {t('common:doors')}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <CarTransmissionIcon className="size-4" />
            {' '}
            <span className="text-muted-foreground">
              {t(`vehicle:transmission_enum.${props.transmission}`, {
                defaultValue: props.transmission,
              })}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <CarEngineIcon className="size-4" />
            {' '}
            <span className="text-muted-foreground">
              {t(`vehicle:fuel_type_enum.${props.fuel}`, {
                defaultValue: props.fuel,
              })}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <PaintBucketIcon className="size-4" />
            {' '}
            <span className="text-muted-foreground">
              {t(`vehicle:color_enum.${props.color}`, {
                defaultValue: props.color,
              })}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <CarSeatIcon className="size-4" />
            {' '}
            <span className="text-muted-foreground">
              {props.seats}
              {' '}
              {t('common:seats')}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <CircleGaugeIcon className="size-4" />
            {' '}
            <span className="text-muted-foreground">
              {props.mileage}
              {' '}
              {t('common:km')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
