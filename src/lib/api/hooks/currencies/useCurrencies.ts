import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ApiResponse } from "../..";
import type { CurrencyListResponse } from ".";

const fetchCurrencies = async (): Promise<CurrencyListResponse> => {
  const { data } = await axios.get<ApiResponse<CurrencyListResponse>>(
    `${
      import.meta.env.VITE_API_CURRENCY_URL
    }/api/v1/currencies?sort_by=id&sort_order=ASC`,
    {
      headers: {
        "x-pt-key": import.meta.env.VITE_API_CURRENCY_API_KEY, // 👈 inject from env
      },
    }
  );
  return data.data;
};

export const useCurrencies = () => {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
    staleTime: 1000 * 60 * 3,
  });
};
