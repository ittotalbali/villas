import { useState, useEffect, useRef, useCallback } from "react";
import { Check, ChevronsUpDown, Loader2, Building2, X } from "lucide-react";
import {
  useInfiniteSubLocations,
  type SubLocationQueryParams,
} from "@/lib/api/hooks/sub-locations";

interface SubLocationComboBoxProps {
  value?: number;
  onValueChange?: (value: number | undefined) => void;
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
  baseParams?: Omit<SubLocationQueryParams, "page" | "search_param">;
  searchDebounce?: number;
}

export default function SubLocationComboBox({
  value: propValue,
  onValueChange,
  placeholder = "Select sub-location...",
  emptyText = "No sub-location found.",
  disabled = false,
  className = "",
  baseParams = {},
  searchDebounce = 300,
}: SubLocationComboBoxProps) {
  // const { filters, setFilters } = useVillaFilterStore();
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Use store value if propValue is undefined
  const value = propValue;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, searchDebounce);
    return () => clearTimeout(timer);
  }, [searchValue, searchDebounce]);

  const queryParams = {
    ...baseParams,
    search_param: debouncedSearch || undefined,
    length: 5,
    is_paginate: true,
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteSubLocations(queryParams);

  const allSubLocations = data?.pages.flatMap((page) => page.data) || [];
  const selectedSubLocation = allSubLocations.find(
    (subLocation) => subLocation.id === value
  );

  // Intersection observer for infinite scroll
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 0.1 }
      );

      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchValue("");
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev < allSubLocations.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          event.preventDefault();
          if (
            highlightedIndex >= 0 &&
            highlightedIndex < allSubLocations.length
          ) {
            handleSelect(allSubLocations[highlightedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setSearchValue("");
          setHighlightedIndex(-1);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, highlightedIndex, allSubLocations]);

  const handleSelect = (subLocation: any) => {
    const newValue = value === subLocation.id ? undefined : subLocation.id;
    onValueChange?.(newValue);
    // setFilters({ ...filters, sub_location_id: newValue });
    setIsOpen(false);
    setSearchValue("");
    setHighlightedIndex(-1);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange?.(undefined);
    // setFilters({ ...filters, sub_location_id: undefined });
  };

  const toggleOpen = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={toggleOpen}
        disabled={disabled}
        className={`
          w-full min-w-[200px] min-h-[40px] px-3 py-2 text-left bg-white border border-gray-300 rounded-md
          shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          flex items-center justify-between
          ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:border-gray-400"
          }
          ${selectedSubLocation ? "text-gray-900" : "text-gray-500"}
        `}
      >
        <span className="flex items-center truncate">
          {selectedSubLocation && (
            <Building2 className="mr-2 h-4 w-4 flex-shrink-0" />
          )}
          {selectedSubLocation ? selectedSubLocation.name : placeholder}
        </span>
        <div className="flex items-center space-x-1">
          {selectedSubLocation && !disabled && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-gray-100 rounded"
              type="button"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
          <ChevronsUpDown
            className={`h-4 w-4 text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {/* Search Input */}
          <div className="p-2 border-b">
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search sub-locations..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Options List */}
          <div
            ref={listRef}
            className="max-h-60 overflow-y-auto"
            onWheel={(e) => e.stopPropagation()}
          >
            {isLoading && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span className="text-sm text-gray-500">Loading...</span>
              </div>
            )}

            {isError && (
              <div className="p-4 text-center">
                <p className="text-sm text-red-600">
                  Error: {error?.message || "Failed to load sub-locations"}
                </p>
              </div>
            )}

            {!isLoading && !isError && allSubLocations.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-500">
                {emptyText}
              </div>
            )}

            {!isLoading && !isError && allSubLocations.length > 0 && (
              <>
                {allSubLocations.map((subLocation, index) => {
                  const isSelected = value === subLocation.id;
                  const isHighlighted = index === highlightedIndex;
                  const isLast = index === allSubLocations.length - 1;

                  return (
                    <div
                      key={`${subLocation.id}-${index}`}
                      ref={isLast ? lastElementRef : undefined}
                      onClick={() => handleSelect(subLocation)}
                      className={`
                        px-3 py-2 cursor-pointer flex items-center justify-between
                        ${isHighlighted ? "bg-blue-50" : "hover:bg-gray-50"}
                        ${
                          isSelected
                            ? "bg-blue-100 text-blue-900"
                            : "text-gray-900"
                        }
                      `}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      <span className="block truncate">{subLocation.name}</span>
                      {isSelected && (
                        <Check className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                  );
                })}

                {isFetchingNextPage && (
                  <div className="flex items-center justify-center p-2">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span className="text-xs text-gray-500">
                      Loading more...
                    </span>
                  </div>
                )}

                {!hasNextPage && allSubLocations.length > 0 && (
                  <div className="p-2 text-center">
                    <span className="text-xs text-gray-500">
                      No more sub-locations to load
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
