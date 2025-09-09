import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterContext } from "../context";
import { useSearchParams } from "react-router-dom";
import { useVillaFilterStore } from "@/lib/store/filterStore";

type Props = {
  testid?: string;
};

const BathroomSelects = ({}: Props) => {
  const [searchParams] = useSearchParams();
  const { filters } = useVillaFilterStore();
  const { draftFilters, updateDraftFilter } = useFilterContext();

  const currentValue =
    draftFilters.bathroom?.toString() ??
    searchParams.get("bathroom") ??
    filters.bathroom?.toString() ??
    "";

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Bathrooms</Label>
      <Select
        value={currentValue}
        onValueChange={(value) =>
          updateDraftFilter("bathroom", value ? parseInt(value) : undefined)
        }
      >
        <SelectTrigger className="min-w-[200px] w-full min-h-[42px] border-gray-300">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto z-50 bg-white">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <SelectItem key={num} value={num.toString()}>
              {num} Bathroom{num > 1 ? "s" : ""}
            </SelectItem>
          ))}
          <SelectItem value="8">7+ Bathrooms</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BathroomSelects;
