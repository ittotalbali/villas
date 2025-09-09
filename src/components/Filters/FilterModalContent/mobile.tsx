import { Separator } from "@/components/ui/separator";
import Facilities from "../Facilities";
import VillaTypeTabs from "../VillaTypeTabs";
import PriceRange from "../PriceRange";
import PropertyOptions from "../PropertyOptions";
import TypeOfAccomodationSelects from "../Selects/type.of.accomodation";
import BathroomSelects from "../Selects/bathroom";
import { useFilterContext } from "../context";
import SearchInput from "../Inputs/search";
import AreaCombobox from "../Comboboxes/area";
import LocationCombobox from "../Comboboxes/location";
import SubLocationCombobox from "../Comboboxes/sub-location";
import DateRangePicker from "../DateRangePicker";
import BedroomSelect from "../Selects/bedroom";

type Props = {
  testid?: string;
};

const FilterContentMobile = ({}: Props) => {
  const { scrollContainerRef } = useFilterContext();
  return (
    <div
      ref={scrollContainerRef}
      className="relative flex-1 overflow-y-auto px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="space-y-6">
        <SearchInput />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AreaCombobox />
          <LocationCombobox />
          <SubLocationCombobox />
        </div>

        {/* Basic Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Type of Accommodation */}
          <TypeOfAccomodationSelects />

          {/* Bathrooms */}
          <BathroomSelects />

          {/* Bedrooms */}
          <BedroomSelect withLabel />
        </div>

        {/* Property Type & Additional Options */}
        <PropertyOptions />

        {/* Price Range */}
        <PriceRange />

        <DateRangePicker />

        {/* Date Range with shadcn/ui Date Picker */}
        {/* <DateRangePicker /> */}

        {/* <Separator /> */}

        {/* Villa Type Tabs */}
        <VillaTypeTabs />

        <Separator />

        {/* Facilities */}
        <Facilities />
      </div>
    </div>
  );
};

export default FilterContentMobile;
