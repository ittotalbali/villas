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

const TypeOfAccomodationSelects = ({}: Props) => {
  const [searchParams] = useSearchParams();
  const { filters } = useVillaFilterStore();
  const { draftFilters, updateDraftFilter } = useFilterContext();

  const currentValue =
    draftFilters.type_accommodation?.toString() ??
    searchParams.get("type_accommodation") ??
    filters.type_accommodation?.toString() ??
    "";

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Type of Accommodation</Label>
      <Select
        value={currentValue}
        onValueChange={(value) =>
          updateDraftFilter("type_accommodation", value || undefined)
        }
      >
        <SelectTrigger className="min-w-[200px] w-full min-h-[42px] border-gray-300">
          <SelectValue placeholder="Select Type" />
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
