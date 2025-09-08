import { useNavigate, useSearchParams } from "react-router-dom";
import { useHomeContext } from "../../contexts/context";
import { HomeMobilesContextProvider } from "../../contexts/mobiles.context";
import MapSection from "./map";
import { List } from "lucide-react";
import { useCallback } from "react";

type Props = {
  testid?: string;
};

const MobileLayout = ({}: Props) => {
  const {
    center,
    isDesktop,
    zoom,
    markerRefs,
    setHoveredVilla,
    selectedVilla,
    viewMode,
    setViewMode,
  } = useHomeContext();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lat = parseFloat(searchParams.get("lat") ?? "-8.663804");
  const lng = parseFloat(searchParams.get("lng") ?? "115.141362");
  const zoomS = searchParams.get("zoom") ?? "12";

  const handleShowMap = useCallback(() => {
    setViewMode("list");
  }, [viewMode]);

  return (
    <HomeMobilesContextProvider
      center={center}
      isDesktop={isDesktop}
      zoom={zoom}
      selectedVilla={selectedVilla}
      markerRefs={markerRefs}
      setHoveredVilla={setHoveredVilla}
    >
      <div className="flex-1 min-h-0 relative">
        {/* list View */}
        {/* {viewMode === "list" && <VillaListSection />} */}

        {/* Map view */}
        <MapSection />

        <button
          className="fixed bottom-4 left-1/2 font-semibold transform -translate-x-1/2 bg-[#75c5f0] text-white shadow-lg hover:bg-[#5ab3db] active:bg-[#4a9bc4] transition-all duration-200 z-10 flex items-center justify-center gap-2
    px-6 py-3 rounded-full text-base min-w-[140px]
    md:px-5 md:py-2.5 md:text-sm md:min-w-[120px]
    sm:px-4 sm:py-2 sm:text-sm sm:min-w-[100px] sm:gap-1.5
    xs:px-3 xs:py-1.5 xs:text-xs xs:min-w-[90px] xs:gap-1"
          onClick={() => {
            // Add your map showing logic here
            navigate(`/` + `?lat=${lat}&lng=${lng}&zoom=${zoomS}`);
            handleShowMap();
          }}
        >
          <List className="w-5 h-5 md:w-4 md:h-4 sm:w-4 sm:h-4 xs:w-3.5 xs:h-3.5" />
          <span className="sm:hidden xs:hidden">List</span>
          <span className="hidden sm:inline xs:inline">Show List</span>
        </button>
      </div>
    </HomeMobilesContextProvider>
  );
};

export default MobileLayout;
