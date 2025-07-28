import type { CustomerData } from '@/features/customers';
import { useCustomerIndex } from '@/features/customers';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export type CustomerSelectProps = React.ComponentProps<typeof Select> & {
  onCustomerSelected?: (customer: CustomerData) => void;
};

export function CustomerSelect(props: CustomerSelectProps) {
  const { data, isFetching } = useCustomerIndex();

  const onValueChange = (value: string) => {
    props.onValueChange?.(value);
    const customer = data?.data.find(c => c.id === value);
    if (customer) {
      props.onCustomerSelected?.(customer);
    }
  };

  return (
    <Select disabled={isFetching} {...props} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Customer" />
      </SelectTrigger>
      <SelectContent>
        {data?.data?.map(customer => (
          <SelectItem key={customer.id} value={customer.id!}>
            {customer.first_name}
            {' '}
            {customer.last_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
