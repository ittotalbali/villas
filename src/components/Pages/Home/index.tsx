import DesktopLayout from "./components/DesktopLayout";
import MobileLayout from "./components/MobileLayout";
import { useHomeContext } from "./contexts/context";

type Props = {
  testid?: string;
};

const HomeContent = ({}: Props) => {
  const { isDesktop, isMobile, isTablet } = useHomeContext();
  return (
    <div className="flex-1 min-h-0">
      {/* DesktopLayout */}
      {isDesktop && <DesktopLayout />}

      {/* MobileLayout */}
      {(isMobile || isTablet) && <MobileLayout />}
    </div>
  );
};

export default HomeContent;
