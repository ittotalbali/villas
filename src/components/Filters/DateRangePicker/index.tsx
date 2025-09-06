import { Label } from "@/components/ui/label";
import DatePicker from "../components/date.picker";
import { useFilterContext } from "../context";
import { Calendar } from "lucide-react";

type Props = {
  testid?: string;
};

const DateRangePicker = ({}: Props) => {
  const {
    checkInDate,
    checkOutDate,
    handleDraftCheckInDateChange,
    handleDraftCheckOutDateChange,
  } = useFilterContext();
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
        />

        {/* Check Out Date */}
        <DatePicker
          label="Check Out"
          dateValue={checkOutDate}
          handleDateChange={handleDraftCheckOutDateChange}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
