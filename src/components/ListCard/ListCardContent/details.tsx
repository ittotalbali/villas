import { useListCardContext } from "../context";

type Props = {
  testid?: string;
};

const ListCardContentDetails = ({}: Props) => {
  const { villa } = useListCardContext();
  return (
    <p className="text-sm text-gray-600 leading-tight">
      {villa.type_of_accommodation
        ? villa.type_of_accommodation.charAt(0).toUpperCase() +
          villa.type_of_accommodation.slice(1)
        : "Accommodation"}
      {villa.total_bedroom && (
        <span>
          {" "}
          · {villa.total_bedroom} bed
          {villa.total_bedroom !== 1 ? "s" : ""}
        </span>
      )}
      {villa.total_bathroom && (
        <span>
          {" "}
          · {villa.total_bathroom} bath
          {villa.total_bathroom !== 1 ? "s" : ""}
        </span>
      )}
    </p>
  );
};

export default ListCardContentDetails;
