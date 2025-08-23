import { formatPrice } from "@/lib/utils";
import { useListCardContext } from "../context";

type Props = {
  testid?: string;
};

const ListCardContentPrice = ({}: Props) => {
  const { villa } = useListCardContext();
  return (
    <div className="mt-1">
      {villa.base_rate ? (
        <p className="text-sm text-gray-900">
          <span className="font-semibold">
            {villa.base_rate_currency}{" "}
            {formatPrice(
              Number(villa.base_rate),
              villa.base_rate_currency || "USD"
            )}
          </span>
          <span className="font-normal"> night</span>
        </p>
      ) : (
        <p className="text-sm text-gray-500">Price on request</p>
      )}
    </div>
  );
};

export default ListCardContentPrice;
