import { Button } from "@/components/ui/button";
import { useFilterContext } from "../context";
import { cn } from "@/lib/utils";

type Props = {
  testid?: string;
  label: string;
  className?: string;
};

const ApplyFilterButton = ({ label, className }: Props) => {
  const { applyFilters, getDraftActiveFilterCount } = useFilterContext();

  return (
    <div className="w-full relative inline-block">
      <Button
        onClick={applyFilters}
        className={cn(
          "w-full sm:w-auto  border min-h-[42px] border-gray-300",
          className
        )}
      >
        {label}
      </Button>

      {/* Floating notification badge */}
      {getDraftActiveFilterCount > 0 && (
        <div
          className={cn(
            "absolute -top-2 -right-2 z-10",
            "min-w-5 h-5 px-1.5",
            "flex items-center justify-center",
            "bg-red-500 text-white text-xs font-semibold",
            "rounded-full ",
            "shadow-sm",
            "animate-in zoom-in-0 duration-200"
          )}
        >
          {getDraftActiveFilterCount > 99 ? "99+" : getDraftActiveFilterCount}
        </div>
      )}
    </div>
  );
};

export default ApplyFilterButton;
