import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import L from "leaflet";

type ViewMode = "list" | "map";

interface ContextProps {
  searchParams: URLSearchParams;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  isTablet: boolean;
  setIsTablet: React.Dispatch<React.SetStateAction<boolean>>;
  showCard: boolean;
  isDesktop: boolean;
  setIsDesktop: React.Dispatch<React.SetStateAction<boolean>>;
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  center: [number, number];
  centerLocation: [number, number];
  setCenter: React.Dispatch<React.SetStateAction<[number, number]>>;
  setCenterLocation: React.Dispatch<React.SetStateAction<[number, number]>>;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  selectedVilla: number | null;
  hoveredVilla: number | null;
  setHoveredVilla: React.Dispatch<React.SetStateAction<number | null>>;
  handleMarkerClick: (id: number) => void;
  handleCloseCard: () => void;
  markerRefs: React.RefObject<Record<number, L.Marker<any>>>;
}

const Context = createContext<ContextProps | undefined>(undefined);

export const HomeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [center, setCenter] = useState<[number, number]>([
    parseFloat(searchParams.get("lat") ?? "-8.663804"),
    parseFloat(searchParams.get("lng") ?? "115.141362"),
  ]);
  const [centerLocation, setCenterLocation] = useState<[number, number]>([
    parseFloat("-8.663804"),
    parseFloat("115.141362"),
  ]);
  const [showCard, setShowCard] = useState(false);
  const [zoom, setZoom] = useState<number>(
    parseInt(searchParams.get("zoom") ?? "16")
  );
  const [selectedVilla, setSelectedVilla] = useState<number | null>(null);
  const [hoveredVilla, setHoveredVilla] = useState<number | null>(null);
  const markerRefs = useRef<Record<number, L.Marker>>({});

  const handleMarkerClick = (id: number) => {
    setSelectedVilla(id);
    setShowCard(true);
  };

  const handleCloseCard = () => {
    setShowCard(false);
    setSelectedVilla(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const card = document.querySelector(".villa-card");
      if (card && !card.contains(event.target as Node)) {
        handleCloseCard();
      }
    };

    if (showCard) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCard]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
      if (width >= 1024) {
        setViewMode("list");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Context.Provider
      value={{
        searchParams,
        setSearchParams,
        isMobile,
        setIsMobile,
        isTablet,
        setIsTablet,
        isDesktop,
        setIsDesktop,
        viewMode,
        setViewMode,
        center,
        setCenter,
        zoom,
        setZoom,
        selectedVilla,
        showCard,
        handleMarkerClick,
        handleCloseCard,
        hoveredVilla,
        setHoveredVilla,
        markerRefs,
        centerLocation,
        setCenterLocation,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useHomeContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useHomeContext must be used within HomeContextProvider");
  }
  return context;
};
