import { useHomeContext } from "../../contexts/context";

type Props = {
  testid?: string;
};

const ViewModeButton = ({}: Props) => {
  const { viewMode, setViewMode } = useHomeContext();
  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "map" : "list");
  };
  return (
    <button
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-pink-500 text-white border-none rounded-full px-6 py-3 font-semibold shadow-lg cursor-pointer"
      onClick={toggleViewMode}
    >
      {viewMode === "list" ? "Show Map" : "Show Villas"}
    </button>
  );
};

export default ViewModeButton;
