import SubLocationComboBox from "@/components/ComboBoxes/SubLocation";
import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
  withLabel?: boolean;
  className?: string;
};

const SubLocationCombobox = ({ withLabel = true, className }: Props) => {
  const { draftFilters, updateDraftFilter } = useFilterContext();

  return (
    <div className="space-y-2">
      {withLabel && <Label className="text-sm font-medium">Sub Location</Label>}
      <div className="relative">
        <SubLocationComboBox
          className={className}
          value={draftFilters.sub_location_id}
          onValueChange={(value) => updateDraftFilter("sub_location_id", value)}
          placeholder="Select sub-location"
          disabled={!draftFilters.location_id}
          baseParams={{ location_id: draftFilters.location_id }}
        />
      </div>
    </div>
  );
};

export default SubLocationCombobox;
