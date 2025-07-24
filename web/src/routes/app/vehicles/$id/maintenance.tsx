import { VehicleMaintenanceForm } from "@/components/blocks/vehicle-maintenance-form";
import { VehicleMaintenanceTable } from "@/components/blocks/vehicle-maintenance-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useVehicleMaintenanceCreate,
  useVehicleMaintenanceDelete,
  useVehicleMaintenanceIndex,
  useVehicleMaintenanceUpdate,
  type VehicleMaintenanceResource,
} from "@/features/vehicle-maintenances";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/vehicles/$id/maintenance")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();
  const [maintenance, setMaintenance] =
    useState<VehicleMaintenanceResource | null>(null);

  const { data: maintenances, isLoading } = useVehicleMaintenanceIndex({
    vehicleId: id,
  });

  const {
    mutate: deleteMaintenance,
    isPending: isDeleting,
    variables: deleteMaintenanceVariables,
  } = useVehicleMaintenanceDelete({
    onSuccess: () => {
      toast.success("Maintenance deleted");
      queryClient.invalidateQueries({
        queryKey: ["vehicle-maintenances"],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete maintenance");
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance</CardTitle>
        <CardAction>
          <AddMaintenanceDialog />
        </CardAction>
      </CardHeader>
      <CardContent>
        <VehicleMaintenanceTable
          data={maintenances?.data ?? []}
          loading={isLoading}
          actions={(maintenance) => (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setMaintenance(maintenance);
                }}
              >
                <PencilIcon />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                loading={
                  isDeleting &&
                  deleteMaintenanceVariables?.maintenanceId === maintenance.id
                }
                onClick={() =>
                  deleteMaintenance({
                    vehicleId: id,
                    maintenanceId: maintenance.id,
                  })
                }
              >
                <TrashIcon />
              </Button>
            </div>
          )}
        />
      </CardContent>

      <EditMaintenanceDialog
        maintenance={maintenance}
        setMaintenance={setMaintenance}
      />
    </Card>
  );
}

function AddMaintenanceDialog() {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { mutate: createMaintenance, isPending } = useVehicleMaintenanceCreate({
    onSuccess: () => {
      toast.success("Maintenance created");
      queryClient.invalidateQueries({
        queryKey: ["vehicle-maintenances"],
      });
      setOpen(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create maintenance");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Maintenance</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Maintenance</DialogTitle>
          <DialogDescription>
            Add a new maintenance for the vehicle
          </DialogDescription>
        </DialogHeader>
        <VehicleMaintenanceForm
          loading={isPending}
          submit={(data) => {
            createMaintenance({ vehicleId: id, data });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export function EditMaintenanceDialog({
  maintenance,
  setMaintenance,
}: {
  maintenance: VehicleMaintenanceResource | null;
  setMaintenance: (maintenance: VehicleMaintenanceResource | null) => void;
}) {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();

  const { mutate: updateMaintenance, isPending } = useVehicleMaintenanceUpdate({
    onSuccess: () => {
      toast.success("Maintenance updated");
      queryClient.invalidateQueries({
        queryKey: ["vehicle-maintenances"],
      });
      setMaintenance(null);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update maintenance");
    },
  });

  return (
    <Dialog open={!!maintenance} onOpenChange={() => setMaintenance(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Maintenance</DialogTitle>
          <DialogDescription>
            Edit the maintenance for the vehicle
          </DialogDescription>
        </DialogHeader>
        <VehicleMaintenanceForm
          loading={isPending}
          initialValues={{ ...maintenance }}
          submit={(data) => {
            updateMaintenance({
              vehicleId: id,
              maintenanceId: maintenance!.id,
              data,
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
