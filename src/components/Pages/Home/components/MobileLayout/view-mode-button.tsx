import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

type Props = {
  testid?: string;
};

const ViewModeButton = ({}: Props) => {
  const navigate = useNavigate();
  const toggleViewMode = () => {
    // setViewMode(viewMode === "list" ? "map" : "list");
    navigate("/");
  };
  return (
    <button
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2  bg-[#75c5f0] text-white border-none rounded-full px-6 py-3 font-semibold shadow-lg cursor-pointer"
      )}
      onClick={toggleViewMode}
    >
      Show Villas
    </button>
  );
};

export default ViewModeButton;
