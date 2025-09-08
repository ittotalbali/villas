import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterContext } from "../context";
import { useVillaFilterStore } from "@/lib/store/filterStore";
import { useSearchParams } from "react-router-dom";

type Props = {
  testid?: string;
  withLabel?: boolean;
  placeholder?: string;
};

const BedroomSelect = ({ withLabel, placeholder = "Select" }: Props) => {
  const [searchParams] = useSearchParams();
  const { filters } = useVillaFilterStore();
  const { draftFilters, updateDraftFilter } = useFilterContext();

  return (
    <div className="space-y-2">
      {withLabel && <Label className="text-sm font-medium">Bedrooms</Label>}
      <Select
        value={
          searchParams.get("bedroom") ??
          filters.bedroom?.toString() ??
          draftFilters.bedroom?.toString() ??
          ""
        }
        onValueChange={(value) =>
          updateDraftFilter("bedroom", value ? parseInt(value) : undefined)
        }
      >
        <SelectTrigger className="min-w-[200px] w-full min-h-[42px] border-gray-300">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto z-50 bg-white">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <SelectItem key={num} value={num.toString()}>
              {num} Bedroom{num > 1 ? "s" : ""}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default BedroomSelect;
