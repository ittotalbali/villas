import { useInfiniteVillas } from "@/lib/api/hooks/villas/useInfiniteVillas";

import { createContext, useContext, useEffect, useRef } from "react";
import type { InfiniteVillaResponse } from "@/lib/api/hooks/villas";
import type {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useVillaFilterStore } from "@/lib/store/filterStore";

interface ContextProps {
  data: InfiniteVillaResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<InfiniteVillaResponse, Error>>;
  observerTarget: React.RefObject<HTMLDivElement | null>;
}

const Context = createContext<ContextProps | undefined>(undefined);

export const ListContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const { filters } = useVillaFilterStore();

  const lat = parseFloat(searchParams.get("lat") ?? (searchParams.get("area_id") && "0") ?? (searchParams.get("location_id") && "0") ?? filters.lat ?? "0");
  const lng = parseFloat(searchParams.get("lng") ?? (searchParams.get("area_id") && "0") ?? (searchParams.get("location_id") && "0") ?? filters.lng ?? "0");
  const zoom = searchParams.get("zoom") ?? (searchParams.get("area_id") && "0") ?? (searchParams.get("location_id") && "0") ?? filters.zoom?.toString() ?? "0";

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteVillas(
    {
      lat: lat.toString(),
      lng: lng.toString(),
      zoom: parseInt(zoom),
      length: 18,
    },
    true
  );

  useEffect(() => {
    if (observerTarget.current && !isLoading) {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        {
          threshold: 0.1,
          rootMargin: "100px",
        }
      );

      observer.observe(observerTarget.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, isLoading]);

  return (
    <Context.Provider
      value={{
        data,
        isLoading,
        isError,
        isFetchingNextPage,
        observerTarget,
        hasNextPage,
        fetchNextPage,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useListContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useListContext must be useed within ListContextProvider");
  }

  return context;
};
