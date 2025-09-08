import { Bath, Bed } from "lucide-react";
import { useListCardContext } from "../context";

type Props = {
  testid?: string;
};

const ListCardContentDetails = ({}: Props) => {
  const { villa } = useListCardContext();
  return (
    <div className="flex flex-wrap gap-2 text-sm text-gray-600 leading-tight">
      {villa.total_bedroom && (
          <section className="flex gap-1">
            <Bed className="w-4 h-4 text-slate-800" />
            <span className="my-auto">
              {villa.total_bedroom} bed
              {villa.total_bedroom !== 1 ? "s" : ""}
            </span>
          </section>
        )}
        ·
        {villa.total_bathroom && (
          <section className="flex gap-1">
            <Bath className="w-4 h-4 text-slate-800" />
            <span className="my-auto">
              {villa.total_bathroom} bath
              {villa.total_bathroom !== 1 ? "s" : ""}
            </span>
          </section>
        )}
    </div>
  );
};

export default ListCardContentDetails;
