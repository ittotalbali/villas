import { cn } from "@/lib/utils";
import { useListCardImageContext } from "./context";

type Props = {
  testid?: string;
  arrow: "left" | "right";
};

const NavigationArrows = ({ arrow }: Props) => {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useListCardImageContext();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Add this line
    e.stopPropagation();

    if (arrow === "left") {
      scrollPrev();
    } else {
      scrollNext();
    }
  };

  // For loop carousel, we always show arrows since it can scroll infinitely
  const isDisabled = arrow === "left" ? !canScrollPrev : !canScrollNext;

  return (
    <button
      className={cn(
        "absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white border-none shadow-sm flex items-center justify-center z-10 transition-all duration-200",
        // Fixed positioning - no responsive changes
        arrow === "left" ? "left-3" : "right-3",
        // Visibility - always show on mobile, show on hover for desktop
        "opacity-100 md:opacity-0 md:group-hover:opacity-100",
        // Touch optimization
        "touch-manipulation active:scale-95",
        // Disabled state
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={`${arrow === "left" ? "Previous" : "Next"} image`}
    >
      {arrow === "left" ? (
        <svg
          data-testid={"arrow-left-icon"}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <polyline points="15,18 9,12 15,6" />
        </svg>
      ) : (
        <svg
          data-testid={"arrow-right-icon"}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <polyline points="9,18 15,12 9,6" />
        </svg>
      )}
    </button>
  );
};

export default NavigationArrows;
