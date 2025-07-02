import RentalForm from "@/components/blocks/rental-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading3 } from "@/components/ui/typography";
import { RentalRepository } from "@/repositories";
import type { RentalData } from "@locar/api/entities";
import { useMutation } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/app/rentals/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const rental = await RentalRepository.show(params.id);
    return { rental };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const router = useRouter();

  const { rental } = Route.useLoaderData();

  const { mutate: updateRental, isPending } = useMutation({
    mutationFn: (data: RentalData) => RentalRepository.update(id, data),
    onSuccess: () => {
      toast.success("Rental updated successfully");
      router.invalidate();
      navigate({ to: "/app/rentals" });
    },
    onError: () => {
      toast.error("Failed to update rental");
    },
  });

  return (
    <div className="pt-8">
      <div className="flex justify-between items-center mb-6">
        <Heading3>Edit Rental</Heading3>

        <Button asChild variant="destructive">
          <Link to="/app/rentals">Cancel</Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          <RentalForm
            submit={updateRental}
            loading={isPending}
            initialValues={rental ?? undefined}
          />
        </CardContent>
      </Card>
    </div>
  );
}
