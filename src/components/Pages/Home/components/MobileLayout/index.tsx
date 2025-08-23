import { useHomeContext } from "../../contexts/context";
import { HomeMobilesContextProvider } from "../../contexts/mobiles.context";
import MapSection from "./map";
import ViewModeButton from "./view-mode-button";
import VillaListSection from "./VillaList";

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
    viewMode,
    selectedVilla,
  } = useHomeContext();

  return (
    <HomeMobilesContextProvider
      center={center}
      isDesktop={isDesktop}
      zoom={zoom}
      selectedVilla={selectedVilla}
      markerRefs={markerRefs}
      setHoveredVilla={setHoveredVilla}
    >
      <div className="h-full flex flex-col">
        {/* list View */}
        {viewMode === "list" && <VillaListSection />}

        {/* Map view */}
        {viewMode === "map" && <MapSection />}

        <ViewModeButton />
      </div>
    </HomeMobilesContextProvider>
  );
};

export default MobileLayout;
