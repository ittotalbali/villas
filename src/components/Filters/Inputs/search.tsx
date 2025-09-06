import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
  withLabel?: boolean;
};

const SearchInput = ({ withLabel = true }: Props) => {
  const { draftFilters, updateDraftFilter } = useFilterContext();

  return (
    <div className="space-y-2">
      {withLabel && <Label className="text-sm font-medium">Search</Label>}
      <Input
        placeholder="Search villas..."
        className="min-w-[200px] min-h-[41.5px] shadow border-gray-300 py-2"
        value={draftFilters.search_param || ""}
        onChange={(e) =>
          updateDraftFilter("search_param", e.target.value || undefined)
        }
      />
    </div>
  );
};

export default SearchInput;
