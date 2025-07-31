import type { RentalDocumentResource } from '@/features/rental-documents';
import { createFileRoute } from '@tanstack/react-router';
import { EyeIcon, TrashIcon, UploadCloudIcon } from 'lucide-react';
import { useState } from 'react';
import { DialogTrigger } from 'react-aria-components';
import { useTranslation } from 'react-i18next';
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
import { useRentalShow } from '@/features/rentals';
import { breadcrumb } from '@/lib/breadcrumb';

export const Route = createFileRoute('/app/rentals/$id/documents')({
  component: RouteComponent,
  loader: async ({ params }) => {
    await useRentalDocumentIndex.prefetch({ rental_code: params.id });

    return {
      meta: {
        breadcrumb: breadcrumb('document:label_plural'),
      },
    };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: rentalDocuments, isLoading } = useRentalDocumentIndex({ rental_code: id });
  const { t } = useTranslation(['document', 'rental', 'common']);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRentalDocument, setSelectedRentalDocument]
    = useState<RentalDocumentResource | null>(null);

  const { mutate: createRentalDocument, isPending: isCreatingRentalDocument }
    = useRentalDocumentCreate({
      onSuccess: () => {
        setOpen(false);
        toast.success(t('rental:document.created'));
        useRentalDocumentIndex.invalidate();
        useRentalShow.invalidate({ number: id });
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
        toast.success(t('rental:document.updated'));
        useRentalDocumentIndex.invalidate();
        useRentalShow.invalidate({ number: id });
      },
    });

  const { mutate: deleteRentalDocument, isPending: isDeletingRentalDocument }
    = useRentalDocumentDelete({
      onSuccess: () => {
        toast.success(t('rental:document.deleted'));
        useRentalDocumentIndex.invalidate();
        useRentalShow.invalidate({ number: id });
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
            loading={isLoading}
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
      {selectedRentalDocument && (
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
      )}
    </div>
  );
}
