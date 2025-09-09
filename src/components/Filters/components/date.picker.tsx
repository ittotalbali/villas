import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useState } from "react";

type Props = {
  testid?: string;
  label?: string;
  dateValue?: Date;
  withLabel?: boolean;
  placeholder?: string;
  handleClear: () => void;
  handleDateChange: (date: Date | undefined) => void;
};

const DatePicker = ({
  withLabel = true,
  placeholder = "Pick a date",
  label,
  dateValue,
  handleClear,
  handleDateChange,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      {withLabel && <Label className="text-sm">{label}</Label>}
      <div className="relative">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full min-w-[200px] min-h-[42px] py-2 px-3 border-gray-300 justify-start text-left font-normal",
                !dateValue && "text-muted-foreground"
              )}
              onClick={() => setOpen(!open)}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateValue ? (
                format(dateValue, "PPP")
              ) : (
                <span>{placeholder}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white" align="start">
            <CalendarComponent
              mode="single"
              selected={dateValue}
              onSelect={(date) => {
                handleDateChange(date);
                if (date) {
                  setOpen(false);
                }
              }}
              disabled={(date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {dateValue && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="absolute -top-2 -right-2 z-50 bg-slate-800 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center shadow-md"
            aria-label="Clear date selection"
          >
            <X className="h-3 w-3 text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
