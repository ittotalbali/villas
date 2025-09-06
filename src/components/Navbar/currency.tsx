import { useVillaFilterStore } from "@/lib/store/filterStore";
import CurrencyComboBox from "../ComboBoxes/Currency";

type Props = {
  testid?: string;
};

const Currency = ({}: Props) => {
  const { filters, setFilters } = useVillaFilterStore();
  return (
    <div className="flex items-center space-x-4   justify-end">
      <div className="flex items-center space-x-2 bg-white  border-gray-300 px-3 py-2">
        <span className="hidden lg:inline font-bold">Currency</span>
        <CurrencyComboBox
          value={filters.curs_exchanges_id}
          onValueChange={(value) =>
            setFilters({ ...filters, curs_exchanges_id: value })
          }
          placeholder="Select currency"
          className="w-24"
        />
      </div>
    </div>
  );
};

export default Currency;
