import { Button } from "@/components/ui/button";
import { useFilterContext } from "../context";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  testid?: string;
  label: string;
  className?: string;
};

const ApplyFilterButton = ({ label, className }: Props) => {
  const { applyFilters, getDraftActiveFilterCount } = useFilterContext();
  return (
    <Button
      onClick={applyFilters}
      className={cn(
        "w-full sm:w-auto order-1 sm:order-2 border min-h-[42px] border-gray-300",
        className
      )}
    >
      {label}
      {getDraftActiveFilterCount > 0 && (
        <Badge variant="secondary" className="ml-2">
          {getDraftActiveFilterCount}
        </Badge>
      )}
    </Button>
  );
};

export default ApplyFilterButton;
