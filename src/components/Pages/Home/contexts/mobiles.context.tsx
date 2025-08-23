import { useInfiniteVillas } from "@/lib/api/hooks/villas/useInfiniteVillas";
import { formatPrice } from "@/lib/utils";
import { flattenInfiniteVillas } from "@/lib/utils/villas";
import { debounce, type DebouncedFunc } from "lodash";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { getMarkerIcon } from "../components/Map/MarkerIcon";
import type { InfiniteVillaResponse, Villa } from "@/lib/api/hooks/villas";
import type {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

interface ContextProps {
  data: InfiniteVillaResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  selectedVilla: number | null;
  isFetchingNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<InfiniteVillaResponse, Error>>;
  observerTarget: React.RefObject<HTMLDivElement | null>;
  handleHover: DebouncedFunc<(id: number | null, hover: boolean) => void>;
  selectedVillaData: Villa | undefined;
}

const Context = createContext<ContextProps | undefined>(undefined);

export const HomeMobilesContextProvider = ({
  children,
  center,
  zoom,
  isDesktop,
  setHoveredVilla,
  markerRefs,
  selectedVilla,
}: {
  children: React.ReactNode;
  center: [number, number];
  zoom: number;
  isDesktop: boolean;
  selectedVilla: number | null;
  setHoveredVilla: React.Dispatch<React.SetStateAction<number | null>>;
  markerRefs: React.RefObject<Record<number, L.Marker<any>>>;
}) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteVillas(
    {
      lat: center[0].toString(),
      lng: center[1].toString(),
      zoom,
      length: 18,
    },
    !isDesktop
  );

  const villas = flattenInfiniteVillas(data);

  const selectedVillaData = useMemo(
    () => villas.find((v) => v.id === selectedVilla),
    [villas, selectedVilla]
  );

  const handleHover = useCallback(
    debounce((id: number | null, hover: boolean) => {
      setHoveredVilla(hover ? id : null);

      if (!hover || !id) {
        Object.entries(markerRefs.current).forEach(([villaId, marker]) => {
          const villa = villas.find((v) => v.id === Number(villaId));
          if (villa) {
            const priceLabel =
              villa.base_rate && villa.base_rate_currency
                ? `${villa.base_rate_currency} ${formatPrice(
                    Number(villa.base_rate),
                    villa.base_rate_currency
                  )}`
                : "-";
            marker.setIcon(getMarkerIcon(priceLabel, false));
            marker.setZIndexOffset(0);
          }
        });
        return;
      }

      const marker = markerRefs.current[id];
      if (marker) {
        const villa = villas.find((v) => v.id === id);
        if (villa) {
          const priceLabel =
            villa.base_rate && villa.base_rate_currency
              ? `${villa.base_rate_currency} ${formatPrice(
                  Number(villa.base_rate),
                  villa.base_rate_currency
                )}`
              : "-";
          marker.setIcon(getMarkerIcon(priceLabel, true));
          marker.setZIndexOffset(1000);
        }
      }

      Object.entries(markerRefs.current).forEach(([villaId, marker]) => {
        if (Number(villaId) !== id) {
          const villa = villas.find((v) => v.id === Number(villaId));
          if (villa) {
            const priceLabel =
              villa.base_rate && villa.base_rate_currency
                ? `${villa.base_rate_currency} ${formatPrice(
                    Number(villa.base_rate),
                    villa.base_rate_currency
                  )}`
                : "-";
            marker.setIcon(getMarkerIcon(priceLabel, false));
            marker.setZIndexOffset(0);
          }
        }
      });
    }, 50),
    [villas]
  );

  useEffect(() => {
    return () => {
      handleHover.cancel();
    };
  }, [handleHover]);

  useEffect(() => {
    if (!isDesktop && observerTarget.current && !isLoading) {
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
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, isDesktop, isLoading]);

  return (
    <Context.Provider
      value={{
        selectedVilla,
        data,
        isLoading,
        isError,
        isFetchingNextPage,
        observerTarget,
        hasNextPage,
        handleHover,
        fetchNextPage,
        selectedVillaData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useHomeMobilesContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useHomeMobilesContext must be useed within HomeMobilesContextProvider"
    );
  }

  return context;
};
