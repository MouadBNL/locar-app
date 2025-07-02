import ReservationForm from "@/components/blocks/reservation-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading3 } from "@/components/ui/typography";
import { ReservationRepository } from "@/repositories";
import type { ReservationData } from "@locar/api/entities";
import { useMutation } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/app/reservations/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const reservation = await ReservationRepository.show(params.id);
    return { reservation };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate(); 
  const router = useRouter();

  const { reservation } = Route.useLoaderData();

  const { mutate: updateReservation, isPending } = useMutation({
    mutationFn: (data: ReservationData) =>
      ReservationRepository.update(id, data),
    onSuccess: () => {
      toast.success("Reservation updated successfully");
      router.invalidate();
      navigate({ to: "/app/reservations" });
    },
    onError: () => {
      toast.error("Failed to update reservation");
    },
  });

  return (
    <div className="pt-8">
      <div className="flex justify-between items-center mb-6">
        <Heading3>Edit Reservation</Heading3>

        <Button asChild variant="destructive">
          <Link to="/app/reservations">Cancel</Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          <ReservationForm
            submit={updateReservation}
            loading={isPending}
            initialValues={reservation ?? undefined}
          />
        </CardContent>
      </Card>
    </div>
  );
}
