import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
};

const MinimumPriceInput = ({}: Props) => {
  const { draftFilters, updateDraftFilter } = useFilterContext();
  return (
    <div className="space-y-2">
      <Label htmlFor="price_min" className="text-sm">
        Minimum Price
      </Label>
      <Input
        id="price_min"
        className="min-w-[200px] w-full min-h-[42px] border border-gray-300"
        type="number"
        placeholder="Min price"
        value={draftFilters.price_min || ""}
        onChange={(e) =>
          updateDraftFilter(
            "price_min",
            e.target.value ? parseInt(e.target.value) : undefined
          )
        }
      />
    </div>
  );
};

export default MinimumPriceInput;
