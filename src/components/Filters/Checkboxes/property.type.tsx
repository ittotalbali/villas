import type { VillaQueryParams } from "@/lib/store/filterStore";
import { Checkbox } from "../../ui/checkbox";
import { useFilterContext } from "../context";
import { Label } from "../../ui/label";

type Props = {
  testid?: string;
  checkKey: string;
  label: string;
};

const PropertyTypeCheckbox = ({ checkKey, label }: Props) => {
  const { draftFilters, updateDraftFilter } = useFilterContext();

  return (
    <div key={checkKey} className="flex items-center space-x-2">
      <Checkbox
        id={checkKey}
        checked={
          draftFilters[checkKey as keyof VillaQueryParams] ===
          (checkKey === "close_clubs" ? true : "yes")
        }
        onCheckedChange={(checked) => {
          if (checkKey === "close_clubs") {
            updateDraftFilter(
              checkKey as keyof VillaQueryParams,
              checked || undefined
            );
          } else {
            updateDraftFilter(
              checkKey as keyof VillaQueryParams,
              checked ? "yes" : undefined
            );
          }
        }}
      />
      <Label htmlFor={checkKey} className="text-sm">
        {label}
      </Label>
    </div>
  );
};

export default PropertyTypeCheckbox;
