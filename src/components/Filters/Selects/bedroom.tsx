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
import { useCallback } from "react";
import { X } from "lucide-react";

type Props = {
  testid?: string;
  withLabel?: boolean;
  placeholder?: string;
};

const BedroomSelect = ({ withLabel, placeholder = "Select" }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, setFilters } = useVillaFilterStore();
  const { draftFilters, updateDraftFilter } = useFilterContext();

  const currentValue =
    draftFilters.bedroom?.toString() ??
    searchParams.get("bedroom") ??
    filters.bedroom?.toString() ??
    "";

  const handleClear = useCallback(() => {
    if (draftFilters.bedroom) {
      updateDraftFilter("bedroom", undefined);
    }

    if (searchParams.get("bedroom")) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);

        next.delete("bedroom");

        return next;
      });
    }

    if (filters.bedroom) {
      setFilters({
        ...filters,
        bedroom: undefined,
      });
    }
  }, [searchParams, filters, draftFilters]);

  return (
    <div className="space-y-2">
      {withLabel && <Label className="text-sm font-medium">Bedrooms</Label>}
      <div className="relative">
        <Select
          value={currentValue}
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
        {currentValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute -top-2 -right-2 bg-slate-800 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center shadow-md"
            aria-label="Clear bedroom selection"
          >
            <X className="h-3 w-3 text-white" />{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default BedroomSelect;
