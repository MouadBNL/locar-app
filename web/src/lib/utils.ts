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
