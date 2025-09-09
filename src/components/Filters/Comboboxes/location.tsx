import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";
import LocationComboBox from "@/components/ComboBoxes/Location";
import { useVillaFilterStore } from "@/lib/store/filterStore";
import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

type Props = {
  testid?: string;
  withLabel?: boolean;
  className?: string;
};

const LocationCombobox = ({ withLabel = true, className }: Props) => {
  const { draftFilters, updateDraftFilter } = useFilterContext();
  const { filters, setFilters } = useVillaFilterStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentValue: number | undefined =
    (draftFilters.location_id ? draftFilters.location_id : undefined) ??
    (searchParams.get("location_id")
      ? parseInt(searchParams.get("location_id")!, 10)
      : undefined) ??
    filters.location_id ??
    undefined;

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();

    if (draftFilters.location_id) {
      updateDraftFilter("lat", undefined);
      updateDraftFilter("lng", undefined);
      updateDraftFilter("zoom", undefined);
      updateDraftFilter("location_id", undefined);
      updateDraftFilter("sub_location_id", undefined);
    }

    if (filters.location_id) {
      setFilters({
        ...filters,
        lat: undefined,
        lng: undefined,
        zoom: undefined,
        location_id: undefined,
        sub_location_id: undefined,
      });
    }

    if (searchParams.get("location_id")) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);

        next.delete("lat");
        next.delete("lng");
        next.delete("zoom");
        next.delete("location_id");
        next.delete("sub_location_id");

        return next;
      });
    }
  }, [draftFilters, filters, searchParams]);

  return (
    <div className="space-y-2">
      {withLabel && <Label className="text-sm font-medium">Location</Label>}
      <div className="relative ">
        <LocationComboBox
          className={className}
          value={currentValue}
          handleClear={handleClear}
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
