import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
  key: string;
  label: string;
};

const WeddingCheckbox = ({ key, label }: Props) => {
  const { draftFilters, updateDraftVillaTypeFilter } = useFilterContext();
  return (
    <div key={key} className="flex items-center space-x-2">
      <Checkbox
        id={`wedding_${key}`}
        checked={!!(draftFilters.wedding_villa as any)?.params?.[key]}
        onCheckedChange={(checked) =>
          updateDraftVillaTypeFilter("wedding_villa", key, checked)
        }
      />
      <Label htmlFor={`wedding_${key}`} className="text-sm">
        {label}
      </Label>
    </div>
  );
};

export default WeddingCheckbox;
