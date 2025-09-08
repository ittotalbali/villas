import { Button } from "@/components/ui/button";
import { useFilterContext } from "../context";
import { cn } from "@/lib/utils";

type Props = {
  testid?: string;
  label: string;
  className?: string;
};

const ClearAllFilterButton = ({ label, className }: Props) => {
  const { clearAllDraftFilters, getDraftActiveFilterCount } =
    useFilterContext();

  return (
    <Button
      variant="outline"
      onClick={clearAllDraftFilters}
      disabled={getDraftActiveFilterCount === 0}
      className={cn(
        "w-full sm:w-auto border min-h-[42px] border-gray-300",
        className
      )}
    >
      {label}
    </Button>
  );
};

export default ClearAllFilterButton;
