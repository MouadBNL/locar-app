import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading3 } from "@/components/ui/typography";
import { CustomerRepository } from "@/repositories";
import type { CustomerData } from "@locar/api/entities";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/app/customers/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate: createCustomer, isPending } = useMutation({
    mutationFn: (data: CustomerData) => CustomerRepository.create(data),
    onSuccess: () => {
      toast.success("Customer created successfully");
      navigate({ to: "/app/customers" });
    },
    onError: () => {
      toast.error("Failed to create customer");
    },
  });

  return (
    <div className="pt-8">
      <div className="flex justify-between items-center mb-6">
        <Heading3>Create Customer</Heading3>

        <Button asChild variant="destructive">
          <Link to="/app/customers">Cancel</Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          <CustomerForm submit={createCustomer} loading={isPending} />
        </CardContent>
      </Card>
    </div>
  );
}
