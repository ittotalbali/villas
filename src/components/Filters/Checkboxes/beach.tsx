// Checkboxes/beach.tsx
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
  checkKey: string;
  label: string;
};

const BeachCheckbox = ({ checkKey, label }: Props) => {
  const { draftFilters, updateDraftVillaTypeFilter } = useFilterContext();

  const beachVilla = draftFilters.beach_villa as any;
  let isChecked = false;

  if (beachVilla?.params) {
    if (Array.isArray(beachVilla.params)) {
      isChecked = beachVilla.params.includes(checkKey);
    } else {
      isChecked = Boolean(beachVilla.params[checkKey]);
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`beach_${checkKey}`}
        checked={isChecked}
        onCheckedChange={(checked) =>
          updateDraftVillaTypeFilter("beach_villa", checkKey, checked)
        }
      />
      <Label htmlFor={`beach_${checkKey}`} className="text-sm">
        {label}
      </Label>
    </div>
  );
};

export default BeachCheckbox;
