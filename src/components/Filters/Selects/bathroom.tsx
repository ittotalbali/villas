import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bath } from "lucide-react";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
};

const BathroomSelects = ({}: Props) => {
  const { draftFilters, updateDraftFilter } = useFilterContext();

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Bathrooms</Label>
      <Select
        value={draftFilters.bathroom?.toString() || ""}
        onValueChange={(value) =>
          updateDraftFilter("bathroom", value ? parseInt(value) : undefined)
        }
      >
        <SelectTrigger className="border-gray-300">
          <Bath className="mr-2 h-4 w-4" />
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
