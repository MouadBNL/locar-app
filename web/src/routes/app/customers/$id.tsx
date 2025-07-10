import { CustomerRepository } from "@/repositories";
import { toast } from "sonner";
import {
  createFileRoute,
  Link,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import type { CustomerData } from "@locar/api/entities";
import { Heading3 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CustomerForm from "@/components/blocks/customer-form";

export const Route = createFileRoute("/app/customers/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const customer = await CustomerRepository.show(params.id);
    return { customer };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const router = useRouter();

  const { customer } = Route.useLoaderData();

  const { mutate: updateCustomer, isPending } = useMutation({
    mutationFn: (data: CustomerData) => CustomerRepository.update(id, data),
    onSuccess: () => {
      toast.success("Customer updated successfully");
      router.invalidate();
      navigate({ to: "/app/customers" });
    },
    onError: () => {
      toast.error("Failed to update customer");
    },
  });

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <Heading3>Edit Customer</Heading3>

        <Button asChild variant="destructive">
          <Link to="/app/customers">Cancel</Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          <CustomerForm
            submit={updateCustomer}
            loading={isPending}
            initialValues={customer ?? undefined}
          />
        </CardContent>
      </Card>
    </div>
  );
}
