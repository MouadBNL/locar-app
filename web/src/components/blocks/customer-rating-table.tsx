import type { CustomerRatingResource } from '@/features/customers';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '../ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

export function CustomerRatingTable({
  data,
  loading,
  actions,
}: {
  data: CustomerRatingResource[];
  loading?: boolean;
  actions?: (rating: CustomerRatingResource) => React.ReactNode;
}) {
  const { t } = useTranslation(['customer', 'common']);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('customer:rating.attributes.rating')}</TableHead>
          <TableHead>{t('customer:rating.attributes.rental')}</TableHead>
          <TableHead>{t('customer:rating.attributes.comment')}</TableHead>
          <TableHead>{t('common:actions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && <TableRow><TableCell colSpan={3}><Skeleton className="h-10 w-full" /></TableCell></TableRow>}
        {data.map(rating => (
          <TableRow key={rating.id}>
            <TableCell>{rating.rating}</TableCell>
            <TableCell>
              <Link to="/app/rentals/$id" params={{ id: rating.rental?.rental_number ?? '' }} className="hover:underline">
                {rating.rental?.rental_number}
              </Link>
            </TableCell>
            <TableCell>{rating.comment}</TableCell>
            <TableCell>{actions?.(rating)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
