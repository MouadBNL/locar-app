import type { DocumentResource } from '@/features/documents';
import type { RentalDocumentData } from '@/features/rental-documents';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  rentalDocumentSchema,
  rentalDocumentTypeMap,
  rentalDocumentTypeSchema,
} from '@/features/rental-documents';
import { Button } from '../ui/button';
import { AppFormField, Form } from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { DocumentUpload } from './document-upload';

export interface RentalDocumentFormProps {
  initialValues?: Partial<RentalDocumentData>;
  loading?: boolean;
  submit?: (data: RentalDocumentData) => void;
}
export function RentalDocumentForm({
  initialValues,
  submit,
  loading,
}: RentalDocumentFormProps) {
  const { t } = useTranslation(['document', 'common']);
  const form = useForm({
    resolver: zodResolver(rentalDocumentSchema),
    defaultValues: {
      type: 'rental_agreement',
      description: '',
      ...initialValues,
    },
  });

  const onDocumentSelected = (document: DocumentResource) => {
    if (!form.getValues('title')) {
      form.setValue('title', document.filename);
    }
  };

  const onSubmit = (data: RentalDocumentData) => {
    submit?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-2 lg:gap-4">
          <AppFormField
            control={form.control}
            name="type"
            label={t('document:attributes.type')}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('document:attributes.type')} />
                </SelectTrigger>
                <SelectContent>
                  {rentalDocumentTypeSchema.map(type => (
                    <SelectItem key={type} value={type}>
                      {rentalDocumentTypeMap[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <AppFormField
            control={form.control}
            name="document_id"
            label={t('document:label_singular')}
            render={({ field }) => (
              <DocumentUpload
                {...field}
                onDocumentSelected={onDocumentSelected}
              />
            )}
          />
          <AppFormField
            control={form.control}
            name="title"
            label={t('document:attributes.title')}
            render={({ field }) => <Input placeholder={t('document:attributes.title')} {...field} />}
          />
          <AppFormField
            control={form.control}
            name="description"
            label={t('document:attributes.description')}
            render={({ field }) => (
              <Textarea rows={3} placeholder={t('document:attributes.description')} {...field} />
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" loading={loading}>
            {loading ? t('common:saving') : t('common:save')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
