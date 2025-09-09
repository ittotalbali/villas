import ApplyFilterButton from "@/components/Filters/Buttons/apply.filter";
import AreaCombobox from "@/components/Filters/Comboboxes/area";
import LocationCombobox from "@/components/Filters/Comboboxes/location";
import SubLocationCombobox from "@/components/Filters/Comboboxes/sub-location";
import DatePicker from "@/components/Filters/components/date.picker";
import { useFilterContext } from "@/components/Filters/context";
import SearchInput from "@/components/Filters/Inputs/search";
import BedroomSelect from "@/components/Filters/Selects/bedroom";
import FilterModalDesktop from "@/components/Filters/Modals/desktop";
import { useCallback } from "react";
import { useVillaFilterStore } from "@/lib/store/filterStore";
import { useSearchParams } from "react-router-dom";

type Props = {
  testid?: string;
};

const DesktopFilters = ({}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    checkInDate,
    checkOutDate,
    handleDraftCheckInDateChange,
    handleDraftCheckOutDateChange,
    draftFilters,
    updateDraftFilter,
  } = useFilterContext();

  const { filters, setFilters } = useVillaFilterStore();

  const handleCheckInDateClear = useCallback(() => {
    console.log("clicked");
    if (draftFilters.start_date) {
      updateDraftFilter("start_date", undefined);
    }

    if (searchParams.get("start_date")) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);

        next.delete("start_date");

        return next;
      });
    }

    if (filters.start_date) {
      setFilters({
        ...filters,
        start_date: undefined,
      });
    }

    if (checkInDate) {
      handleDraftCheckInDateChange(undefined);
    }
  }, [draftFilters, searchParams, filters, checkInDate]);

  const handleCheckOutDateClear = useCallback(() => {
    if (draftFilters.end_date) {
      updateDraftFilter("end_date", undefined);
    }

    if (searchParams.get("end_date")) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);

        next.delete("end_date");

        return next;
      });
    }

    if (filters.end_date) {
      setFilters({
        ...filters,
        end_date: undefined,
      });
    }

    if (checkOutDate) {
      handleDraftCheckOutDateChange(undefined);
    }
  }, [draftFilters, searchParams, filters, checkOutDate]);

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
              handleClear={handleCheckInDateClear}
            />
          </div>
          <div className="w-full lg:w-full">
            <DatePicker
              dateValue={checkOutDate}
              handleDateChange={handleDraftCheckOutDateChange}
              withLabel={false}
              label="Check out"
              placeholder="Check out"
              handleClear={handleCheckOutDateClear}
            />
          </div>
          <div className="w-full lg:w-full">
            <BedroomSelect placeholder="Bedrooms" />
          </div>
          <div className="w-full lg:w-full">
            <ApplyFilterButton
              className="sm:w-full bg-[#75c5f0] text-white font-semibold"
              label="Search"
            />
          </div>
          <div className="w-full lg:w-full">
            <FilterModalDesktop />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopFilters;
