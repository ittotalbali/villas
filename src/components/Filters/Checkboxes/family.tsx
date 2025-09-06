import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
  key: string;
  label: string;
};

const FamiliyCheckbox = ({ key, label }: Props) => {
  const { draftFilters, updateDraftVillaTypeFilter } = useFilterContext();
  return (
    <div key={key} className="flex items-center space-x-2">
      <Checkbox
        id={`family_${key}`}
        checked={
          (draftFilters.family_villa as any)?.params?.includes(key) || false
        }
        onCheckedChange={(checked) =>
          updateDraftVillaTypeFilter("family_villa", key, checked)
        }
      />
      <Label htmlFor={`family_${key}`} className="text-sm">
        {label}
      </Label>
    </div>
  );
};

export default FamiliyCheckbox;
