import { flattenInfiniteVillas } from "@/lib/utils/villas";
import { useListContext } from "./contexts/context";
import ListCardSkeleton from "@/components/ListCard/skeleton";
import { generateVillaSlug } from "@/lib/utils";
import ListCard from "@/components/ListCard";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useHomeContext } from "../Home/contexts/context";
import { Map } from "lucide-react";

const ListContent = () => {
  const {
    isLoading,
    isError,
    isFetchingNextPage,
    data,
    hasNextPage,
    observerTarget,
  } = useListContext();
  const { viewMode, setViewMode } = useHomeContext();
  const villas = flattenInfiniteVillas(data);
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const listContainerRef = useRef<HTMLDivElement | null>(null);

  const handleShowMap = useCallback(() => {
    setViewMode("map");
  }, [viewMode]);

  useEffect(() => {
    const handleScroll = () => {
      // Show scroll-to-top button when list container is scrolled away from the top
      if (listContainerRef.current) {
        setShowScrollTop(listContainerRef.current.scrollTop > 0);
      }
    };

    const listContainer = listContainerRef.current;
    if (listContainer) {
      listContainer.addEventListener("scroll", handleScroll);
      return () => listContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToTop = () => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex-1 min-h-0 relative">
      <div className="flex flex-col h-full">
        <div
          ref={listContainerRef}
          className="flex-1 overflow-y-auto p-4 min-h-0"
        >
          <div
            className="
              grid gap-4 lg:gap-6 
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-6
              2xl:grid-cols-6
            "
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
                  isSelected={false}
                  handleCloseCard={() => {}}
                  onClick={() => {}}
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                />
              </a>
            ))}
          </div>
          <div className="mt-6">
            {isFetchingNextPage && (
              <div className="text-center p-5 text-gray-500">
                Loading more villas...
              </div>
            )}
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

      {/* Floating Show Map Button */}
      <button
        className="fixed bottom-4 left-1/2 font-semibold transform -translate-x-1/2 bg-[#75c5f0] text-white shadow-lg hover:bg-[#5ab3db] active:bg-[#4a9bc4] transition-all duration-200 z-10 flex items-center justify-center gap-2
    px-6 py-3 rounded-full text-base min-w-[140px]
    md:px-5 md:py-2.5 md:text-sm md:min-w-[120px]
    sm:px-4 sm:py-2 sm:text-sm sm:min-w-[100px] sm:gap-1.5
    xs:px-3 xs:py-1.5 xs:text-xs xs:min-w-[90px] xs:gap-1"
        onClick={() => {
          // Add your map showing logic here
          navigate("/map");
          handleShowMap();
        }}
      >
        <Map className="w-5 h-5 md:w-4 md:h-4 sm:w-4 sm:h-4 xs:w-3.5 xs:h-3.5" />
        <span className="sm:hidden xs:hidden">Map</span>
        <span className="hidden sm:inline xs:inline">Show Map</span>
      </button>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          className="fixed bg-gray-500 text-white rounded-full shadow-lg hover:bg-gray-600 active:bg-gray-700 transition-all duration-200 z-10 bottom-6 right-6 p-3
    md:bottom-5 md:right-5 md:p-2.5
    sm:bottom-4 sm:right-4 sm:p-2
    xs:bottom-3 xs:right-3 xs:p-1.5"
          onClick={scrollToTop}
        >
          <svg
            className="fill-none stroke-current
      /* Desktop icon size */
      w-6 h-6
      /* Tablet icon size */
      md:w-5 md:h-5
      /* Mobile icon size */
      sm:w-4 sm:h-4
      /* Extra small icon size */
      xs:w-3.5 xs:h-3.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ListContent;
