import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { CustomerRepository } from "@/repositories";

export type CustomerSelectProps = React.ComponentProps<typeof Select>;

export function CustomerSelect(props: CustomerSelectProps) {
  const { data, isFetching } = useQuery({
    queryKey: ["customers"],
    queryFn: () => CustomerRepository.index(),
  });

  return (
    <Select disabled={isFetching} {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Customer" />
      </SelectTrigger>
      <SelectContent>
        {data?.map((customer) => (
          <SelectItem key={customer.id} value={customer.id}>
            {customer.first_name} {customer.last_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
