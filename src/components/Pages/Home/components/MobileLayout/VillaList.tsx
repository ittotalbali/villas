import { flattenInfiniteVillas } from "@/lib/utils/villas";
import ListCard from "@/components/ListCard";
import ListCardSkeleton from "@/components/ListCard/skeleton";
import { useHomeContext } from "../../contexts/context";
import { useHomeMobilesContext } from "../../contexts/mobiles.context";
import { generateVillaSlug } from "@/lib/utils";

type Props = {
  testid?: string;
};

const VillaListSection = ({}: Props) => {
  const { handleMarkerClick, selectedVilla } = useHomeContext();
  const {
    data,
    isLoading,
    isError,
    handleHover,
    isFetchingNextPage,
    hasNextPage,
    observerTarget,
  } = useHomeMobilesContext();

  // const totalVillas = getTotalVillaCount(data) | 0;

  const villas = flattenInfiniteVillas(data);

  return (
    <div className="flex-1 min-h-0">
      <div className="flex flex-col h-full">
        {/* <div className="p-6 border-b border-gray-200 ">
          <h2 className="m-0 text-2xl font-semibold">Villas in Bali</h2>
          <p className="m-0 text-sm text-gray-500">
            {totalVillas} villas available
          </p>
        </div> */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <div
            className="grid gap-4 lg:gap-6 villa-grid "
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            }}
          >
            {isLoading &&
              villas.length === 0 &&
              Array.from({ length: 18 }).map((_, index) => (
                <ListCardSkeleton key={index} />
              ))}
            {isError && (
              <div className="col-span-full p-10 text-center text-pink-500">
                <p>Failed to load villas</p>
              </div>
            )}
            {!isLoading && !isError && villas.length === 0 && (
              <div className="col-span-full p-10 text-center text-gray-500">
                <p>No villas available</p>
              </div>
            )}

            {villas.map((villa, index) => (
              <a
                key={`${villa.id}-${index}`}
                href={generateVillaSlug(villa)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListCard
                  key={`${villa.id}-${index}`}
                  villa={villa}
                  isSelected={selectedVilla === villa.id}
                  onClick={() => handleMarkerClick(villa.id)}
                  onMouseEnter={() => handleHover(villa.id, true)}
                  onMouseLeave={() => handleHover(villa.id, false)}
                />
              </a>
            ))}
          </div>
          <div className="mt-6">
            {isFetchingNextPage && <ListCardSkeleton />}
            {hasNextPage && !isFetchingNextPage && (
              <div
                ref={observerTarget}
                className="text-center p-5 text-gray-500"
              >
                Scroll to load more...
              </div>
            )}
            {!hasNextPage && villas.length > 0 && (
              <div className="text-center p-5 text-gray-500">
                You've reached the end!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaListSection;
