import type { RentalDocumentResource } from '@/features/rental-documents';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { EyeIcon, TrashIcon, UploadCloudIcon } from 'lucide-react';
import { useState } from 'react';
import { DialogTrigger } from 'react-aria-components';
import { toast } from 'sonner';
import { RentalDocumentForm } from '@/components/blocks/rental-document-form';
import { RentalDocumentTable } from '@/components/blocks/rental-document-table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {

  useRentalDocumentCreate,
  useRentalDocumentDelete,
  useRentalDocumentIndex,
  useRentalDocumentUpdate,
} from '@/features/rental-documents';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/app/rentals/$id/documents')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: rentalDocuments } = useRentalDocumentIndex(id);
  const { t } = useTranslation(['document', 'rental', 'common']);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRentalDocument, setSelectedRentalDocument]
    = useState<RentalDocumentResource | null>(null);

  const { mutate: createRentalDocument, isPending: isCreatingRentalDocument }
    = useRentalDocumentCreate({
      onSuccess: () => {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ['rental-documents'] });
        toast.success(t('rental:document.created'));
        router.invalidate({
          filter: match => match.id === id,
        });
      },
      onError: (error) => {
        console.error(error);
        toast.error(t('rental:document.error'));
      },
    });

  const { mutate: updateRentalDocument, isPending: isUpdatingRentalDocument }
    = useRentalDocumentUpdate({
      onSuccess: () => {
        setOpenEdit(false);
        queryClient.invalidateQueries({ queryKey: ['rental-documents'] });
        toast.success(t('rental:document.updated'));
        router.invalidate({
          filter: match => match.id === id,
        });
      },
    });

  const { mutate: deleteRentalDocument, isPending: isDeletingRentalDocument }
    = useRentalDocumentDelete({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['rental-documents'] });
        toast.success(t('rental:document.deleted'));
        router.invalidate({
          filter: match => match.id === id,
        });
      },
    });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{t('document:label_plural')}</CardTitle>
          <CardAction>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpen(true)}
                >
                  <UploadCloudIcon />
                  {t('document:add_document')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('document:add_document')}</DialogTitle>
                  <DialogDescription>
                    {t('document:add_document_description')}
                  </DialogDescription>
                </DialogHeader>
                <RentalDocumentForm
                  loading={isCreatingRentalDocument}
                  submit={(data) => {
                    createRentalDocument({
                      rental_code: id,
                      data,
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
            actions={rentalDocument => (
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
                  {t('common:view')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    deleteRentalDocument({
                      rental_code: id,
                      id: rentalDocument.id,
                    })}
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
            <DialogTitle>{t('document:view.heading')}</DialogTitle>
            <DialogDescription>
              {t('document:view.description')}
            </DialogDescription>
          </DialogHeader>
          <RentalDocumentForm
            initialValues={{ ...selectedRentalDocument }}
            loading={isUpdatingRentalDocument}
            submit={(data) => {
              updateRentalDocument({
                rental_code: id,
                id: selectedRentalDocument!.id,
                data,
              });
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
