import { MapPinHouse } from "lucide-react";
import { useListCardContext } from "../context";

type props = {
  testid?: string;
};

const ListCardContentName = ({}: props) => {
  const { villa } = useListCardContext();
  return (
    <div className="flex my-auto gap-1">
      <MapPinHouse className="w-4 h-4 text-slate-800" />
      <p className="text-sm text-gray-600 my-auto leading-tight">
        {villa.location} · {villa.area}
      </p>
    </div>
  );
};

export default ListCardContentName;
