import type { CalendarDate } from '@internationalized/date';
import { parseDate } from '@internationalized/date';
import { CalendarIcon } from 'lucide-react';
import {
  Button,
  DatePicker,
  Dialog,
  Group,
  I18nProvider,
  Popover,
} from 'react-aria-components';

import { Calendar } from '@/components/ui/calendar-rac';
import { DateInput as DateInputContent } from '@/components/ui/datefield-rac';
import { fmt_date } from '@/lib/utils';

type DateInputProps
  = | {
    type: 'string';
    value?: string;
    onChange?: (value: string) => void;
  }
  | {
    type: 'date';
    value?: Date;
    onChange?: (value: Date) => void;
  };

export function DateInput({ value, onChange, type }: DateInputProps) {
  const onDateChange = (value: CalendarDate | null) => {
    if (type === 'string') {
      const fmt = value
        ? fmt_date(value.toDate('UTC'), { format: 'date' })
        : undefined;
      onChange?.(fmt ?? '');
    }
    else {
      onChange?.(value?.toDate('UTC') ?? new Date());
    }
  };

  const normalizedValue = (v: string | undefined) => {
    if (!v)
      return undefined;
    const val = v.split('T')[0];
    return parseDate(val);
  };
  return (
    <I18nProvider locale="en-UK">
      <DatePicker
        aria-label="Date input"
        className="*:not-first:mt-2"
        hourCycle={24}
        value={normalizedValue(
          type === 'string' ? value : value?.toISOString(),
        )}
        granularity="day"
        hideTimeZone
        onChange={value => onDateChange(value)}
      >
        <div className="flex">
          <Group className="w-full">
            <DateInputContent className="pe-9" />
          </Group>
          <Button className="text-muted-foreground/80 hover:text-foreground data-focus-visible:border-ring data-focus-visible:ring-ring/50 z-10 -ms-9 -me-px flex w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none data-focus-visible:ring-[3px]">
            <CalendarIcon size={16} />
          </Button>
        </div>
        <Popover
          className="bg-background text-popover-foreground data-entering:animate-in data-exiting:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 rounded-lg border shadow-lg outline-hidden"
          offset={4}
        >
          <Dialog className="max-h-[inherit] overflow-auto p-2">
            <Calendar />
          </Dialog>
        </Popover>
      </DatePicker>
    </I18nProvider>
  );
}
