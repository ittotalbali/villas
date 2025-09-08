import { Button } from "@/components/ui/button";
import { useFilterContext } from "../context";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

type Props = {
  testid?: string;
  label: string;
  className?: string;
};

const ClearAllFilterButton = ({ label, className }: Props) => {
  const { draftFilters, clearAllDraftFilters, open, setOpen } =
    useFilterContext();

  const handleClick = useCallback(() => {
    clearAllDraftFilters();
    setOpen(false);
  }, [draftFilters, open]);

  return (
    <Button
      variant="outline"
      onClick={handleClick}
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
