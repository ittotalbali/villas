import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
};

const SeatedGuestsInput = ({}: Props) => {
  const { draftFilters, updateDraftVillaTypeFilter } = useFilterContext();
  return (
    <div className="space-y-2">
      <Label className="text-sm">Seated Guests</Label>
      <Input
        type="number"
        placeholder="Number of seated guests"
        className="border-gray-300"
        value={(draftFilters.wedding_villa as any)?.params?.seated_guests || ""}
        onChange={(e) =>
          updateDraftVillaTypeFilter(
            "wedding_villa",
            "seated_guests",
            e.target.value ? parseInt(e.target.value) : undefined
          )
        }
      />
    </div>
  );
};

export default SeatedGuestsInput;
