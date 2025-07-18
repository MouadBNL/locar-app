import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generate_rental_code() {
  const d = new Date();
  return (
    "RE" +
    d.getFullYear().toString().slice(-2) +
    (d.getMonth() + 1).toString().padStart(2, "0") + // Month is 0-indexed
    d.getDate().toString().padStart(2, "0") +
    d.getHours().toString().padStart(2, "0") +
    d.getMinutes().toString().padStart(2, "0") +
    d.getSeconds().toString().padStart(2, "0")
  );
}

export function get_date(opt?: { day?: number }) {
  const d = new Date();
  if (opt?.day) {
    d.setDate(d.getDate() + opt.day);
  }
  return d;
}

export function fmt_date(date: Date, opt?: { format: "date" | "datetime" }) {
  const str = date.toISOString();
  const match = str.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?Z?$/
  );
  if (!match) return str;
  const [, year, month, day, hours, minutes, seconds, _milliseconds] = match;
  if (opt?.format === "date") {
    return `${year}-${month}-${day}T00:00:00Z`;
  }
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}
