import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";
import LocationComboBox from "@/components/ComboBoxes/Location";

type Props = {
  testid?: string;
  withLabel?: boolean;
  className?: string;
};

const LocationCombobox = ({ withLabel = true, className }: Props) => {
  const { draftFilters, updateDraftFilter } = useFilterContext();

  return (
    <div className="space-y-2">
      {withLabel && <Label className="text-sm font-medium">Location</Label>}
      <div className="relative ">
        <LocationComboBox
          className={className}
          value={draftFilters.location_id}
          onValueChange={(id, coordinates) => {
            updateDraftFilter("location_id", id);
            updateDraftFilter("sub_location_id", undefined);
            if (coordinates) {
              updateDraftFilter("lat", coordinates.lat);
              updateDraftFilter("lng", coordinates.lng);
            }
          }}
          placeholder="Select location"
          disabled={!draftFilters.area_id}
          baseParams={{ area_id: draftFilters.area_id?.toString() }}
        />
      </div>
    </div>
  );
};

export default LocationCombobox;
