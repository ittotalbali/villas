// Checkboxes/wedding.tsx
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
  checkKey: string;
  label: string;
};

const WeddingCheckbox = ({ checkKey, label }: Props) => {
  const { draftFilters, updateDraftVillaTypeFilter } = useFilterContext();

  const weddingVilla = draftFilters.wedding_villa as any;
  let isChecked = false;

  // Wedding specifically uses object format
  if (weddingVilla?.params) {
    if (Array.isArray(weddingVilla.params)) {
      // Handle case where it might be array (backward compatibility)
      isChecked = weddingVilla.params.includes(checkKey);
    } else {
      // Object format: { key: true }
      isChecked = Boolean(weddingVilla.params[checkKey]);
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`wedding_${checkKey}`}
        checked={isChecked}
        onCheckedChange={(checked) =>
          updateDraftVillaTypeFilter("wedding_villa", checkKey, checked)
        }
      />
      <Label htmlFor={`wedding_${checkKey}`} className="text-sm">
        {label}
      </Label>
    </div>
  );
};

export default WeddingCheckbox;
