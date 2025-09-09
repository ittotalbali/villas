import { Home, SlidersHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { useFilterContext } from "../context";
import FilterContent from "../FilterModalContent/mobile";
import ActionButton from "../action.button";
import { useVillaFilterStore } from "@/lib/store/filterStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  testid?: string;
  triggerButtonLabel?: string;
};

const FilterModalMobile = ({ triggerButtonLabel = "" }: Props) => {
  const { open, setOpen } = useFilterContext();
  const { getActiveFilterCount } = useVillaFilterStore();
  const count = getActiveFilterCount();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative rounded-md flex items-center justify-center p-0 border border-gray-300 min-h-[42px] "
        >
          <SlidersHorizontal className="h-6 w-6" />
          {triggerButtonLabel}
          {count > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {count}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-[95vw] max-w-5xl h-[95vh] max-h-[95vh] z-[1000] flex flex-col p-0 bg-white border-gray-300"
        style={{ zIndex: 50 }}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-4 border-b border-b-gray-300">
          <DialogTitle className="flex items-center text-lg sm:text-xl">
            <Home className="mr-2 h-5 w-5" />
            Filter Villas
          </DialogTitle>
        </DialogHeader>
        {/* Filter Contet */}
        <FilterContent />

        {/* Action Button */}
        <ActionButton />
      </DialogContent>
    </Dialog>
  );
};

export default FilterModalMobile;
