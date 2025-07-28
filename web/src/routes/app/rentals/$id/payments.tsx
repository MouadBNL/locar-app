import type { RentalPaymentResource } from '@/features/rental-payments';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { RentalPaymentForm } from '@/components/blocks/rental-payment-form';
import { RentalPaymentTable } from '@/components/blocks/rental-payment-table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {

  useRentalPaymentCreate,
  useRentalPaymentDelete,
  useRentalPaymentIndex,
  useRentalPaymentUpdate,
} from '@/features/rental-payments';
import { fmt_currency } from '@/lib/utils';

export const Route = createFileRoute('/app/rentals/$id/payments')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id: code } = Route.useParams();
  const queryClient = useQueryClient();
  const [editPayment, setEditPayment] = useState<RentalPaymentResource | null>(
    null,
  );
  const { data: rental, isFetching } = useRentalPaymentIndex({
    rental_code: code,
  });

  const {
    mutate: deleteRentalPayment,
    isPending: isDeletingRentalPayment,
    variables: deleteRentalPaymentVariables,
  } = useRentalPaymentDelete({
    onSuccess: () => {
      toast.success('Payment deleted');
      queryClient.invalidateQueries({ queryKey: ['rental-payments'] });
    },
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
          <CardDescription>List of payments for the rental.</CardDescription>
          <CardAction>
            <AddPaymentDialog rental_code={code} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <Card className="p-0 mb-8">
            <CardContent className="py-4 flex justify-between items-center">
              <PaymentSummary
                payment_total={rental?.data?.meta.total ?? 0}
                payment_paid={rental?.data?.meta.paid ?? 0}
                payment_due={rental?.data?.meta.due ?? 0}
              />

              <DepositSummary
                deposit_total={rental?.data?.meta.deposit ?? 0}
                deposit_refunded={rental?.data?.meta.refunded ?? 0}
                deposit_due={rental?.data?.meta.refund_due ?? 0}
              />
            </CardContent>
          </Card>
          <RentalPaymentTable
            payments={rental?.data?.payments ?? []}
            loading={isFetching}
            actions={payment => (
              <div className="flex gap-2 justify-end items-center">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<PencilIcon />}
                  onClick={() => setEditPayment(payment)}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  icon={<TrashIcon />}
                  loading={
                    deleteRentalPaymentVariables?.id === payment.id
                    && isDeletingRentalPayment
                  }
                  onClick={() =>
                    deleteRentalPayment({ rental_code: code, id: payment.id })}
                />
              </div>
            )}
          />
        </CardContent>
      </Card>

      <EditPaymentDialog
        payment={editPayment}
        rental_code={code}
        setEditPayment={setEditPayment}
      />
    </div>
  );
}

function AddPaymentDialog({ rental_code }: { rental_code: string }) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const { mutate: createRentalPayment, isPending: isCreatingRentalPayment }
    = useRentalPaymentCreate({
      onSuccess: () => {
        toast.success('Payment created');
        queryClient.invalidateQueries({ queryKey: ['rental-payments'] });
        setOpen(false);
      },
      onError: (error) => {
        console.error(error);
        toast.error('Failed to create payment');
      },
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" icon={<PlusIcon />}>
          Add Payment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Payment</DialogTitle>
        <DialogDescription>Add a new payment for the rental.</DialogDescription>
        <RentalPaymentForm
          loading={isCreatingRentalPayment}
          submit={(data) => {
            createRentalPayment({ rental_code, data });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

function EditPaymentDialog({
  rental_code,
  payment,
  setEditPayment,
}: {
  rental_code: string;
  payment: RentalPaymentResource | null;
  setEditPayment: (payment: RentalPaymentResource | null) => void;
}) {
  const queryClient = useQueryClient();

  const { mutate: updateRentalPayment, isPending: isUpdatingRentalPayment }
    = useRentalPaymentUpdate({
      onSuccess: () => {
        toast.success('Payment updated');
        queryClient.invalidateQueries({ queryKey: ['rental-payments'] });
        setEditPayment(null);
      },
      onError: (error) => {
        console.error(error);
        toast.error('Failed to update payment');
      },
    });

  return (
    <Dialog open={!!payment} onOpenChange={() => setEditPayment(null)}>
      <DialogContent>
        <DialogTitle>Edit Payment</DialogTitle>
        <DialogDescription>Edit the payment for the rental.</DialogDescription>
        <RentalPaymentForm
          initialValues={
            payment
              ? {
                  method: payment.method,
                  type: payment.type,
                  amount: payment.amount,
                  date: payment.date,
                  notes: payment.notes,
                }
              : undefined
          }
          loading={isUpdatingRentalPayment}
          submit={(data) => {
            updateRentalPayment({
              rental_code,
              id: payment!.id,
              data,
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

function PaymentSummary({
  payment_total,
  payment_paid,
  payment_due,
}: {
  payment_total: number;
  payment_paid: number;
  payment_due: number;
}) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div>
        <p className="text-sm">Required:</p>
        {' '}
        <p className="font-semibold">{fmt_currency(payment_total)}</p>
      </div>
      <div>
        <p className="text-sm">Total Paid:</p>
        {' '}
        <p className="font-semibold">{fmt_currency(payment_paid)}</p>
      </div>
      <div>
        <p className="text-sm">Total Due:</p>
        {' '}
        <p className="font-semibold">{fmt_currency(payment_due)}</p>
      </div>
    </div>
  );
}

function DepositSummary({
  deposit_total,
  deposit_refunded,
  deposit_due,
}: {
  deposit_total: number;
  deposit_refunded: number;
  deposit_due: number;
}) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div>
        <p className="text-sm">Deposit Total:</p>
        {' '}
        <p className="font-semibold">{fmt_currency(deposit_total)}</p>
      </div>
      <div>
        <p className="text-sm">Refunded:</p>
        {' '}
        <p className="font-semibold">{fmt_currency(deposit_refunded)}</p>
      </div>
      <div>
        <p className="text-sm">Due:</p>
        {' '}
        <p className="font-semibold">{fmt_currency(deposit_due)}</p>
      </div>
    </div>
  );
}
