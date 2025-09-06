import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
};

const StandingGuestInput = ({}: Props) => {
  const { draftFilters, updateDraftVillaTypeFilter } = useFilterContext();

  return (
    <div className="space-y-2">
      <Label className="text-sm">Standing Guests</Label>
      <Input
        type="number"
        placeholder="Number of standing guests"
        value={
          (draftFilters.wedding_villa as any)?.params?.standing_guests || ""
        }
        onChange={(e) =>
          updateDraftVillaTypeFilter(
            "wedding_villa",
            "standing_guests",
            e.target.value ? parseInt(e.target.value) : undefined
          )
        }
      />
    </div>
  );
};

export default StandingGuestInput;
