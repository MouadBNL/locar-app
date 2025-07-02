import RentalForm from "@/components/blocks/rental-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading3 } from "@/components/ui/typography";
import { RentalRepository } from "@/repositories";
import type { RentalData } from "@locar/api/entities";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/app/rentals/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate: createRental, isPending } = useMutation({
    mutationFn: (data: RentalData) => RentalRepository.create(data),
    onSuccess: () => {
      toast.success("Rental created successfully");
      navigate({ to: "/app/rentals" });
    },
    onError: () => {
      toast.error("Failed to create rental");
    },
  });

  return (
    <div className="pt-8">
      <div className="flex justify-between items-center mb-6">
        <Heading3>Create Rental</Heading3>

        <Button asChild variant="destructive">
          <Link to="/app/rentals">Cancel</Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          <RentalForm submit={createRental} loading={isPending} />
        </CardContent>
      </Card>
    </div>
  );
}
