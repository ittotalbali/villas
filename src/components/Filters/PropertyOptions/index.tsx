import { Label } from "@/components/ui/label";
import { useMemo } from "react";
import { useFilterContext } from "../context";
import PropertyTypeCheckbox from "../Checkboxes/property.type";

type Props = {
  testid?: string;
};

const PropertyOptions = ({}: Props) => {
  const { draftFilters, updateDraftFilter } = useFilterContext();

  const PropertyTypeCheckboxes = useMemo(() => {
    return [
      { key: "freehold", label: "Freehold" },
      { key: "leasehold", label: "Leasehold" },
      { key: "monthly_rental", label: "Monthly Rental" },
      { key: "yearly_rental", label: "Yearly Rental" },
      { key: "close_clubs", label: "Close to Clubs" },
    ].map(({ key, label }) => (
      <PropertyTypeCheckbox key={key} label={label} checkKey={key} />
    ));
  }, [draftFilters, updateDraftFilter]);

  return (
    <div className="space-y-4">
      <Label className="text-sm font-semibold">Property Type & Options</Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PropertyTypeCheckboxes}
      </div>
    </div>
  );
};

export default PropertyOptions;
