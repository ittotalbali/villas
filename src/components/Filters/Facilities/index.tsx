import { Label } from "@/components/ui/label";
import { Building, Loader2 } from "lucide-react";
import { useMemo } from "react";
import { useFilterContext } from "../context";
import FacilityCheckbox from "../Checkboxes/facility";

type Props = {
  testid?: string;
};

const Facilities = ({}: Props) => {
  const {
    draftFilters,
    facilities,
    facilitiesLoading,
    facilitiesError,
    toggleDraftFacility,
  } = useFilterContext();

  const FacilitiesCheckboxes = useMemo(() => {
    if (facilitiesLoading || facilitiesError || facilities.length === 0) {
      return null;
    }

    return facilities.map((facility) => (
      <FacilityCheckbox facility={facility} />
    ));
  }, [
    facilities,
    facilitiesLoading,
    facilitiesError,
    draftFilters.facilities,
    toggleDraftFacility,
  ]);

  return (
    <div className="space-y-4">
      <Label className="text-sm font-semibold flex items-center">
        <Building className="mr-2 h-4 w-4" />
        Facilities
        {facilitiesLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      </Label>

      {facilitiesLoading && (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span className="text-sm text-muted-foreground">
            Loading facilities...
          </span>
        </div>
      )}

      {facilitiesError && (
        <div className="p-4 text-center border border-destructive/20 rounded-lg bg-destructive/5">
          <p className="text-sm text-destructive">
            Failed to load facilities. Please try again.
          </p>
        </div>
      )}

      {!facilitiesLoading && !facilitiesError && facilities.length === 0 && (
        <div className="p-4 text-center border border-muted rounded-lg bg-muted/30">
          <p className="text-sm text-muted-foreground">
            No facilities available.
          </p>
        </div>
      )}

      {FacilitiesCheckboxes && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FacilitiesCheckboxes}
        </div>
      )}
    </div>
  );
};

export default Facilities;
