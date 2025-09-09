// Checkboxes/retreats.tsx
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
  checkKey: string;
  label: string;
};

const RetreatsCheckbox = ({ checkKey, label }: Props) => {
  const { draftFilters, updateDraftVillaTypeFilter } = useFilterContext();

  const retreatsVilla = draftFilters.retreats_villa as any;
  let isChecked = false;

  // Handle both array and object formats
  if (retreatsVilla?.params) {
    if (Array.isArray(retreatsVilla.params)) {
      // Array format: ["key1", "key2"]
      isChecked = retreatsVilla.params.includes(checkKey);
    } else {
      // Object format: { key1: true, key2: true }
      isChecked = Boolean(retreatsVilla.params[checkKey]);
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`retreats_${checkKey}`}
        checked={isChecked}
        onCheckedChange={(checked) =>
          updateDraftVillaTypeFilter("retreats_villa", checkKey, checked)
        }
      />
      <Label htmlFor={`retreats_${checkKey}`} className="text-sm">
        {label}
      </Label>
    </div>
  );
};

export default RetreatsCheckbox;
