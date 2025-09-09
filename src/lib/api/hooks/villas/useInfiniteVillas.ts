// lib/api/hooks/villas/useInfiniteVillas.ts
import type { AxiosResponse } from "axios";
import type {
  InfiniteVillaResponse,
  VillaApiResponse,
  VillaQueryParams,
} from ".";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import qs from "qs";
import { useVillaFilterStore } from "@/lib/store/filterStore";

export const useInfiniteVillas = (
  baseParams: Omit<VillaQueryParams, "page">,
  isEnabled: boolean = false
) => {
  const { filters } = useVillaFilterStore();

  const queryParams: VillaQueryParams = {
    ...filters,
    ...baseParams,
    // status: "post", // Always filter for published villas
    is_paginate: true,
  };

  // Clean up undefined values
  const cleanedParams = Object.fromEntries(
    Object.entries(queryParams).filter(([key, value]) => {
      if (value === undefined) return false;

      if (key === "lat") {
        if (value === "0") {
          return false;
        }
      }

      if (key === "lng") {
        if (value === "0") {
          return false;
        }
      }

      if (key === "zoom") {
        if (value === 0) {
          return false;
        }
      }

      return true;
    })
  );

  return useInfiniteQuery<VillaApiResponse, Error, InfiniteVillaResponse>({
    queryKey: ["infinite-villas", cleanedParams],
    queryFn: async ({ pageParam = 1 }) => {
      const response: AxiosResponse<VillaApiResponse> = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/villa`,
        {
          params: {
            ...cleanedParams,
            page: pageParam,
            is_paginate: true,
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, {
              arrayFormat: "brackets",
              encode: false,
            });
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
