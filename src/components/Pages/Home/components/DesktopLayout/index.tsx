import { useHomeContext } from "../../contexts/context";
import { HomeDesktopContextProvider } from "../../contexts/desktop.context";
import MapSection from "./map";

import VillaListSection from "./VillaList";

type Props = {
  testid?: string;
};

const DesktopLayout = ({}: Props) => {
  const {
    center,
    isDesktop,
    zoom,
    selectedVilla,
    markerRefs,
    setHoveredVilla,
  } = useHomeContext();

  return (
    <HomeDesktopContextProvider
      center={center}
      isDesktop={isDesktop}
      zoom={zoom}
      selectedVilla={selectedVilla}
      markerRefs={markerRefs}
      setHoveredVilla={setHoveredVilla}
    >
      <div className="flex desktop-layout">
        {/* Villa List - Responsive width */}
        <VillaListSection />

        {/* Sticky Map Container - Grows with viewport */}
        <MapSection />
      </div>
    </HomeDesktopContextProvider>
  );
};

export default DesktopLayout;
