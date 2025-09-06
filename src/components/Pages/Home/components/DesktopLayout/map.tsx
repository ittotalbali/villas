import Map from "../Map";
import { useHomeDesktopContext } from "../../contexts/desktop.context";
import { useHomeContext } from "../../contexts/context";
import MarkerCard from "../MarkerCard";
import { Expand, X } from "lucide-react";

const MapSection = () => {
  const { showCard, handleCloseCard } = useHomeContext();
  const { data, selectedVillaData, isLoading, fullMap, handleFullMapMode } =
    useHomeDesktopContext();

  const villas = data?.data ? data?.data : [];

  return (
    <div
      className="flex-grow map-container"
      style={{
        minWidth: "400px",
        flex: "1 1 auto",
        position: "relative",
      }}
    >
      <div className="sticky top-4 h-[calc(92vh-2rem)] pt-4 ">
        <div
          className="w-full h-full bg-white rounded-lg shadow-lg border border-gray-200 my-auto"
          style={{ position: "relative", overflow: "visible" }}
        >
          <div
            style={{
              zIndex: 1000,
            }}
            className="absolute top-4 bg-white rounded-full p-3 right-4 cursor-pointer hover:bg-gray-100"
            onClick={handleFullMapMode}
          >
            {!fullMap ? (
              <Expand className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </div>
          {isLoading && (
            <div
              className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-2"
              style={{
                zIndex: 1000,
                background: "rgba(255, 255, 255, 0.9)",
                padding: "8px 16px",
                borderRadius: "12px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="w-3 h-3 bg-black rounded-full animate-dot-pulse delay-0"></div>
              <div className="w-3 h-3 bg-black rounded-full animate-dot-pulse delay-200"></div>
              <div className="w-3 h-3 bg-black rounded-full animate-dot-pulse delay-400"></div>
            </div>
          )}
          <Map
            villas={villas}
            style={{
              height: "60%",
              borderRadius: "8px",
              position: "relative",
              zIndex: 1,
              width: "100%",
            }}
          />
          {showCard && selectedVillaData && (
            <MarkerCard villa={selectedVillaData} onClose={handleCloseCard} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MapSection;
