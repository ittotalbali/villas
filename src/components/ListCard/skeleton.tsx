import { cn } from "@/lib/utils";

type props = {
  testid?: string;
};

const ListCardSkeleton = ({}: props) => {
  return (
    <div
      className={cn(
        "flex flex-col bg-white rounded-xl overflow-hidden animate-pulse",
        "border border-gray-200",
        "h-[320px]"
      )}
      style={{ minWidth: "0", width: "100%" }}
    >
      {/* Image Skeleton */}
      <div className="relative w-full h-[200px]">
        {" "}
        {/* Fixed image height */}
        <div className="w-full h-full bg-gray-200 rounded-t-xl" />
        {/* Heart Icon Placeholder */}
        <div className="absolute top-3 right-3 w-6 h-6 bg-gray-300 rounded-full" />
        {/* Dots Indicator Placeholder */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {Array.from({ length: 5 }).map((_, dotIndex) => (
            <div
              key={dotIndex}
              className={cn(
                "w-1.5 h-1.5 rounded-full bg-gray-300",
                dotIndex === 0 && "bg-gray-400 scale-110"
              )}
            />
          ))}
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-col gap-1 p-2">
        {" "}
        {/* Tight padding to fit content */}
        {/* Location */}
        <div className="h-4 bg-gray-200 rounded w-1/2 mt-1" />
        {/* Code */}
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        {/* Details (beds, baths, availability) */}
        <div className="h-3 bg-gray-200 rounded w-2/3 mt-1" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        {/* Price */}
        <div className="h-4 bg-gray-200 rounded w-1/3 mt-1" />
      </div>
    </div>
  );
};

export default ListCardSkeleton;
