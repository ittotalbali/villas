// components/Pages/Home/contexts/desktop.context.tsx
import type { Villa, VillaApiResponse } from "@/lib/api/hooks/villas";
import { useFetchVillas } from "@/lib/api/hooks/villas/useFetchVillas";
import { formatPrice } from "@/lib/utils";
import { debounce, type DebouncedFunc } from "lodash";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getMarkerIcon } from "../components/Map/MarkerIcon";
import { useVillaFilterStore } from "@/lib/store/filterStore";

interface ContextProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  data: VillaApiResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  selectedVilla: number | null;
  selectedVillaData: Villa | undefined;
  handleHover: DebouncedFunc<(id: number | null, hover: boolean) => void>;
}

const Context = createContext<ContextProps | undefined>(undefined);

export const HomeDesktopContextProvider = ({
  children,
  isDesktop,
  center,
  zoom,
  selectedVilla,
  setHoveredVilla,
  markerRefs,
}: {
  children: React.ReactNode;
  isDesktop: boolean;
  selectedVilla: number | null;
  center: [number, number];
  zoom: number;
  setHoveredVilla: React.Dispatch<React.SetStateAction<number | null>>;
  markerRefs: React.RefObject<Record<number, L.Marker<any>>>;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { filters } = useVillaFilterStore();

  // Use the updated useFetchVillas hook - it automatically includes Zustand filters
  const { data, isLoading, isError } = useFetchVillas(
    {
      lat: center[0].toString(),
      lng: center[1].toString(),
      zoom,
      page: currentPage,
      length: 18,
    },
    isDesktop
  );

  const villas = data?.data ? data?.data : [];

  const selectedVillaData = useMemo(
    () => data?.data.find((v) => v.id === selectedVilla),
    [data?.data, selectedVilla]
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <Context.Provider
      value={{
        currentPage,
        setCurrentPage,
        data,
        isLoading,
        isError,
        selectedVilla,
        selectedVillaData,
        handleHover,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useHomeDesktopContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useHomeDesktopContext must be used within HomeDesktopContextProvider"
    );
  }

  return context;
};
