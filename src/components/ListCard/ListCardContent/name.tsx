import { useListCardContext } from "../context";

type props = {
  testid?: string;
};

const ListCardContentName = ({}: props) => {
  const { villa } = useListCardContext();
  return (
    <p className="text-sm text-gray-600 leading-tight">
      {villa.location} · {villa.area}
    </p>
  );
};

export default ListCardContentName;
