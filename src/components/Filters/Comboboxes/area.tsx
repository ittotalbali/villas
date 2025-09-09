import { Label } from "@/components/ui/label";
import { useFilterContext } from "../context";
import AreaComboBox from "@/components/ComboBoxes/Area";
import { useVillaFilterStore } from "@/lib/store/filterStore";
import { useSearchParams } from "react-router-dom";

type Props = {
  testid?: string;
  withLabel?: boolean;
  className?: string;
};

const AreaCombobox = ({ withLabel = true, className }: Props) => {
  const { draftFilters, updateDraftFilter } = useFilterContext();
  const { filters, setFilters } = useVillaFilterStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentValue: number | undefined =
    (draftFilters.area_id ? draftFilters.area_id : undefined) ??
    (searchParams.get("area_id")
      ? parseInt(searchParams.get("area_id")!, 10)
      : undefined) ??
    filters.area_id ??
    undefined;

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (draftFilters.area_id) {
      updateDraftFilter("lat", undefined);
      updateDraftFilter("lng", undefined);
      updateDraftFilter("zoom", undefined);
      updateDraftFilter("area_id", undefined);
      updateDraftFilter("location_id", undefined);
      updateDraftFilter("sub_location_id", undefined);
    }

    if (filters.area_id) {
      setFilters({
        ...filters,
        lat: undefined,
        lng: undefined,
        zoom: undefined,
        area_id: undefined,
        location_id: undefined,
        sub_location_id: undefined,
      });
    }

    if (searchParams.get("area_id")) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);

        next.delete("lat");
        next.delete("lng");
        next.delete("zoom");
        next.delete("area_id");
        next.delete("location_id");
        next.delete("sub_location_id");

        return next;
      });
    }
  };

  return (
    <div className="space-y-2 ">
      {withLabel && <Label className="text-sm font-medium">Area</Label>}
      <div className="relative">
        <AreaComboBox
          className={className}
          value={currentValue}
          onValueChange={(value) => {
            updateDraftFilter("area_id", value);
            updateDraftFilter("location_id", undefined);
            updateDraftFilter("sub_location_id", undefined);
          }}
          handleClear={handleClear}
          placeholder="Select area"
        />
      </div>
    </div>
  );
};

export default AreaCombobox;
