import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
  checkKey: string;
  label: string;
};

const FamiliyCheckbox = ({ checkKey, label }: Props) => {
  const { draftFilters, updateDraftVillaTypeFilter } = useFilterContext();
  const isChecked = Boolean(
    (draftFilters.family_villa as any)?.params?.[checkKey]
  );

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

export default FamiliyCheckbox;
