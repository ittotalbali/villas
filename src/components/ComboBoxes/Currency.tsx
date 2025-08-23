import { useState, useEffect, useRef } from "react";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { useCurrencies } from "@/lib/api/hooks/currencies/useCurrencies";
import { useVillaFilterStore } from "@/lib/store/filterStore";

interface CurrencyComboBoxProps {
  value?: number;
  onValueChange?: (value: number | undefined) => void;
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
}

export default function CurrencyComboBox({
  value: propValue,
  onValueChange,
  placeholder = "Select currency...",
  emptyText = "No currencies found.",
  disabled = false,
  className = "",
}: CurrencyComboBoxProps) {
  const { filters, setFilters } = useVillaFilterStore();
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Use store value if propValue is undefined
  const value = propValue !== undefined ? propValue : filters.curs_exchanges_id;

  const { data, isLoading, isError, error } = useCurrencies();
  const currencies = data?.list || [];
  const selectedCurrency = currencies.find((currency) => currency.id === value);

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
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
            prev < currencies.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          event.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < currencies.length) {
            handleSelect(currencies[highlightedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, highlightedIndex, currencies]);

  const handleSelect = (currency: any) => {
    const newValue = value === currency.id ? undefined : currency.id;
    onValueChange?.(newValue);
    setFilters({ ...filters, curs_exchanges_id: newValue });
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange?.(undefined);
    setFilters({ ...filters, curs_exchanges_id: undefined });
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
          ${selectedCurrency ? "text-gray-900" : "text-gray-500"}
        `}
      >
        <span className="block truncate">
          {selectedCurrency ? selectedCurrency.code : placeholder}
        </span>
        <div className="flex items-center space-x-1">
          {selectedCurrency && !disabled && (
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
          {/* Search Input (optional, omitted since not in original CurrencyComboBox) */}
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
                  Error: {error?.message || "Failed to load currencies"}
                </p>
              </div>
            )}

            {!isLoading && !isError && currencies.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-500">
                {emptyText}
              </div>
            )}

            {!isLoading && !isError && currencies.length > 0 && (
              <>
                {currencies.map((currency, index) => {
                  const isSelected = value === currency.id;
                  const isHighlighted = index === highlightedIndex;

                  return (
                    <div
                      key={`${currency.id}-${index}`}
                      onClick={() => handleSelect(currency)}
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
                      <span className="block truncate">{currency.code}</span>
                      {isSelected && (
                        <Check className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
