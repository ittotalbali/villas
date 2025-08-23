import { useInfiniteQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import axios from "axios";

// src/libs/api/types/area.ts
export interface Area {
  id: number;
  name: string;
  country_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface AreaPagination {
  total_count: number;
  total_pages: number;
  page: number;
  size: number;
  has_more: boolean;
}

export interface AreaApiResponse {
  success: boolean;
  data: Area[];
  message?: string;
  pagination: AreaPagination | null;
}

export interface InfiniteAreaResponse {
  pages: AreaApiResponse[];
  pageParams: number[];
}

// Request DTO params (matches backend service)
export interface AreaQueryParams {
  sort_by?: string; // default: "updated_at"
  sort_type?: "asc" | "desc"; // default: "desc"
  search_param?: string;
  country_id?: number | string;
  area_id?: number | string;
  page?: number; // for pagination
  length?: number; // per-page size
  is_paginate?: boolean;
}

export const useInfiniteAreas = (baseParams: Omit<AreaQueryParams, "page">) => {
  return useInfiniteQuery<AreaApiResponse, Error, InfiniteAreaResponse>({
    queryKey: ["infinite-areas", baseParams],
    queryFn: async ({ pageParam = 1 }) => {
      const response: AxiosResponse<AreaApiResponse> = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/area`,
        {
          params: {
            ...baseParams,
            page: pageParam,
            is_paginate: true, // backend expects this for paginated mode
          },
        }
      );
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination || !lastPage.pagination.has_more) {
        return undefined;
      }
      return lastPage.pagination.page + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.pagination?.page === 1) return undefined;
      return firstPage.pagination?.page
        ? firstPage.pagination.page - 1
        : undefined;
    },
    retry: 2,
    staleTime: 1000 * 60 * 15,
    // enabled: isEnabled,
  });
};
