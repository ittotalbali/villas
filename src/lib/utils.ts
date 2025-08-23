import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (amount: number, currency: string) => {
  const locale = currency === "IDR" ? "id-ID" : "en-US";
  let formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${formatted}`;
};
