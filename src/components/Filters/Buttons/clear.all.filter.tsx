import { Button } from "@/components/ui/button";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
  label: string;
};

const ClearAllFilterButton = ({ label }: Props) => {
  const { clearAllDraftFilters, getDraftActiveFilterCount } =
    useFilterContext();

  return (
    <Button
      variant="outline"
      onClick={clearAllDraftFilters}
      disabled={getDraftActiveFilterCount === 0}
      className="w-full sm:w-auto"
    >
      {label}
    </Button>
  );
};

export default ClearAllFilterButton;
