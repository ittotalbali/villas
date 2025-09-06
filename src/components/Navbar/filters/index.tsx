import ApplyFilterButton from "@/components/Filters/Buttons/apply.filter";
import AreaCombobox from "@/components/Filters/Comboboxes/area";
import LocationCombobox from "@/components/Filters/Comboboxes/location";
import SubLocationCombobox from "@/components/Filters/Comboboxes/sub-location";
import DatePicker from "@/components/Filters/components/date.picker";
import { useFilterContext } from "@/components/Filters/context";
import SearchInput from "@/components/Filters/Inputs/search";
import BedroomSelect from "@/components/Filters/Selects/bedroom";
import FilterModalContent from "@/components/Filters/filter.modal.content";

type Props = {
  testid?: string;
};

const Filters = ({}: Props) => {
  const {
    checkInDate,
    checkOutDate,
    handleDraftCheckInDateChange,
    handleDraftCheckOutDateChange,
  } = useFilterContext();

  return (
    <div className="flex flex-col gap-3 w-full justify-center  lg:w-full  lg:flex-row lg:flex-wrap">
      {/* Content 1 */}
      <div className="flex flex-col gap-3 w-full lg:w-3/4  ">
        <div className="flex flex-col gap-3 w-full lg:flex-row">
          <div className="w-full lg:w-full">
            <SearchInput withLabel={false} />
          </div>
          <div className="w-full lg:w-full">
            <AreaCombobox withLabel={false} />
          </div>
          <div className="w-full lg:w-full">
            <LocationCombobox withLabel={false} />
          </div>
          <div className="w-full lg:w-full">
            <SubLocationCombobox withLabel={false} />
          </div>
        </div>
      </div>
      {/* Content 2 */}
      <div className="flex flex-col gap-3 w-full lg:w-3/4 ">
        <div className="flex flex-col gap-3 w-full lg:flex-row ">
          <div className="w-full lg:w-full">
            <DatePicker
              dateValue={checkInDate}
              handleDateChange={handleDraftCheckInDateChange}
              withLabel={false}
              label="Check in"
              placeholder="Check in"
            />
          </div>
          <div className="w-full lg:w-full">
            <DatePicker
              dateValue={checkOutDate}
              handleDateChange={handleDraftCheckOutDateChange}
              withLabel={false}
              label="Check out"
              placeholder="Check out"
            />
          </div>
          <div className="w-full lg:w-full">
            <BedroomSelect placeholder="Bedrooms" />
          </div>
          <div className="w-full lg:w-full">
            <ApplyFilterButton className="sm:w-full" label="Search" />
          </div>
          <div className="w-full lg:w-full">
            <FilterModalContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
