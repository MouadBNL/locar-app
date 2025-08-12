/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import type { CalendarEvent } from '.';

import { Link } from '@tanstack/react-router';
import { EyeIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DateTimeInput } from '../ui/datetime-input';

interface EventDialogProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  onDelete: (eventId: string) => void;
}

export function EventDialog({
  event,
  isOpen,
  onClose,
}: EventDialogProps) {
  const { t } = useTranslation(['calendar', 'common']);

  const currentDate = new Date();
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState<Date>(currentDate);
  const [endDate, setEndDate] = useState<Date>(currentDate);
  const [error, setError] = useState<string | null>(null);

  // Debug log to check what event is being passed
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('EventDialog received event:', event);
  }, [event]);

  const resetForm = () => {
    setTitle('');
    setStartDate(new Date());
    setEndDate(new Date());
    setError(null);
  };

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');

      const start = new Date(event.start);
      const end = new Date(event.end);

      setStartDate(start);
      setEndDate(end);
      setError(null); // Reset error when opening dialog
    }
    else {
      resetForm();
    }
  }, [event]);

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('calendar:details')}</DialogTitle>
          <DialogDescription className="sr-only">
            {t('calendar:detailsDescription')}
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="bg-destructive/15 text-destructive rounded-md px-3 py-2 text-sm">
            {error}
          </div>
        )}
        <div className="grid gap-4 py-4">
          <div>
            <Label>
              {t('calendar:attributes.title')}
            </Label>
            <Input value={title} disabled />
          </div>
          <div>
            <Label>
              {t('calendar:attributes.startDate')}
            </Label>
            <DateTimeInput value={startDate} type="date" disabled />
          </div>
          <div>
            <Label>
              {t('calendar:attributes.endDate')}
            </Label>
            <DateTimeInput value={endDate} type="date" disabled />
          </div>
        </div>
        <DialogFooter className="flex-row sm:justify-between">
          <div className="flex flex-1 justify-end gap-2">
            {event?.url && (
              <Button asChild>
                <Link to={event?.url}>
                  <EyeIcon />
                  {t('common:view')}
                </Link>
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              {t('common:close')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
