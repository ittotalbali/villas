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
  const isChecked = Boolean(
    (draftFilters.wedding_villa as any)?.params?.[checkKey]
  );

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
