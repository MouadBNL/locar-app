import type { RentalDocumentResource } from '@/features/rental-documents';
import { LoaderIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {

  rentalDocumentTypeMap,
} from '@/features/rental-documents';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export interface RentalDocumentTableProps {
  rentalDocuments: RentalDocumentResource[];
  actions?: (rentalDocument: RentalDocumentResource) => React.ReactNode;
  loading?: boolean;
}
export function RentalDocumentTable({
  rentalDocuments,
  actions,
  loading,
}: RentalDocumentTableProps) {
  const { t } = useTranslation(['document', 'common']);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('document:attributes.title')}</TableHead>
            <TableHead>{t('document:attributes.filename')}</TableHead>
            <TableHead>{t('document:attributes.type')}</TableHead>
            <TableHead>{t('document:attributes.description')}</TableHead>
            <TableHead>{t('common:actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? (
                <>
                  <TableRow>
                    <TableCell colSpan={5} className="text-center animate-pulse">
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={5} className="text-center animate-pulse">
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={5} className="text-center animate-pulse">
                    </TableCell>
                  </TableRow>
                </>
              )
            : (
                rentalDocuments.map(rentalDocument => (
                  <TableRow key={rentalDocument.id}>
                    <TableCell>{rentalDocument.title}</TableCell>
                    <TableCell>{rentalDocument.document.filename}</TableCell>
                    <TableCell>
                      {rentalDocumentTypeMap[rentalDocument.type] ?? 'Unknown'}
                    </TableCell>
                    <TableCell>{rentalDocument.description}</TableCell>
                    <TableCell>{actions?.(rentalDocument)}</TableCell>
                  </TableRow>
                ))
              )}
        </TableBody>
      </Table>
    </div>
  );
}
