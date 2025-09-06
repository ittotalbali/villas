import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";
import MinimumPriceInput from "../Inputs/minimum.price";
import MaximumPriceInput from "../Inputs/maximum.price";

type Props = {
  testid?: string;
};

const PriceRange = ({}: Props) => {
  return (
    <div className="space-y-4">
      <Label className="text-sm font-semibold flex items-center">
        <DollarSign className="mr-2 h-4 w-4" />
        Price Range (USD)
      </Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MinimumPriceInput />
        <MaximumPriceInput />
      </div>
    </div>
  );
};

export default PriceRange;
