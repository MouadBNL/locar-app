import RentalInitializationForm from "@/components/blocks/rental-initialization-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading3 } from "@/components/ui/typography";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useRentalCreate } from "@/features/rentals";

export const Route = createFileRoute("/app/rentals/initialize")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const { mutate: createRental, isPending } = useRentalCreate({
    onSuccess: (data) => {
      toast.success("Rental created successfully");
      console.log(data);
      navigate({ to: "/app/rentals" });
    },
    onError: (error) => {
      toast.error("Failed to create rental");
      console.error(error);
    },
  });

  return (
    <div className="py-8 px-4 lg:px-12 w-full">
      <div className="flex justify-between items-center mb-6">
        <Heading3>Create Rental</Heading3>

        <Button asChild variant="destructive">
          <Link to="/app/rentals">Cancel</Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          <RentalInitializationForm submit={createRental} loading={isPending} />
        </CardContent>
      </Card>
    </div>
  );
}
