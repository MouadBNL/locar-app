import { RentalTable } from "@/components/blocks/rental-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading3 } from "@/components/ui/typography";
import { useRentalDelete, useRentalIndex } from "@/features/rentals/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { EyeIcon, PlusIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/rentals/")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();

  const { data, isFetching } = useRentalIndex();

  const { mutate: deleteRental, isPending: isDeleting } = useRentalDelete({
    onSuccess: () => {
      toast.success("Rental deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["rentals"] });
    },
    onError: () => {
      toast.error("Failed to delete rental");
    },
  });

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <Heading3>Manage Rentals</Heading3>

        <Button asChild>
          <Link to="/app/rentals/initialize">
            <PlusIcon className="w-4 h-4" />
            Add Rental
          </Link>
        </Button>
      </div>

      <Card className="p-2 mb-4">
        <RentalTable
          data={data?.data ?? []}
          loading={isFetching}
          actions={(rental) => (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link
                  from="/"
                  to="/app/rentals/$id"
                  params={{ id: rental.rental_number }}
                >
                  <EyeIcon className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                loading={isDeleting}
                onClick={() => deleteRental({ id: rental.id })}
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
