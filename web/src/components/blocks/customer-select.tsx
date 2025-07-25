import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { useCustomerCreate, useCustomerIndex, type CustomerData } from "@/features/customers";
import CustomerForm from "./customer-form";
import { useQueryClient } from "@tanstack/react-query";
import type { ApiResponse } from "@/lib/http";

export type CustomerSelectProps = React.ComponentProps<typeof Select> & {
  onCustomerSelected?: (customer: CustomerData) => void;
};

export function CustomerSelect(props: CustomerSelectProps) {
  const [open, setOpen] = useState(false);
  const [newCustomerId, setNewCustomerId] = useState<string | null>(null);

  const { data, isFetching, isPending } = useCustomerIndex();
  const queryClient = useQueryClient();

  const handleValueChange = (value: string) => {
    props.onValueChange?.(value);

    const customerList = data?.data;
    if (!customerList) return; 

    const selectedCustomer = customerList.find((c) => c.id === value);
    if (selectedCustomer) {
      props.onCustomerSelected?.(selectedCustomer);
    }
  };


  const { mutateAsync: createCustomer } = useCustomerCreate({
    onSuccess: (response) => {
      const customer = response.data;
      const existingData = queryClient.getQueryData<ApiResponse<CustomerData[]>>(["customers"]) ?? { data: [] };

      queryClient.setQueryData(["customers"], [...existingData.data, customer]);
      if (customer.id) {
        setNewCustomerId(customer.id);
      }
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  useEffect(() => {
    if (newCustomerId && data?.data) {
      handleValueChange(newCustomerId);
      setNewCustomerId(null);
    }
  }, [newCustomerId, data]);


  return (
    <Select
      disabled={isFetching || isPending}
      {...props}
      onValueChange={handleValueChange}
    >
      <div className="flex justify-center items-center gap-2">
        <SelectTrigger className="w-full">
          <SelectValue placeholder={isPending ? "......." : "Customer"} />
        </SelectTrigger>

        <SelectContent>
          {data?.data?.map((customer) => (
            <SelectItem key={customer.id} value={customer.id!}>
              {customer.first_name} {customer.last_name}
            </SelectItem>
          ))}
        </SelectContent>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Customer</DialogTitle>
              <DialogDescription>
                Add new customer
              </DialogDescription>
            </DialogHeader>

            <CustomerForm submit={(data) => createCustomer({ data })} />
          </DialogContent>
        </Dialog>
      </div>
    </Select>
  );
}
