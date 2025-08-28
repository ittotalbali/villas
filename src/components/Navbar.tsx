import VillaFilterModal from "./Filter";
import CurrencyComboBox from "@/components/ComboBoxes/Currency";
import { useVillaFilterStore } from "@/lib/store/filterStore";

const Navbar = () => {
  const { filters, setFilters } = useVillaFilterStore();

  return (
    <nav className="w-full z-[10] bg-white border-b border-gray-200 py-3 px-5 lg:px-6 flex items-center justify-between">
      <div className="flex items-center">
        <a href="https://totalbali.com">
          <img
            src="https://www.totalbali.com/images/logoTb.PNG"
            alt="Logo"
            className="h-11 mr-5"
          />
        </a>

        <VillaFilterModal />
      </div>
      <div className="flex items-center space-x-4">
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
    </nav>
  );
};

export default Navbar;
