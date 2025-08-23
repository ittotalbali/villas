// lib/api/hooks/villas/useFetchVillas.ts
import { useQuery } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import type { VillaApiResponse, VillaQueryParams } from ".";
import { useVillaFilterStore } from "@/lib/store/filterStore";

export const useFetchVillas = (
  additionalParams: Partial<VillaQueryParams> = {},
  isEnabled: boolean = false
) => {
  // Get filters from Zustand store
  const { filters } = useVillaFilterStore();

  // Merge Zustand filters with additional params
  const queryParams: VillaQueryParams = {
    ...filters,
    ...additionalParams,
    // status: "post", // Always filter for published villas
    is_paginate: true,
  };

  // Clean up undefined values
  const cleanedParams = Object.fromEntries(
    Object.entries(queryParams).filter(([_, value]) => value !== undefined)
  );

  return useQuery<VillaApiResponse, Error>({
    queryKey: ["villas", cleanedParams], // Query key includes all filters
    queryFn: async () => {
      const response: AxiosResponse<VillaApiResponse> = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/villa`,
        {
          params: cleanedParams,
        }
      );
      return response.data;
    },
    retry: 2,
    staleTime: 1 * 60 * 1000,
    enabled: isEnabled,
  });
};
