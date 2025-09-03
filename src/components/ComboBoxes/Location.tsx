import { useState, useEffect, useRef, useCallback } from "react";
import { Check, ChevronsUpDown, Loader2, MapPin, X } from "lucide-react";
import {
  useInfiniteLocations,
  type LocationQueryParams,
} from "@/lib/api/hooks/locations";

interface LocationComboBoxProps {
  value?: number;
  onValueChange?: (
    value: number | undefined,
    location?: { lat: string; lng: string }
  ) => void;
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
  baseParams?: Omit<LocationQueryParams, "page" | "search_param">;
  searchDebounce?: number;
  showCoordinates?: boolean;
}

export default function LocationComboBox({
  value,
  onValueChange,
  placeholder = "Select location...",
  emptyText = "No location found.",
  disabled = false,
  className = "",
  baseParams = {},
  searchDebounce = 300,
  showCoordinates = false,
}: LocationComboBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

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
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteLocations(queryParams);

  const allLocations = data?.pages.flatMap((page) => page.data) || [];
  const selectedLocation = allLocations.find(
    (location) => location.id === value
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
            prev < allLocations.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          event.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < allLocations.length) {
            handleSelect(allLocations[highlightedIndex]);
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
  }, [isOpen, highlightedIndex, allLocations]);

  const handleSelect = (location: any) => {
    const newValue = value === location.id ? undefined : location.id;
    onValueChange?.(
      newValue,
      location
        ? {
            lat: location.latitude || "",
            lng: location.longitude || "",
          }
        : undefined
    );
    setIsOpen(false);
    setSearchValue("");
    setHighlightedIndex(-1);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange?.(undefined, undefined);
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
          w-full min-h-[40px] px-3 py-2 text-left bg-white border border-gray-300 rounded-md
          shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          flex items-center justify-between
          ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:border-gray-400"
          }
          ${selectedLocation ? "text-gray-900" : "text-gray-500"}
        `}
      >
        <span className="flex items-center truncate">
          {selectedLocation && (
            <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
          )}
          {selectedLocation ? selectedLocation.name : placeholder}
        </span>
        <div className="flex items-center space-x-1">
          {selectedLocation && !disabled && (
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
              placeholder="Search locations..."
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
                  Error: {error?.message || "Failed to load locations"}
                </p>
              </div>
            )}

            {!isLoading && !isError && allLocations.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-500">
                {emptyText}
              </div>
            )}

            {!isLoading && !isError && allLocations.length > 0 && (
              <>
                {allLocations.map((location, index) => {
                  const isSelected = value === location.id;
                  const isHighlighted = index === highlightedIndex;
                  const isLast = index === allLocations.length - 1;

                  return (
                    <div
                      key={`${location.id}-${index}`}
                      ref={isLast ? lastElementRef : undefined}
                      onClick={() => handleSelect(location)}
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
                      <div className="flex flex-col">
                        <span className="block truncate">{location.name}</span>
                        {showCoordinates &&
                          location.latitude &&
                          location.longitude && (
                            <span className="text-xs text-gray-500">
                              ({location.latitude}, {location.longitude})
                            </span>
                          )}
                      </div>
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

                {!hasNextPage && allLocations.length > 0 && (
                  <div className="p-2 text-center">
                    <span className="text-xs text-gray-500">
                      No more locations to load
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
