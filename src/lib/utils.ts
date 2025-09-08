import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Villa } from "./api/hooks/villas";

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

export function generateVillaSlug(villa: Villa): string {
  const {
    type_of_accommodation,
    total_bedroom,
    sub_location,
    location,
    area,
    id,
  } = villa;

  // Handle null values with fallbacks
  const type = type_of_accommodation || "villa";
  const bedroom = total_bedroom != null ? total_bedroom : 0;
  const subLocation = sub_location || "unknown";
  const loc = location || "unknown";
  const areaName = area || "unknown";

  // Convert to lowercase and replace spaces with hyphens
  const slugParts = [
    type,
    `${bedroom}bedroom`,
    subLocation.replace(/\s+/g, "-").toLowerCase(),
    loc.replace(/\s+/g, "-").toLowerCase(),
    areaName.replace(/\s+/g, "-").toLowerCase(),
    id,
  ];

  // Join parts with hyphens
  const slug = slugParts.join("-");
  const basename = import.meta.env.VITE_PUBLIC_URL;

  // return `https://villa.totalbali.com/property/${slug}`;
  return `${basename}property/${slug}`;
}
