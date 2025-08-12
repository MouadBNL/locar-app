import type { ClassValue } from 'clsx';
import { isAxiosError } from 'axios';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generate_rental_code() {
  const d = new Date();
  return (
    `RE${
      d.getFullYear().toString().slice(-2)
    }${(d.getMonth() + 1).toString().padStart(2, '0') // Month is 0-indexed
    }${d.getDate().toString().padStart(2, '0')
    }${d.getHours().toString().padStart(2, '0')
    }${d.getMinutes().toString().padStart(2, '0')
    }${d.getSeconds().toString().padStart(2, '0')}`
  );
}

export function generate_reservation_number() {
  const d = new Date();
  return (
    `RS${
      d.getFullYear().toString().slice(-2)
    }${(d.getMonth() + 1).toString().padStart(2, '0') // Month is 0-indexed
    }${d.getDate().toString().padStart(2, '0')
    }${d.getHours().toString().padStart(2, '0')
    }${d.getMinutes().toString().padStart(2, '0')
    }${d.getSeconds().toString().padStart(2, '0')}`
  );
}

export function get_date(opt?: { day?: number }) {
  const d = new Date();
  if (opt?.day) {
    d.setDate(d.getDate() + opt.day);
  }
  return d;
}

export function get_date_range(date: Date, days: number) {
  return {
    start_date: new Date(date.getTime() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end_date: new Date(date.getTime() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  };
}

export function get_date_enum(start_date: Date, end_date: Date) {
  const dates = [];
  const currentDate = new Date(start_date); // Create a mutable copy of the start date
  while (currentDate.getTime() <= end_date.getTime()) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export function fmt_date(date: Date, opt?: { format: 'date' | 'datetime' }) {
  const str = date.toISOString();
  const match = str.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?Z?$/,
  );
  if (!match)
    return str;
  const [, year, month, day, hours, minutes, seconds] = match;
  if (opt?.format === 'date') {
    return `${year}-${month}-${day}T00:00:00Z`;
  }
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

export function fmt_currency(amount: number) {
  return (
    `${new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      useGrouping: true,
      // currency: "MAD",
      // unit: "DH",
      // currencySign: "accounting",
    }).format(amount)} DH`
  );
}

export function str_to_titlecase(str: string) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

type MessageError = `${'vehicle' | 'customer'}.unavailable.${
  | 'rental'
  | 'reservation'
  | 'repair'}`;
export function parse_availability_error(error: unknown) {
  if (isAxiosError(error) && error.status === 409) {
    const data = error.response?.data as {
      message: MessageError;
      cause: {
        availability: false;
        start_date: string;
        end_date: string;
      };
    };
    // const [entity, , type] = data.message.split('.') as [
    //   'vehicle' | 'customer',
    //   'unavailable',
    //   'rental' | 'reservation' | 'repair',
    // ];

    // let cause = 'not available';
    // if (type === 'repair') {
    //   cause = 'under repair';
    // }
    // if (type === 'reservation') {
    //   cause = 'already booked';
    // }
    // if (type === 'rental') {
    //   cause = 'already rented';
    // }

    return {
      code: data.message,
      start_date: fmt_date(new Date(data.cause.start_date), { format: 'date' }).split('T')[0],
      end_date: fmt_date(new Date(data.cause.end_date), { format: 'date' }).split('T')[0],
    };

    // return `${str_to_titlecase(entity)} is ${cause} between ${
    //   fmt_date(new Date(data.cause.start_date), { format: 'date' }).split(
    //     'T',
    //   )[0]
    // } and ${
    //   fmt_date(new Date(data.cause.end_date), { format: 'date' }).split('T')[0]
    // }`;
  }
}

export function date_diff_in_days(a?: string | null, b?: string | null) {
  if (!a || !b)
    return 0;
  const dateA = new Date(a);
  const dateB = new Date(b);
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(
    dateA.getFullYear(),
    dateA.getMonth(),
    dateA.getDate(),
  );
  const utc2 = Date.UTC(
    dateB.getFullYear(),
    dateB.getMonth(),
    dateB.getDate(),
  );

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
