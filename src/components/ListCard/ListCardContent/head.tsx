import { useListCardContext } from "../context";

type props = {
  testid?: string;
};

const ListCardContentHead = ({}: props) => {
  const { villa } = useListCardContext();

  return (
    <div className="flex items-start justify-between">
      <h3 className="font-medium text-gray-900 text-sm leading-tight flex-1 mr-2">
        {villa.location || villa.area || "Villa Location"}
      </h3>
      <div className="flex items-center gap-1 flex-shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-3 h-3 text-gray-900"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span className="text-sm text-gray-900 font-medium">New</span>
      </div>
    </div>
  );
};

export default ListCardContentHead;
