import type { VillaQueryParams } from "@/lib/store/filterStore";
import { Checkbox } from "../../ui/checkbox";
import { useFilterContext } from "../context";
import { Label } from "../../ui/label";

type Props = {
  testid?: string;
  key: string;
  label: string;
};

const PropertyTypeCheckbox = ({ key, label }: Props) => {
  const { draftFilters, updateDraftFilter } = useFilterContext();

  return (
    <div key={key} className="flex items-center space-x-2">
      <Checkbox
        id={key}
        checked={
          draftFilters[key as keyof VillaQueryParams] ===
          (key === "close_clubs" ? true : "yes")
        }
        onCheckedChange={(checked) => {
          if (key === "close_clubs") {
            updateDraftFilter(
              key as keyof VillaQueryParams,
              checked || undefined
            );
          } else {
            updateDraftFilter(
              key as keyof VillaQueryParams,
              checked ? "yes" : undefined
            );
          }
        }}
      />
      <Label htmlFor={key} className="text-sm">
        {label}
      </Label>
    </div>
  );
};

export default PropertyTypeCheckbox;
