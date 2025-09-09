import SubLocationComboBox from "@/components/ComboBoxes/SubLocation";
import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";
import { useVillaFilterStore } from "@/lib/store/filterStore";
import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

type Props = {
  testid?: string;
  withLabel?: boolean;
  className?: string;
};

const SubLocationCombobox = ({ withLabel = true, className }: Props) => {
  const { draftFilters, updateDraftFilter } = useFilterContext();
  const { filters, setFilters } = useVillaFilterStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentValue: number | undefined =
    (draftFilters.sub_location_id ? draftFilters.sub_location_id : undefined) ??
    (searchParams.get("sub_location_id")
      ? parseInt(searchParams.get("sub_location_id")!, 10)
      : undefined) ??
    filters.sub_location_id ??
    undefined;

  const currentLocationIDValue: number | undefined =
    (draftFilters.location_id ? draftFilters.location_id : undefined) ??
    (searchParams.get("location_id")
      ? parseInt(searchParams.get("location_id")!, 10)
      : undefined) ??
    filters.location_id ??
    undefined;

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      if (draftFilters.sub_location_id) {
        updateDraftFilter("sub_location_id", undefined);
      }

      if (filters.sub_location_id) {
        setFilters({
          ...filters,
          sub_location_id: undefined,
        });
      }

      if (searchParams.get("sub_location_id")) {
        setSearchParams((prev) => {
          const next = new URLSearchParams(prev);

          next.delete("sub_location_id");

          return next;
        });
      }
    },
    [draftFilters, searchParams, filters]
  );

  return (
    <div className="space-y-2">
      {withLabel && <Label className="text-sm font-medium">Sub Location</Label>}
      <div className="relative">
        <SubLocationComboBox
          className={className}
          value={currentValue}
          onValueChange={(value) => updateDraftFilter("sub_location_id", value)}
          handleClear={handleClear}
          placeholder="Select sub-location"
          disabled={!currentLocationIDValue}
          baseParams={{ location_id: currentLocationIDValue }}
        />
      </div>
    </div>
  );
};

export default SubLocationCombobox;
