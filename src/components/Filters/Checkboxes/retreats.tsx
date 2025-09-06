import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
  key: string;
  label: string;
};

const RetreatsCheckbox = ({ key, label }: Props) => {
  const { draftFilters, updateDraftVillaTypeFilter } = useFilterContext();

  return (
    <div key={key} className="flex items-center space-x-2">
      <Checkbox
        id={`retreats_${key}`}
        checked={
          (draftFilters.retreats_villa as any)?.params?.includes(key) || false
        }
        onCheckedChange={(checked) =>
          updateDraftVillaTypeFilter("retreats_villa", key, checked)
        }
      />
      <Label htmlFor={`retreats_${key}`} className="text-sm">
        {label}
      </Label>
    </div>
  );
};

export default RetreatsCheckbox;
