import { useListCardContext } from "../context";

type props = {
  testid?: string;
};

const ListCardContentHead = ({}: props) => {
  const { villa } = useListCardContext();

  return (
    <div className="flex items-start justify-between">
      <h3 className="font-medium text-gray-900 text-sm leading-tight flex-1 mr-2">
        {villa.code || villa.area || "Villa Location"}
      </h3>
    </div>
  );
};

export default ListCardContentHead;
