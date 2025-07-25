import { RentalDocumentForm } from "@/components/blocks/rental-document-form";
import { RentalDocumentTable } from "@/components/blocks/rental-document-table";
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
} from "@/components/ui/dialog";
import {
  useRentalDocumentCreate,
  useRentalDocumentDelete,
  useRentalDocumentIndex,
  useRentalDocumentUpdate,
  type RentalDocumentResource,
} from "@/features/rental-documents";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { EyeIcon, TrashIcon, UploadCloudIcon } from "lucide-react";
import { useState } from "react";
import { DialogTrigger } from "react-aria-components";
import { toast } from "sonner";

export const Route = createFileRoute("/app/rentals/$id/documents")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: rentalDocuments } = useRentalDocumentIndex(id);

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRentalDocument, setSelectedRentalDocument] =
    useState<RentalDocumentResource | null>(null);

  const { mutate: createRentalDocument, isPending: isCreatingRentalDocument } =
    useRentalDocumentCreate({
      onSuccess: () => {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["rental-documents"] });
        toast.success("Rental document created");
        router.invalidate({
          filter: (match) => match.id === id,
        });
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to create rental document");
      },
    });

  const { mutate: updateRentalDocument, isPending: isUpdatingRentalDocument } =
    useRentalDocumentUpdate({
      onSuccess: () => {
        setOpenEdit(false);
        queryClient.invalidateQueries({ queryKey: ["rental-documents"] });
        toast.success("Rental document updated");
        router.invalidate({
          filter: (match) => match.id === id,
        });
      },
    });

  const { mutate: deleteRentalDocument, isPending: isDeletingRentalDocument } =
    useRentalDocumentDelete({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["rental-documents"] });
        toast.success("Rental document deleted");
        router.invalidate({
          filter: (match) => match.id === id,
        });
      },
    });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardAction>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpen(true)}
                >
                  <UploadCloudIcon />
                  Add Document
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Document</DialogTitle>
                  <DialogDescription>
                    Add a new document to the rental
                  </DialogDescription>
                </DialogHeader>
                <RentalDocumentForm
                  loading={isCreatingRentalDocument}
                  submit={(data) => {
                    createRentalDocument({
                      rental_code: id,
                      data: data,
                    });
                  }}
                />
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>
        <CardContent>
          <RentalDocumentTable
            rentalDocuments={rentalDocuments?.data ?? []}
            actions={(rentalDocument) => (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedRentalDocument(rentalDocument);
                    setOpenEdit(true);
                  }}
                >
                  <EyeIcon />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    deleteRentalDocument({
                      rental_code: id,
                      id: rentalDocument.id,
                    })
                  }
                  loading={isDeletingRentalDocument}
                >
                  <TrashIcon />
                </Button>
              </div>
            )}
          />
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Document</DialogTitle>
            <DialogDescription>
              View the details of the document
            </DialogDescription>
          </DialogHeader>
          <RentalDocumentForm
            initialValues={{ ...selectedRentalDocument }}
            loading={isUpdatingRentalDocument}
            submit={(data) => {
              updateRentalDocument({
                rental_code: id,
                id: selectedRentalDocument!.id,
                data: data,
              });
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
