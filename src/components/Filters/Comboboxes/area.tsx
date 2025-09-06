import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";
import AreaComboBox from "@/components/ComboBoxes/Area";

type Props = {
  testid?: string;
  withLabel?: boolean;
  className?: string;
};

const AreaCombobox = ({ withLabel = true, className }: Props) => {
  const { draftFilters, updateDraftFilter } = useFilterContext();

  return (
    <div className="space-y-2 ">
      {withLabel && <Label className="text-sm font-medium">Area</Label>}
      <div className="relative">
        <AreaComboBox
          className={className}
          value={draftFilters.area_id}
          onValueChange={(value) => {
            updateDraftFilter("area_id", value);
            updateDraftFilter("location_id", undefined);
            updateDraftFilter("sub_location_id", undefined);
          }}
          placeholder="Select area"
        />
      </div>
    </div>
  );
};

export default AreaCombobox;
