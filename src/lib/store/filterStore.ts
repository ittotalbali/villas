// Zustand store for villa filters
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Villa Query Params Interface
export interface VillaQueryParams {
  curs_exchanges_id?: number;
  lat?: string;
  lng?: string;
  zoom?: number;
  page?: number;
  length?: number;
  sort_by?: string;
  sort_type?: "asc" | "desc";
  search_param?: string;
  status?: "draft" | "post";
  limit?: number;
  area_id?: number;
  location_id?: number;
  sub_location_id?: number;
  start_date?: string;
  end_date?: string;
  bathroom?: number;
  user_id?: number;
  villa_bvp?: string;
  slug?: string;
  whatsapp?: string;
  email?: string;
  type_accommodation?: "house" | "guesthouse" | "hotel" | "apartment" | "villa";
  freehold?: "yes" | "no";
  leasehold?: "yes" | "no";
  monthly_rental?: "yes" | "no";
  yearly_rental?: "yes" | "no";
  retreats_villa?: { params: string[] };
  mountain_villa?: { params: string[] };
  wedding_villa?: { params: Record<string, any> | string[] };
  beach_villa?: { params: string[] };
  family_villa?: { params: string[] };
  close_clubs?: boolean;
  facilities?: string[];
  price_min?: number;
  price_max?: number;
  bedroom?: number;
  code?: string;
  is_paginate?: boolean;
}

// Zustand Store
interface VillaFilterStore {
  filters: VillaQueryParams;
  setFilters: (filters: VillaQueryParams) => void;
  clearAllFilters: () => void;
  getActiveFilterCount: () => number;
}

export const useVillaFilterStore = create<VillaFilterStore>()(
  persist(
    (set, get) => ({
      filters: {},

      setFilters: (newFilters) => set({ filters: newFilters }),

      clearAllFilters: () => set({ filters: {} }),

      getActiveFilterCount: () => {
        const filters = get().filters;
        let count = 0;

        // Count basic filters
        if (filters.curs_exchanges_id) count++;
        if (filters.area_id) count++;
        if (filters.location_id) count++;
        if (filters.sub_location_id) count++;
        if (filters.type_accommodation) count++;
        if (filters.bathroom) count++;
        if (filters.bedroom) count++;
        if (filters.price_min || filters.price_max) count++;
        if (filters.start_date || filters.end_date) count++;
        if (filters.search_param) count++;

        // Count property type filters
        if (filters.freehold === "yes") count++;
        if (filters.leasehold === "yes") count++;
        if (filters.monthly_rental === "yes") count++;
        if (filters.yearly_rental === "yes") count++;
        if (filters.close_clubs) count++;

        // Count facilities
        if (filters.facilities?.length) count += filters.facilities.length;

        // Count villa type specific filters
        const villaTypes = [
          "retreats_villa",
          "wedding_villa",
          "family_villa",
          "mountain_villa",
          "beach_villa",
        ] as const;
        villaTypes.forEach((type) => {
          const typeFilters = filters[type] as any;
          if (typeFilters?.params) {
            if (Array.isArray(typeFilters.params)) {
              count += typeFilters.params.length;
            } else if (typeof typeFilters.params === "object") {
              count += Object.values(typeFilters.params).filter(Boolean).length;
            }
          }
        });

        return count;
      },
    }),
    {
      name: "villa-filters",
    }
  )
);
