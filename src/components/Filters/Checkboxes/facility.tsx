// Checkboxes/facility.tsx
import type { Facility } from "@/lib/api/hooks/facilities";
import { useFilterContext } from "../context";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Props = {
  testid?: string;
  facility: Facility;
};

const FacilityCheckbox = ({ facility }: Props) => {
  const { draftFilters, toggleDraftFacility } = useFilterContext();

  return (
    <div key={facility.id} className="flex items-center space-x-2">
      <Checkbox
        id={`facility_${facility.id}`}
        checked={
          draftFilters.facilities?.includes(facility.name) || false // Use name instead of ID
        }
        onCheckedChange={() => toggleDraftFacility(facility.name)} // Pass both ID and name
      />
      <Label
        htmlFor={`facility_${facility.id}`}
        className="text-sm leading-tight cursor-pointer"
      >
        {facility.name}
      </Label>
    </div>
  );
};

export default FacilityCheckbox;
