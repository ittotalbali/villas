import { Home } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import FilterButton from "../Buttons/filter";
import { useFilterContext } from "../context";
import FilterContent from "../FilterModalContent/mobile";
import ActionButton from "../action.button";

type Props = {
  testid?: string;
};

const FilterModalMobile = ({}: Props) => {
  const { open, setOpen } = useFilterContext();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FilterButton />
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
