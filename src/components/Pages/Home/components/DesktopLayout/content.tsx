import MapSection from "./map";
import VillaListSection from "./VillaList";
import { useHomeDesktopContext } from "../../contexts/desktop.context";
import { useHomeContext } from "../../contexts/context";
import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const DesktopContent = () => {
  const { fullMap } = useHomeDesktopContext();
  const navigate = useNavigate();
  const { viewMode, setViewMode } = useHomeContext();
  const [searchParams] = useSearchParams();
  const lat = parseFloat(searchParams.get("lat") ?? "-8.663804");
  const lng = parseFloat(searchParams.get("lng") ?? "115.141362");
  const zoom = searchParams.get("zoom") ?? "12";

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
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#75c5f0] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#75c5f0] transition-colors z-10"
        onClick={() => {
          // Add your map showing logic here
          navigate(`/` + `?lat=${lat}&lng=${lng}&zoom=${zoom}`);
          handleShowMap();
        }}
      >
        Show List
      </button>
    </div>
  );
};

export default DesktopContent;
