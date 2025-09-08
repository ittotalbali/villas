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
  const isChecked = Boolean(
    (draftFilters.mountain_villa as any)?.params?.[checkKey]
  );

  return (
    <div key={checkKey} className="flex items-center space-x-2">
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
