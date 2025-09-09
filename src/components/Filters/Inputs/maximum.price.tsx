import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
};

const MaximumPriceInput = ({}: Props) => {
  const { draftFilters, updateDraftFilter } = useFilterContext();
  return (
    <div className="space-y-2">
      <Label htmlFor="price_max" className="text-sm">
        Maximum Price
      </Label>
      <Input
        id="price_max"
        type="number"
        className="min-w-[200px] w-full min-h-[42px] border border-gray-300"
        placeholder="Max price"
        value={draftFilters.price_max || ""}
        onChange={(e) =>
          updateDraftFilter(
            "price_max",
            e.target.value ? parseInt(e.target.value) : undefined
          )
        }
      />
    </div>
  );
};

export default MaximumPriceInput;
