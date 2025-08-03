import type { CustomerData } from '@/features/customers';
import type { ApiResponse } from '@/lib/http';
import { useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCustomerCreate, useCustomerIndex } from '@/features/customers';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,

  SelectTrigger,
} from '../ui/select';
import CustomerForm from './customer-form';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CustomerRatingBadge } from './customer-rating-badge';

export type CustomerSelectProps = React.ComponentProps<typeof Select> & {
  onCustomerSelected?: (customer: CustomerData) => void;
};

export function CustomerSelect(props: CustomerSelectProps) {
  const { t } = useTranslation(['customer', 'common']);
  const [open, setOpen] = useState(false);
  const [newCustomerId, setNewCustomerId] = useState<string | null>(null);

  const { data, isFetching, isPending } = useCustomerIndex();
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  const handleValueChange = useCallback((value: string) => {
    props.onValueChange?.(value);

    const customerList = data?.data;
    if (!customerList)
      return;

    const selectedCustomer = customerList.find(c => c.id === value);
    if (selectedCustomer) {
      props.onCustomerSelected?.(selectedCustomer);
    }
  }, [data, props]);

  const { mutateAsync: createCustomer } = useCustomerCreate({
    onSuccess: (response) => {
      const customer = response.data;
      const existingData = queryClient.getQueryData<ApiResponse<CustomerData[]>>(['customers']) ?? { data: [] };

      queryClient.setQueryData(['customers'], [...existingData.data, customer]);
      if (customer.id) {
        setNewCustomerId(customer.id);
      }
      setOpen(false);
      useCustomerIndex.invalidate();
    },
  });

  useEffect(() => {
    if (newCustomerId && data?.data) {
      handleValueChange(newCustomerId);
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setNewCustomerId(null);
    }
  }, [newCustomerId, data, handleValueChange]);

  // Filter customers by search
  const filteredCustomers = data?.data?.filter((customer) => {
    const searchLower = search.toLowerCase();
    return (
      customer.first_name.toLowerCase().includes(searchLower)
      || customer.last_name.toLowerCase().includes(searchLower)
      || (customer.id_card_number ?? '').toLowerCase().includes(searchLower)

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
              ? 'loading'
              : (() => {
                  const selected = data?.data?.find(c => c.id === props.value);
                  return selected
                    ? `${selected.first_name} ${selected.last_name}`
                    : t('customer:label_singular');
                })()}
          </div>
        </SelectTrigger>

        <SelectContent>
          <div className="px-2 py-1 mb-2">
            <Input
              type="text"
              placeholder={t('customer:search_placeholder')}
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
          {filteredCustomers.map(customer => (
            <SelectItem key={customer.id} value={customer.id!} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="size-6 rounded-lg">
                  <AvatarImage src="#" />
                  <AvatarFallback className="rounded-lg text-xs">{customer.first_name.charAt(0)}{customer.last_name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="w-32">
                  <h4 className="text-sm font-bold -mb-1 truncate">
                    {customer.first_name}
                    {' '}
                    {customer.last_name}
                  </h4>
                  <h5 className="text-xs text-muted-foreground truncate">{customer.id_card_number}</h5>
              </div>
              {customer.rating && (
                <div className="text-sm">
                  <CustomerRatingBadge rating={customer.rating} />
                </div>
              )}
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
              <DialogTitle>{t('customer:add_customer')}</DialogTitle>
              <DialogDescription>
                {t('customer:add_customer_description')}
              </DialogDescription>
            </DialogHeader>

            <CustomerForm submit={data => createCustomer({ data })} />
          </DialogContent>
        </Dialog>
      </div>
    </Select>
  );
}
