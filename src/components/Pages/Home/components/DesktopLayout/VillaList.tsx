import { getTotalVillaCount } from "@/lib/utils/villas";
import { useHomeDesktopContext } from "../../contexts/desktop.context";
import Pagination from "./pagination";
import ListCard from "@/components/ListCard";
import ListCardSkeleton from "@/components/ListCard/skeleton";
import { useHomeContext } from "../../contexts/context";
import { generateVillaSlug } from "@/lib/utils";
import MobileFilters from "@/components/Navbar/filters/mobile.filter";
import { FilterContextProvider } from "@/components/Filters/context";

type Props = {
  testid?: string;
};

const VillaListSection = ({}: Props) => {
  const { handleMarkerClick, selectedVilla, handleCloseCard } =
    useHomeContext();
  const { data, isLoading, isError, handleHover } = useHomeDesktopContext();

  const totalVillas = getTotalVillaCount(data) | 0;

  const villas = data?.data || [];

  return (
    <div
      className="flex-1 min-w-0 pr-4 lg:pr-2"
      style={{
        // At 100% zoom: ~60% of screen width
        // As screen gets larger: list maintains reasonable max-width while map expands
        flex: `0 0 clamp(600px, 60vw, 800px)`,
        maxWidth: "clamp(600px, 60vw, 800px)",
      }}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-200 flex w-full justify-between">
          {/* <h2 className="m-0 text-2xl font-semibold">Villas in Bali</h2> */}
          <span className="m-0 text-sm text-gray-600 font-medium flex gap-1 my-auto">
            <p className="font-bold">{totalVillas}</p> <p>villas available</p>
          </span>

          <div className="hidden lg:flex">
            <FilterContextProvider>
              <MobileFilters triggerButtonLabel="Filters" />
            </FilterContextProvider>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <div
            className="grid gap-4 lg:gap-6 villa-grid "
            style={{
              // Fixed 3 columns always, just like Airbnb
              gridTemplateColumns: "repeat(3, 1fr)",
              // Columns expand/contract based on container width but always 3 columns
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
                  forMap={false}
                  handleCloseCard={handleCloseCard}
                  isSelected={selectedVilla === villa.id}
                  onClick={() => handleMarkerClick(villa.id)}
                  onMouseEnter={() => handleHover(villa.id, true)}
                  onMouseLeave={() => handleHover(villa.id, false)}
                />
              </a>
            ))}
          </div>

          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default VillaListSection;
