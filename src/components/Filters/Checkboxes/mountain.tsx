import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
  key: string;
  label: string;
};

const MountainCheckbox = ({ key, label }: Props) => {
  const { draftFilters, updateDraftVillaTypeFilter } = useFilterContext();
  return (
    <div key={key} className="flex items-center space-x-2">
      <Checkbox
        id={`mountain_${key}`}
        checked={
          (draftFilters.mountain_villa as any)?.params?.includes(key) || false
        }
        onCheckedChange={(checked) =>
          updateDraftVillaTypeFilter("mountain_villa", key, checked)
        }
      />
      <Label htmlFor={`mountain_${key}`} className="text-sm">
        {label}
      </Label>
    </div>
  );
};

export default MountainCheckbox;
