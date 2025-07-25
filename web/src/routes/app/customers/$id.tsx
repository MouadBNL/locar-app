import { toast } from "sonner";
import {
  createFileRoute,
  Link,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { Heading3 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CustomerForm from "@/components/blocks/customer-form";
import { customerShowFn, useCustomerUpdate } from "@/features/customers";
import { CustomerStatusBadge } from "@/components/blocks/customer-status-badge";

export const Route = createFileRoute("/app/customers/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const customer = await customerShowFn({ id: params.id });
    return { customer: customer.data };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const router = useRouter();

  const { customer } = Route.useLoaderData();

  const { mutate: updateCustomer, isPending } = useCustomerUpdate({
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
        <div className="flex items-center gap-4">
          <Heading3>
            Customer: {customer?.first_name} {customer?.last_name}
          </Heading3>
          <CustomerStatusBadge status={customer?.status} />
        </div>

        <Button asChild variant="destructive">
          <Link to="/app/customers">Cancel</Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          <CustomerForm
            submit={(data) => updateCustomer({ id, data })}
            loading={isPending}
            initialValues={customer ?? undefined}
          />
        </CardContent>
      </Card>
    </div>
  );
}
