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

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage <= 3) {
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

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
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="text-sm text-gray-500">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          return (
            <button
              key={pageNum}
              className={cn(
                "px-3 py-1 rounded-lg text-sm font-medium min-w-[2.5rem]",
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
