// src/libs/api/types/facility.ts
export interface Facility {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface FacilityPagination {
  total_count: number;
  total_pages: number;
  page: number;
  size: number;
  has_more: boolean;
}

export interface FacilityApiResponse {
  success: boolean;
  data: Facility[]; // normalize: always array in paginated mode
  message?: string;
  pagination: FacilityPagination | null;
}

export interface InfiniteFacilityResponse {
  pages: FacilityApiResponse[];
  pageParams: number[];
}

// DTO params (backend-compatible)
export interface FacilityQueryParams {
  sort_by?: string; // default: "updated_at"
  sort_type?: "asc" | "desc"; // default: "desc"
  search_param?: string;
  facility_id?: number | string;
  page?: number;
  length?: number;
  is_paginate?: boolean;
}

import type { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Simplified query params for non-paginated API
export interface FacilityQueryParamsNonPaginated
  extends Omit<FacilityQueryParams, "page" | "is_paginate" | "length"> {}

// Hook to fetch facilities without pagination
export const useFacilities = (
  baseParams: FacilityQueryParamsNonPaginated,
  isEnabled: boolean = true
) => {
  return useQuery<FacilityApiResponse, Error>({
    queryKey: ["facilities", baseParams],
    queryFn: async () => {
      const response: AxiosResponse<FacilityApiResponse> = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/facility`,
        {
          params: {
            ...baseParams,
            is_paginate: false, // Disable backend pagination
          },
        }
      );
      return response.data;
    },
    retry: 2,
    staleTime: 1000 * 60 * 15, // 15 minutes
    enabled: isEnabled,
  });
};
