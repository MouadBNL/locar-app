import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { useCustomerIndex } from "@/features/customers";

export type CustomerSelectProps = React.ComponentProps<typeof Select>;

export function CustomerSelect(props: CustomerSelectProps) {
  const { data, isFetching } = useCustomerIndex();

  return (
    <Select disabled={isFetching} {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Customer" />
      </SelectTrigger>
      <SelectContent>
        {data?.data?.map((customer) => (
          <SelectItem key={customer.id} value={customer.id!}>
            {customer.first_name} {customer.last_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
