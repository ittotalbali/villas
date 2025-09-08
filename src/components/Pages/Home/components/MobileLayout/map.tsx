import { flattenInfiniteVillas } from "@/lib/utils/villas";
import { useHomeMobilesContext } from "../../contexts/mobiles.context";
import Map from "../Map";
import { useHomeContext } from "../../contexts/context";
import ListCard from "@/components/ListCard";
import { generateVillaSlug } from "@/lib/utils";

type Props = {
  testid?: string;
};

const MapSection = ({}: Props) => {
  const { showCard, handleCloseCard } = useHomeContext();
  const { data, isLoading, selectedVillaData } = useHomeMobilesContext();

  const villas = flattenInfiniteVillas(data);

  return (
    <div className="flex-1 z-0 relative">
      <Map
        villas={villas}
        className="w-full h-full"
        style={{ height: "60%" }}
      />
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
      {showCard && selectedVillaData && (
        <a
          key={`${selectedVillaData.id}`}
          href={generateVillaSlug(selectedVillaData)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListCard
            villa={selectedVillaData}
            isSelected={false}
            onClick={() => {}}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
            forMap
            handleCloseCard={handleCloseCard}
          />
        </a>
      )}
    </div>
  );
};

export default MapSection;
