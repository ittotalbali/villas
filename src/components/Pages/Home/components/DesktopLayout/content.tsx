import MapSection from "./map";
import VillaListSection from "./VillaList";
import { useHomeDesktopContext } from "../../contexts/desktop.context";
import { useHomeContext } from "../../contexts/context";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { List } from "lucide-react";

const DesktopContent = () => {
  const { fullMap } = useHomeDesktopContext();
  const { viewMode, setViewMode } = useHomeContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = () => {
    navigate({
      pathname: "/",
      search: location.search,
    });
  };

  const handleShowMap = useCallback(() => {
    setViewMode("list");
  }, [viewMode]);

  return (
    <div className="flex desktop-layout">
      {/* Villa List - Responsive width */}
      {!fullMap && <VillaListSection />}

      {/* Sticky Map Container - Grows with viewport */}
      <MapSection />

      <button
        className="fixed bottom-4 left-1/2 font-semibold transform -translate-x-1/2 bg-[#75c5f0] text-white shadow-lg hover:bg-[#5ab3db] active:bg-[#4a9bc4] transition-all duration-200 z-10 flex items-center justify-center gap-2
    px-6 py-3 rounded-full text-base min-w-[140px]
    md:px-5 md:py-2.5 md:text-sm md:min-w-[120px]
    sm:px-4 sm:py-2 sm:text-sm sm:min-w-[100px] sm:gap-1.5
    xs:px-3 xs:py-1.5 xs:text-xs xs:min-w-[90px] xs:gap-1"
        onClick={() => {
          // Add your map showing logic here
          handleNavigate();
          handleShowMap();
        }}
      >
        <List className="w-5 h-5 md:w-4 md:h-4 sm:w-4 sm:h-4 xs:w-3.5 xs:h-3.5" />
        <span className="sm:hidden xs:hidden">List</span>
        <span className="hidden sm:inline xs:inline">Show List</span>
      </button>
    </div>
  );
};

export default DesktopContent;
