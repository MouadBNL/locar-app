import { RentalPaymentTable } from "@/components/blocks/rental-payment-table";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useRentalPaymentCreate,
  useRentalPaymentDelete,
  useRentalPaymentIndex,
  useRentalPaymentUpdate,
  type RentalPaymentResource,
} from "@/features/rental-payments";
import { createFileRoute } from "@tanstack/react-router";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RentalPaymentForm } from "@/components/blocks/rental-payment-form";
import { toast } from "sonner";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/app/rentals/$id/payments")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id: code } = Route.useParams();
  const queryClient = useQueryClient();
  const [editPayment, setEditPayment] = useState<RentalPaymentResource | null>(
    null
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
      toast.success("Payment deleted");
      queryClient.invalidateQueries({ queryKey: ["rental-payments"] });
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
          <EditPaymentDialog
            payment={editPayment}
            rental_code={code}
            setEditPayment={setEditPayment}
          />
          <RentalPaymentTable
            payments={rental?.data ?? []}
            loading={isFetching}
            actions={(payment) => (
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
                    deleteRentalPaymentVariables?.id === payment.id &&
                    isDeletingRentalPayment
                  }
                  onClick={() =>
                    deleteRentalPayment({ rental_code: code, id: payment.id })
                  }
                />
              </div>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function AddPaymentDialog({ rental_code }: { rental_code: string }) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const { mutate: createRentalPayment, isPending: isCreatingRentalPayment } =
    useRentalPaymentCreate({
      onSuccess: () => {
        toast.success("Payment created");
        queryClient.invalidateQueries({ queryKey: ["rental-payments"] });
        setOpen(false);
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to create payment");
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

  const { mutate: updateRentalPayment, isPending: isUpdatingRentalPayment } =
    useRentalPaymentUpdate({
      onSuccess: () => {
        toast.success("Payment updated");
        queryClient.invalidateQueries({ queryKey: ["rental-payments"] });
        setEditPayment(null);
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to update payment");
      },
    });

  return (
    <Dialog open={!!payment} onOpenChange={() => setEditPayment(null)}>
      <DialogContent>
        <DialogTitle>Edit Payment</DialogTitle>
        <DialogDescription>Edit the payment for the rental.</DialogDescription>
        <RentalPaymentForm
          loading={isUpdatingRentalPayment}
          submit={(data) => {
            updateRentalPayment({
              rental_code,
              id: payment?.id!,
              data,
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
