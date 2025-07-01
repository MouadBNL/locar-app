import ReservationForm from "@/components/blocks/reservation-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading3 } from "@/components/ui/typography";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/reservations/create")({
  component: RouteComponent,
});

function RouteComponent() {
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
          <ReservationForm />
        </CardContent>
      </Card>
    </div>
  );
}
