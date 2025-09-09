import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Home, X } from "lucide-react";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
};

const TypeOfAccomodationSelects = ({}: Props) => {
  const { draftFilters, updateDraftFilter } = useFilterContext();

  const hasValue = Boolean(draftFilters.type_accommodation);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Type of Accommodation</Label>
      <Select
        value={draftFilters.type_accommodation || ""}
        onValueChange={(value) =>
          updateDraftFilter("type_accommodation", value || undefined)
        }
      >
        <SelectTrigger className="border-gray-300 flex items-center gap-2">
          <Home className="h-4 w-4 shrink-0" />
          <div className="flex-1 text-left">
            <SelectValue placeholder="Select Type" />
          </div>

          {/* Always reserve space for X button to keep consistent width */}
          <div className="w-5 h-5 shrink-0 flex items-center justify-center">
            {hasValue && (
              <span
                onClick={(e) => {
                  e.stopPropagation(); // Prevent select from opening
                  updateDraftFilter("type_accommodation", undefined);
                }}
                className="text-muted-foreground hover:text-black cursor-pointer p-0.5 rounded"
                title="Clear accommodation type"
              >
                <X className="w-4 h-4" />
              </span>
            )}
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto z-50 bg-white">
          <SelectItem value="villa">Villa</SelectItem>
          <SelectItem value="hotel">Hotel</SelectItem>
          <SelectItem value="guesthouse">Guesthouse</SelectItem>
          <SelectItem value="apartment">Apartment</SelectItem>
          <SelectItem value="house">House</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TypeOfAccomodationSelects;
