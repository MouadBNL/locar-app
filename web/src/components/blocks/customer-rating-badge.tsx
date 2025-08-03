import { StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CustomerRatingBadge({ rating }: { rating: number }) {
  return (
    <div className={cn('flex items-center gap-2', ratingToColor(rating))}>
      <StarIcon  />
      {rating}
    </div>
  );
}

function ratingToColor(rating: number) {
  if (rating >= 4.5)
    return 'text-green-500';
  if (rating >= 4)
    return 'text-green-400';
  if (rating >= 3.5)
    return 'text-green-300';
  if (rating >= 3)
    return 'text-yellow-200';
  if (rating >= 2.5)
    return 'text-orange-300';
  if (rating >= 2)
    return 'text-orange-500';
  if (rating >= 1.5)
    return 'text-red-500';
  if (rating >= 1)
    return 'text-red-400';
  return 'text-red-700';
}
