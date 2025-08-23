// src/libs/api/types/location.ts
export interface Location {
  id: number;
  name: string;
  area_id: string;
  latitude: string | null;
  longitude: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface LocationPagination {
  total_count: number;
  total_pages: number;
  page: number;
  size: number;
  has_more: boolean;
}

export interface LocationApiResponse {
  success: boolean;
  data: Location[];
  message: string;
  pagination: LocationPagination | null;
}

export interface InfiniteLocationResponse {
  pages: LocationApiResponse[];
  pageParams: number[];
}

// request DTO (backend-compatible)
export interface LocationQueryParams {
  sort_by?: string; // e.g. "name"
  area_id?: string | null;
  search_param?: string | null;
  page?: number;
  length?: number;
  is_paginate?: boolean;
}

// src/libs/api/hooks/useInfiniteLocations.ts
import type { AxiosResponse } from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const useInfiniteLocations = (
  baseParams: Omit<LocationQueryParams, "page">
) => {
  return useInfiniteQuery<LocationApiResponse, Error, InfiniteLocationResponse>(
    {
      queryKey: ["infinite-locations", baseParams],
      queryFn: async ({ pageParam = 1 }) => {
        const response: AxiosResponse<LocationApiResponse> = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/location`,
          {
            params: {
              ...baseParams,
              page: pageParam,
              is_paginate: true,
            },
          }
        );
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (!lastPage.pagination?.has_more) return undefined;
        return lastPage.pagination.page + 1;
      },
      getPreviousPageParam: (firstPage) => {
        if (firstPage.pagination?.page === 1) return undefined;
        return firstPage.pagination?.page
          ? firstPage.pagination.page - 1
          : undefined;
      },
      retry: 2,
      staleTime: 1000 * 60 * 15, // 15 min
      // enabled: isEnabled,
    }
  );
};
