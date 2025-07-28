import type { DocumentResource } from '@/features/documents';
import type { FileMetadata, FileWithPreview } from '@/hooks/use-file-upload';
import { toast } from 'sonner';
import {

  useDocumentCreate,
  useDocumentShow,
} from '@/features/documents';
import { SingleFileUpload } from './single-file-upload';

interface DocumentUploadProps {
  for?: string;
  value?: string | null;
  onChange?: (value: string | null) => void;
  onDocumentSelected?: (document: DocumentResource) => void;
}

export function DocumentUpload(props: DocumentUploadProps) {
  const {
    data: document,
    error: documentError,
    isPending: isDocumentLoading,
    isFetching,
  } = useDocumentShow(props.value ?? undefined, {
    initialData: null,
    retry: false,
  });

  const { mutate: createDocument, isPending: isCreateDocumentPending }
    = useDocumentCreate({
      onSuccess: (data) => {
        toast.success('Document uploaded successfully');
        props.onChange?.(data.data.id);
        props.onDocumentSelected?.(data.data);
      },
      onError: (error) => {
        console.error('Failed to upload document: ', error);
        toast.error('Failed to upload document');
      },
    });

  const isPending = isDocumentLoading || isCreateDocumentPending || isFetching;

  const onFileAdded = (files: FileWithPreview[]) => {
    if (files.length === 0)
      return;
    const file = files[0].file;
    if (file instanceof File) {
      createDocument({
        file,
        for: props.for,
      });
    }
  };

  const getData = (doc: DocumentResource | undefined): FileMetadata[] => {
    return doc?.id
      ? [
          {
            name: doc.filename,
            size: doc.size,
            type: doc.mime_type,
            url: doc.url,
            id: doc.id,
          },
        ]
      : [];
  };

  const onFilesChange = (files: FileWithPreview[]) => {
    if (files.length === 0) {
      props.onChange?.(null);
    }
  };

  return (
    <div>
      <SingleFileUpload
        key={isFetching ? 'loading' : 'not-loading'}
        initialFiles={getData(document?.data)}
        onFilesAdded={onFileAdded}
        onFilesChange={onFilesChange}
        disabled={isPending}
        loading={isPending}
        error={documentError}
        url={document?.data?.url}
      />
    </div>
  );
}
