import type { AxiosResponse } from "axios";
import type {
  InfiniteVillaResponse,
  VillaApiResponse,
  VillaQueryParams,
} from ".";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const useInfiniteVillas = (
  baseParams: Omit<VillaQueryParams, "page">,
  isEnabled: boolean = false
) => {
  return useInfiniteQuery<VillaApiResponse, Error, InfiniteVillaResponse>({
    queryKey: ["infinite-villas", baseParams],
    queryFn: async ({ pageParam = 1 }) => {
      const response: AxiosResponse<VillaApiResponse> = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/villa`,
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
      if (!lastPage.pagination || !lastPage.pagination.has_more) {
        return undefined;
      }
      return lastPage.pagination.page + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.pagination?.page === 1) {
        return undefined;
      }
      return firstPage.pagination?.page
        ? firstPage.pagination.page - 1
        : undefined;
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
    enabled: isEnabled,
  });
};
