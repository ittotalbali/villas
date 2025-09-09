// Checkboxes/family.tsx
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
  checkKey: string;
  label: string;
};

const FamilyCheckbox = ({ checkKey, label }: Props) => {
  const { draftFilters, updateDraftVillaTypeFilter } = useFilterContext();

  const familyVilla = draftFilters.family_villa as any;
  let isChecked = false;

  if (familyVilla?.params) {
    if (Array.isArray(familyVilla.params)) {
      isChecked = familyVilla.params.includes(checkKey);
    } else {
      isChecked = Boolean(familyVilla.params[checkKey]);
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`family_${checkKey}`}
        checked={isChecked}
        onCheckedChange={(checked) =>
          updateDraftVillaTypeFilter("family_villa", checkKey, checked)
        }
      />
      <Label htmlFor={`family_${checkKey}`} className="text-sm">
        {label}
      </Label>
    </div>
  );
};

export default FamilyCheckbox;
