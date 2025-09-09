import { Label } from "@/components/ui/label";
import DatePicker from "../components/date.picker";
import { useFilterContext } from "../context";
import { Calendar } from "lucide-react";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useVillaFilterStore } from "@/lib/store/filterStore";

type Props = {
  testid?: string;
};

const DateRangePicker = ({}: Props) => {
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
    <div className="space-y-4">
      <Label className="text-sm font-semibold flex items-center">
        <Calendar className="mr-2 h-4 w-4" />
        Date Range
      </Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Check In Date */}
        <DatePicker
          label="Check In"
          dateValue={checkInDate}
          handleDateChange={handleDraftCheckInDateChange}
          handleClear={handleCheckInDateClear}
        />

        {/* Check Out Date */}
        <DatePicker
          label="Check Out"
          dateValue={checkOutDate}
          handleDateChange={handleDraftCheckOutDateChange}
          handleClear={handleCheckOutDateClear}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
