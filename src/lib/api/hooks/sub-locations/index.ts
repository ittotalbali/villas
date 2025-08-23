export interface SubLocation {
  id: number;
  name: string;
  location_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface SubLocationPagination {
  total_count: number;
  total_pages: number;
  page: number;
  length: number;
  has_more: boolean;
}

export interface SubLocationApiResponse {
  success: boolean;
  data: SubLocation[];
  message?: string;
  pagination?: SubLocationPagination | null;
}

export interface InfiniteSubLocationResponse {
  pages: SubLocationApiResponse[];
  pageParams: number[];
}

export interface SubLocationQueryParams {
  sort_by?: string; // default: "updated_at"
  sort_type?: "asc" | "desc"; // default: "desc"
  search_param?: string;
  location_id?: number | string;
  sub_location_id?: number | string;
  page?: number;
  length?: number;
  is_paginate?: boolean;
}

import type { AxiosResponse } from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const useInfiniteSubLocations = (
  baseParams: Omit<SubLocationQueryParams, "page">
) => {
  return useInfiniteQuery<
    SubLocationApiResponse,
    Error,
    InfiniteSubLocationResponse
  >({
    queryKey: ["infinite-sub-locations", baseParams],
    queryFn: async ({ pageParam = 1 }) => {
      const response: AxiosResponse<SubLocationApiResponse> = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/sub-location`,
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
    staleTime: 1000 * 60 * 15,
    // enabled: isEnabled,
  });
};
