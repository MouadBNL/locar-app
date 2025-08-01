import type { VehicleData } from '@/features/vehicles';
import { useVehicleIndex } from '@/features/vehicles';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export type VehicleSelectProps = React.ComponentProps<typeof Select> & {
  onVehicleSelected?: (vehicle: VehicleData) => void;
};

export function VehicleSelect(props: VehicleSelectProps) {
  const { data, isFetching } = useVehicleIndex();

  const onValueChange = (value: string) => {
    props.onValueChange?.(value);
    const vehicle = data?.data.find(v => v.id === value);
    if (vehicle) {
      props.onVehicleSelected?.(vehicle);
    }
  };

  return (
    <Select disabled={isFetching} {...props} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Vehicle" />
      </SelectTrigger>
      <SelectContent>
        {data?.data.map(vehicle => (
          <SelectItem key={vehicle.id} value={vehicle.id!} className="w-full">
            <span className="flex gap-2 justify-end w-full items-center">
              <span className="block truncate text-left text-ellipsis max-w-[120px]">
                {vehicle.make}
                {' '}
                {vehicle.model}
              </span>
              <span className="text-xs text-muted-foreground block shrink-0 text-right text-nowrap truncate">
                {`${vehicle.license_plate}`}
              </span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
