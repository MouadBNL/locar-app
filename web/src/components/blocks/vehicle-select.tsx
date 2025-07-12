import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { useVehicleIndex } from "@/features/vehicles";

export type VehicleSelectProps = React.ComponentProps<typeof Select>;

export function VehicleSelect(props: VehicleSelectProps) {
  const { data, isFetching } = useVehicleIndex();
  return (
    <Select disabled={isFetching} {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Vehicle" />
      </SelectTrigger>
      <SelectContent>
        {data?.data.map((vehicle) => (
          <SelectItem key={vehicle.id} value={vehicle.id!}>
            {vehicle.model}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
