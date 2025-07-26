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
  
  SelectItem,
} from "../ui/select";
import { useCustomerCreate, useCustomerIndex, type CustomerData } from "@/features/customers";
import CustomerForm from "./customer-form";
import { useQueryClient } from "@tanstack/react-query";
import type { ApiResponse } from "@/lib/http";
import { Input } from "../ui/input";

export type CustomerSelectProps = React.ComponentProps<typeof Select> & {
  onCustomerSelected?: (customer: CustomerData) => void;
};

export function CustomerSelect(props: CustomerSelectProps) {
  const [open, setOpen] = useState(false);
  const [newCustomerId, setNewCustomerId] = useState<string | null>(null);


  const { data, isFetching, isPending } = useCustomerIndex();
  const [search, setSearch] = useState("");
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


  // Filter customers by search
  const filteredCustomers = data?.data?.filter((customer) => {
    const searchLower = search.toLowerCase();
    return (
      customer.first_name.toLowerCase().includes(searchLower) ||
      customer.last_name.toLowerCase().includes(searchLower)
    );
  }) ?? [];

  return (
    <Select
      disabled={isFetching || isPending}
      {...props}
      onValueChange={handleValueChange}
    >
      <div className="flex justify-center items-center gap-2">
        <SelectTrigger className="w-full">
          <div className="truncate">
            {isPending
              ? "loading"
              : (() => {
                const selected = data?.data?.find((c) => c.id === props.value);
                return selected
                  ? `${selected.first_name} ${selected.last_name}`
                  : "Customer";
              })()}
          </div>
        </SelectTrigger>


        <SelectContent>
          <div className="px-2 py-1 mb-2">
            <Input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full"
              autoFocus
              onKeyDown={e => e.stopPropagation()}
              onFocus={e => e.stopPropagation()}
              onMouseDown={e => e.stopPropagation()}
            />
          </div>
          <hr className="mb-2 mx-2" />
          {filteredCustomers.map((customer) => (
            <SelectItem key={customer.id} value={customer.id!}>
              {customer.first_name} {customer.last_name} <i className="opacity-15">{customer.id_card_number} | {customer.email} | {customer.phone} </i>
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
