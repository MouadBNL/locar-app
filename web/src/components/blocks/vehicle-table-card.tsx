import { Link } from '@tanstack/react-router';
import { VehicleLicensePlateBadge } from './vehicle-license-plate-badge';

export interface VehicleTableCardProps {
  id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
}

export function VehicleTableCard(props: VehicleTableCardProps) {
  return (
    <div>
      <Link to="/app/vehicles/$id" params={{ id: props.id }} className="hover:underline">
        <p className="text-sm">
          {props.make}
          {' '}
          {props.model}
          {' '}
          {props.year}
        </p>
      </Link>
      <p className="text-muted-foreground text-xs">
        <VehicleLicensePlateBadge>
          {props.license_plate}
        </VehicleLicensePlateBadge>
      </p>
    </div>
  );
}
