import { forwardRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useVillaFilterStore } from "@/lib/store/filterStore";
import { SlidersHorizontal } from "lucide-react";

type Props = {
  testid?: string;
} & React.ComponentPropsWithoutRef<"button">;

const FilterButton = forwardRef<HTMLButtonElement, Props>(
  ({ testid, ...props }, ref) => {
    const { getActiveFilterCount } = useVillaFilterStore();
    const count = getActiveFilterCount();

    return (
      <Button
        ref={ref}
        {...props}
        variant="outline"
        className="relative rounded-full flex items-center justify-center p-0 border border-gray-300 min-h-[42px] w-full"
        data-testid={testid}
      >
        <SlidersHorizontal className="h-5 w-5" />
        Filters
        {count > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            {count}
          </Badge>
        )}
      </Button>
    );
  }
);

FilterButton.displayName = "FilterButton";

export default FilterButton;
