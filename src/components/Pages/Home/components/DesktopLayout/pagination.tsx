import { cn } from "@/lib/utils";
import { useHomeDesktopContext } from "../../contexts/desktop.context";
import { getTotalPages } from "@/lib/utils/villas";

type Props = {
  testid?: string;
};

const Pagination = ({}: Props) => {
  const { currentPage, setCurrentPage, data } = useHomeDesktopContext();
  const totalPages = getTotalPages(data) || 1;

  const totalPaginationCount = data?.pagination?.total_count
    ? data?.pagination?.total_count
    : 0;
  return (
    <div className="flex items-center justify-between px-4 py-6 border-t border-gray-200 flex-shrink-0">
      <button
        className={cn(
          "px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium",
          currentPage === 1 && "opacity-50 cursor-not-allowed"
        )}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
      >
        Previous
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <button
              key={pageNum}
              className={cn(
                "px-3 py-1 rounded-lg text-sm font-medium",
                currentPage === pageNum
                  ? "bg-pink-500 text-white"
                  : "bg-white border border-gray-300"
              )}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <>
            <span className="text-sm text-gray-500">...</span>
            <button
              className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm font-medium"
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        className={cn(
          "px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium",
          currentPage === totalPages && "opacity-50 cursor-not-allowed"
        )}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
      >
        Next
      </button>

      <span className="text-sm text-gray-500">
        {totalPaginationCount} villas • Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;
