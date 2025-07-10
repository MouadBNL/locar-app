import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { VehicleRepository } from "@/repositories";

export type VehicleSelectProps = React.ComponentProps<typeof Select>;

export function VehicleSelect(props: VehicleSelectProps) {
  const { data, isFetching } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => VehicleRepository.index(),
  });

  return (
    <Select disabled={isFetching} {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Vehicle" />
      </SelectTrigger>
      <SelectContent>
        {data?.data.map((vehicle) => (
          <SelectItem key={vehicle.id} value={vehicle.id}>
            {vehicle.model}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
