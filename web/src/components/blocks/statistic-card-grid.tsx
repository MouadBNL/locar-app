import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function StatisticCardGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:grid-cols-4', className)}>
      {children}
    </div>
  );
}
