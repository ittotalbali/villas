import { flattenInfiniteVillas } from "@/lib/utils/villas";
import { useHomeMobilesContext } from "../../contexts/mobiles.context";
import Map from "../Map";
import MarkerCard from "../MarkerCard";
import { useHomeContext } from "../../contexts/context";

type Props = {
  testid?: string;
};

const MapSection = ({}: Props) => {
  const { showCard, handleCloseCard } = useHomeContext();
  const { data, selectedVillaData } = useHomeMobilesContext();

  const villas = flattenInfiniteVillas(data);

  return (
    <div className="flex-1 relative">
      <Map
        villas={villas}
        className="w-full h-full"
        style={{ height: "calc(100vh - 64px)" }}
      />
      {showCard && selectedVillaData && (
        <MarkerCard villa={selectedVillaData} onClose={handleCloseCard} />
      )}
    </div>
  );
};

export default MapSection;
