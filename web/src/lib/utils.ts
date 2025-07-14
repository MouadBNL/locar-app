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
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  // const offset = date.getTimezoneOffset();
  // const offsetHours = Math.abs(Math.floor(offset / 60)).toString().padStart(2, "0");
  // const offsetMinutes = Math.abs(offset % 60).toString().padStart(2, "0");
  // const offsetSign = offset <= 0 ? "+" : "-";
  if (opt?.format === "date") {
    return `${year}-${month}-${day}T00:00:00Z`;
  }
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}
