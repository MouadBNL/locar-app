import ReservationForm from "@/components/blocks/reservation-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading3 } from "@/components/ui/typography";
import { useReservationCreate } from "@/features/reservations";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/app/reservations/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate: createReservation, isPending } = useReservationCreate({
    onSuccess: () => {
      toast.success("Reservation created successfully");
      navigate({ to: "/app/reservations" });
    },
    onError: () => {
      toast.error("Failed to create reservation");
    },
  });

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <Heading3>Create Reservation</Heading3>

        <Button asChild variant="destructive">
          <Link to="/app/reservations">Cancel</Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          <ReservationForm
            submit={(data) => createReservation({ data })}
            loading={isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
