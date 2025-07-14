import { CustomerTable } from "@/components/blocks/customer-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading3 } from "@/components/ui/typography";
import { useCustomerDelete, useCustomerIndex } from "@/features/customers";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/customers/")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();

  const { data, isFetching } = useCustomerIndex();

  const { mutate: deleteCustomer, isPending: isDeleting } = useCustomerDelete({
    onSuccess: () => {
      toast.success("Customer deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: () => {
      toast.error("Failed to delete customer");
    },
  });

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <Heading3>Manage Customers</Heading3>

        <Button asChild>
          <Link to="/app/customers/create">
            <PlusIcon className="w-4 h-4" />
            Add Customer
          </Link>
        </Button>
      </div>

      <Card className="p-2 mb-4">
        <CustomerTable
          data={data?.data || []}
          loading={isFetching}
          actions={(customer) => (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link
                  from="/"
                  to="/app/customers/$id"
                  params={{ id: customer.id! }}
                >
                  <PencilIcon className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                loading={isDeleting}
                onClick={() => deleteCustomer({ id: customer.id! })}
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
