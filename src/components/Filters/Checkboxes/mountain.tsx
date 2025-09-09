// Checkboxes/mountain.tsx
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
  checkKey: string;
  label: string;
};

const MountainCheckbox = ({ checkKey, label }: Props) => {
  const { draftFilters, updateDraftVillaTypeFilter } = useFilterContext();

  const mountainVilla = draftFilters.mountain_villa as any;
  let isChecked = false;

  if (mountainVilla?.params) {
    if (Array.isArray(mountainVilla.params)) {
      isChecked = mountainVilla.params.includes(checkKey);
    } else {
      isChecked = Boolean(mountainVilla.params[checkKey]);
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`mountain_${checkKey}`}
        checked={isChecked}
        onCheckedChange={(checked) =>
          updateDraftVillaTypeFilter("mountain_villa", checkKey, checked)
        }
      />
      <Label htmlFor={`mountain_${checkKey}`} className="text-sm">
        {label}
      </Label>
    </div>
  );
};

export default MountainCheckbox;
