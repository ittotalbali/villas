import Map from "../Map";
import { useHomeDesktopContext } from "../../contexts/desktop.context";
import { useHomeContext } from "../../contexts/context";
import MarkerCard from "../MarkerCard";

const MapSection = () => {
  const { showCard, handleCloseCard } = useHomeContext();
  const { data, selectedVillaData } = useHomeDesktopContext();

  const villas = data?.data ? data?.data : [];
  return (
    <div
      className="flex-grow map-container"
      style={{
        // Map takes remaining space, grows larger on bigger screens
        minWidth: "400px",
        // This ensures the map expands as viewport increases
        flex: "1 1 auto",
      }}
    >
      <div className="sticky top-4 h-[calc(92vh-2rem)] pt-4">
        <div className="w-full h-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden my-auto">
          <Map villas={villas} style={{ height: "60%", borderRadius: "8px" }} />
          {showCard && selectedVillaData && (
            <MarkerCard villa={selectedVillaData} onClose={handleCloseCard} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MapSection;
