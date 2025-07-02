import ReservationForm from "@/components/blocks/reservation-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading3 } from "@/components/ui/typography";
import { ReservationRepository } from "@/repositories";
import type { ReservationData } from "@locar/api/entities";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/app/reservations/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate: createReservation, isPending } = useMutation({
    mutationFn: (data: ReservationData) => ReservationRepository.create(data),
    onSuccess: () => {
      toast.success("Reservation created successfully");
      navigate({ to: "/app/reservations" });
    },
    onError: () => {
      toast.error("Failed to create reservation");
    },
  });

  return (
    <div className="pt-8">
      <div className="flex justify-between items-center mb-6">
        <Heading3>Create Reservation</Heading3>

        <Button asChild variant="destructive">
          <Link to="/app/reservations">Cancel</Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          <ReservationForm submit={createReservation} loading={isPending} />
        </CardContent>
      </Card>
    </div>
  );
}
