import { CalendarIcon } from "lucide-react";
import {
  Button,
  DatePicker,
  Dialog,
  Group,
  I18nProvider,
  Popover,
} from "react-aria-components";
import { CalendarDateTime } from "@internationalized/date";

import { Calendar } from "@/components/ui/calendar-rac";
import { DateInput as DateInputContent } from "@/components/ui/datefield-rac";
import { fmt_date } from "@/lib/utils";

type DateInputProps =
  | {
      type: "string";
      value?: string | null;
      onChange?: (value: string) => void;
    }
  | {
      type: "date";
      value?: Date | null;
      onChange?: (value: Date) => void;
    };

export function DateTimeInput({ value, onChange, type }: DateInputProps) {
  const onDateChange = (value: CalendarDateTime | null) => {
    value?.set({ second: 0, millisecond: 0 });
    console.log("[onDateChange] value:", {
      h: value?.hour,
      m: value?.minute,
      s: value?.second,
      ms: value?.millisecond,
      str: value?.toString(),
      date: new Date(value ? value.toString() : "").toISOString(),
    });
    const date = new Date(value ? value.toString() : "");
    if (type === "string") {
      onChange?.(fmt_date(date, { format: "datetime" }));
    } else {
      onChange?.(date);
    }
  };

  const normalizedValue = (v: string | null | undefined) => {
    // Fallback for ISO strings
    if (!v) return undefined;
    const d = new Date(v);
    if (isNaN(d.getTime())) return undefined;

    // Create a CalendarDateTime directly from the Date object
    return new CalendarDateTime(
      d.getFullYear(),
      d.getMonth() + 1, // getMonth() returns 0-11
      d.getDate(),
      d.getHours(),
      d.getMinutes()
    );
    // console.log("[normalizedValue] value:", v);
    // if (!v) return undefined;
    // const d = new Date(v);
    // d.setMilliseconds(0);
    // d.setSeconds(0);
    // const val = d.toISOString().replace("Z", "");
    // return parseDateTime(val);
  };
  return (
    <I18nProvider locale="en-UK">
      <DatePicker
        aria-label="Date input"
        className="*:not-first:mt-2"
        hourCycle={24}
        value={normalizedValue(
          type === "string" ? value : value?.toISOString()
        )}
        granularity="minute"
        hideTimeZone
        onChange={(value) => onDateChange(value)}
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
