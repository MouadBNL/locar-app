import type { RentalPaymentData } from '@/features/rental-payments';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {

  RentalPaymentSchema,
} from '@/features/rental-payments';
import { fmt_date, get_date } from '@/lib/utils';
import { Button } from '../ui/button';
import { DateTimeInput } from '../ui/datetime-input';
import { AppFormField, Form } from '../ui/form';
import { Input } from '../ui/input';
import { NumberInput } from '../ui/number-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

export function RentalPaymentForm({
  initialValues,
  submit,
  loading,
}: {
  initialValues?: Partial<RentalPaymentData>;
  submit: (data: RentalPaymentData) => void;
  loading?: boolean;
}) {
  const form = useForm({
    resolver: zodResolver(RentalPaymentSchema),
    defaultValues: {
      method: 'cash',
      type: 'normal',
      amount: 0,
      date: fmt_date(get_date(), { format: 'datetime' }),
      ...initialValues,
    },
  });

  const onSubmit = (data: RentalPaymentData) => {
    submit?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AppFormField
          control={form.control}
          name="method"
          label="Payment Method"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="cheque">Cheque</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <AppFormField
          control={form.control}
          name="type"
          label="Payment Type"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a payment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <AppFormField
          control={form.control}
          name="amount"
          label="Amount"
          render={({ field }) => <NumberInput value={field.value} onChange={field.onChange} placeholder="Amount" />}
        />
        <AppFormField
          control={form.control}
          name="date"
          label="Payment Date"
          render={({ field }) => <DateTimeInput type="string" {...field} />}
        />
        <AppFormField
          control={form.control}
          name="reference"
          label="Reference"
          render={({ field }) => <Input {...field} value={field.value ?? ''} />}
        />
        <AppFormField
          control={form.control}
          name="notes"
          label="Notes"
          render={({ field }) => (
            <Textarea {...field} value={field.value ?? ''} />
          )}
        />
        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
