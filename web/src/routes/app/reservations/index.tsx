import { ReservationTable } from "@/components/blocks/reservation-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading3 } from "@/components/ui/typography";
import {
  useReservationDelete,
  useReservationIndex,
} from "@/features/reservations";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/reservations/")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();

  const { data, isFetching } = useReservationIndex();

  const { mutate: deleteReservation, isPending: isDeleting } =
    useReservationDelete({
      onSuccess: () => {
        toast.success("Reservation deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["reservations"] });
      },
      onError: () => {
        toast.error("Failed to delete reservation");
      },
    });

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <Heading3>Manage Reservations</Heading3>

        <Button asChild>
          <Link to="/app/reservations/create">
            <PlusIcon className="w-4 h-4" />
            Add Reservation
          </Link>
        </Button>
      </div>

      <Card className="p-2 mb-4">
        <ReservationTable
          data={data?.data || []}
          loading={isFetching}
          actions={(reservation) => (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link
                  from="/"
                  to="/app/reservations/$id"
                  params={{ id: reservation.id! }}
                >
                  <PencilIcon className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                loading={isDeleting}
                onClick={() => deleteReservation({ id: reservation.id! })}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </>
          )}
        />
      </Card>
    </div>
  );
}
