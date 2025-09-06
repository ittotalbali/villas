import { Button } from "@/components/ui/button";
import { useFilterContext } from "../context";

type Props = {
  testid?: string;
  label: string;
};

const CancelButton = ({ label }: Props) => {
  const { handleCancel } = useFilterContext();
  return (
    <Button
      variant="ghost"
      onClick={handleCancel}
      className="w-full sm:w-auto order-2 sm:order-1"
    >
      {label}
    </Button>
  );
};

export default CancelButton;
