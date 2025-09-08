import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
};

const TypeOfAccomodationSelects = ({}: Props) => {
  const { draftFilters, updateDraftFilter } = useFilterContext();

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Type of Accommodation</Label>
      <Select
        value={draftFilters.type_accommodation || ""}
        onValueChange={(value) =>
          updateDraftFilter("type_accommodation", value || undefined)
        }
      >
        <SelectTrigger className="border-gray-300">
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
