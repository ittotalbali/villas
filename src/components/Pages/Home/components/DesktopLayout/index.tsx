import { useHomeContext } from "../../contexts/context";
import { HomeDesktopContextProvider } from "../../contexts/desktop.context";
import DesktopContent from "./content";

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
      <DesktopContent />
    </HomeDesktopContextProvider>
  );
};

export default DesktopLayout;
