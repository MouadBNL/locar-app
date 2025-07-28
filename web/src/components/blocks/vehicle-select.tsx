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
          <SelectItem key={vehicle.id} value={vehicle.id!}>
            {vehicle.model}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
