import { X } from "lucide-react";
import { useListCardContext } from "../context";

const ActionButton = () => {
  const { handleCloseCard } = useListCardContext();
  return (
    <button
      className="absolute top-3 right-3 w-7 h-7  rounded-full bg-white cursor-pointer  border-none flex items-center justify-center transition-colors duration-200 z-10"
      onClick={(e) => {
        e.preventDefault();
        handleCloseCard();
      }}
      aria-label="Add to favorites"
    >
      <X className="w-5 h-5 text-black" />
    </button>
  );
};

export default ActionButton;
