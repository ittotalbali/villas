// lib/api/hooks/villas/useFetchVillas.ts
import { useQuery } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import qs from "qs";
import type { VillaApiResponse, VillaQueryParams } from ".";
import { useVillaFilterStore } from "@/lib/store/filterStore";

export const useFetchVillas = (
  additionalParams: Partial<VillaQueryParams> = {},
  isEnabled: boolean = true
) => {
  const { filters } = useVillaFilterStore();

  const queryParams: VillaQueryParams = {
    ...filters,
    ...additionalParams,
    // status: "post",
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

  return useQuery<VillaApiResponse, Error>({
    queryKey: ["villas", cleanedParams],
    queryFn: async () => {
      const response: AxiosResponse<VillaApiResponse> = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/villa`,
        {
          params: cleanedParams,
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
    retry: 2,
    staleTime: 1 * 60 * 1000,
    enabled: isEnabled,
  });
};
