import { Button } from "@/components/ui/button";
import { useFilterContext } from "../context";
import { cn } from "@/lib/utils";

type Props = {
  testid?: string;
  label: string;
  className?: string;
};

const CancelButton = ({ label, className }: Props) => {
  const { handleCancel } = useFilterContext();
  return (
    <Button
      variant="ghost"
      onClick={handleCancel}
      className={cn(
        "w-full sm:w-auto border min-h-[42px] border-gray-300",
        className
      )}
    >
      {label}
    </Button>
  );
};

export default CancelButton;
