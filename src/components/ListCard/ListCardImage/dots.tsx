import { cn } from "@/lib/utils";
import { useListCardImageContext } from "./context";
import { useListCardContext } from "../context";

const Dots = () => {
  const { villa } = useListCardContext();
  const { selectedIndex, scrollTo } = useListCardImageContext();

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    scrollTo(index);
  };

  const maxDotsToShow = 6;
  const dotSpacing = 10;
  const totalImages = villa.albums?.length || 0;

  const getDotOffset = () => {
    if (totalImages <= maxDotsToShow) return 0;

    if (selectedIndex < maxDotsToShow) return 0;

    const offset = (selectedIndex - (maxDotsToShow - 1)) * dotSpacing;
    const maxOffset = (totalImages - maxDotsToShow) * dotSpacing;
    return -Math.min(offset, maxOffset);
  };

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
      <div
        className="relative overflow-hidden"
        style={{ width: maxDotsToShow * dotSpacing }}
      >
        <div
          className="flex items-center gap-1 transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${getDotOffset()}px)` }}
        >
          {villa.albums?.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-1.5 h-1.5 rounded-full border-none cursor-pointer transition-all duration-200 flex-shrink-0",
                index === selectedIndex
                  ? "bg-white scale-110"
                  : "bg-white/60 hover:bg-white/80"
              )}
              onClick={(e) => handleDotClick(e, index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dots;
