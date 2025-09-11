import { useFacilities, type Facility } from "@/lib/api/hooks/facilities";
import qs from "qs";
import {
  useVillaFilterStore,
  type VillaQueryParams,
} from "@/lib/store/filterStore";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useHomeContext } from "../Pages/Home/contexts/context";
import { format, parseISO } from "date-fns";
import { useSearchParams as useRouterSearchParams } from "react-router-dom";

interface ContextProps {
  initialized: boolean;

  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  applyFilters: () => void;
  handleCancel: () => void;
  clearAllDraftFilters: () => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;

  checkInDate: Date | undefined;
  checkOutDate: Date | undefined;

  handleDraftCheckInDateChange: (date: Date | undefined) => void;
  handleDraftCheckOutDateChange: (date: Date | undefined) => void;

  draftFilters: VillaQueryParams;
  toggleDraftFacility: (facilityName: string) => void;
  updateDraftFilter: (key: keyof VillaQueryParams, value: any) => void;
  updateDraftVillaTypeFilter: (
    villaType: keyof VillaQueryParams,
    key: string,
    value: any
  ) => void;

  facilities: Facility[];
  facilitiesLoading: boolean;
  facilitiesError: boolean;

  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;

  getDraftActiveFilterCount: number;
}

const Context = createContext<ContextProps | undefined>(undefined);

// Helper function to parse query param value to boolean
const parseBooleanParam = (value: string | null): boolean | undefined => {
  if (value === "true") {
    return true;
  }
  return undefined;
};

// Helper function to parse array param (comma-separated string)
const parseArrayParam = (value: string | null): string[] => {
  if (value) {
    return value.split(",").filter(Boolean);
  }
  return [];
};

// Helper function to parse number param
const parseNumberParam = (value: string | null): number | undefined => {
  if (value) {
    const num = parseFloat(value);
    return isNaN(num) ? undefined : num;
  }
  return undefined;
};

// Helper function to parse string param
const parseStringParam = (value: string | null): string | undefined => {
  return value || undefined;
};

const parseAccommodationParam = (
  value: string | null
): VillaQueryParams["type_accommodation"] => {
  const allowed = [
    "house",
    "guesthouse",
    "hotel",
    "apartment",
    "villa",
  ] as const;
  return value && allowed.includes(value as any)
    ? (value as (typeof allowed)[number])
    : undefined;
};

// Helper function to parse sort_type
const parseSortTypeParam = (
  value: string | null
): "asc" | "desc" | undefined => {
  if (value === "asc" || value === "desc") {
    return value;
  }
  return undefined;
};

// Helper function to parse status
const parseStatusParam = (
  value: string | null
): "draft" | "post" | undefined => {
  if (value === "draft" || value === "post") {
    return value;
  }
  return undefined;
};

// Helper function to parse yes/no fields
const parseYesNoParam = (value: string | null): "yes" | "no" | undefined => {
  if (value === "yes" || value === "no") {
    return value;
  }
  return undefined;
};

// Helper function to parse villa type params (e.g., for retreats_villa=params value)
const parseVillaTypeParams = (
  paramName: string,
  searchParams: URLSearchParams
): any => {
  const paramValue = searchParams.get(paramName);
  if (!paramValue) return undefined;

  if (paramName === "wedding_villa") {
    // Wedding villa: comma-separated keys for checkboxes
    const paramsArray = paramValue.split(",").filter(Boolean);
    return { params: paramsArray };
  } else {
    // Other villa types: array of strings
    return { params: paramValue.split(",").filter(Boolean) };
  }
};

export const FilterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [routerSearchParams, setRouterSearchParams] = useRouterSearchParams();
  const { filters, setFilters, clearAllFilters } = useVillaFilterStore();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("retreats");
  const [initialized, setInitialized] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(
    filters.start_date ? parseISO(filters.start_date) : undefined
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    filters.end_date ? parseISO(filters.end_date) : undefined
  );
  const [draftFilters, setDraftFilters] = useState<VillaQueryParams>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { setCenter, setZoom } = useHomeContext();

  const {
    data: facilitiesData,
    isLoading: facilitiesLoading,
    isError: facilitiesError,
  } = useFacilities({}, open);

  const facilities = facilitiesData?.data || [];


  // Initialize filters from query params if present (only once on mount)
useEffect(() => {
  if (!initialized && routerSearchParams) {
    const queryFilters: VillaQueryParams = {};

    // Define all parameters with their parse and serialization functions
    const paramConfigs: {
      key: keyof VillaQueryParams;
      parse: (value: string | null) => any;
      toString?: (value: any) => string; // For converting filters to routerSearchParams
    }[] = [
      { key: "curs_exchanges_id", parse: parseNumberParam, toString: (v) => v.toString() },
      { key: "lat", parse: parseStringParam, toString: (v) => v },
      { key: "lng", parse: parseStringParam, toString: (v) => v },
      { key: "zoom", parse: parseNumberParam, toString: (v) => v.toString() },
      { key: "page", parse: parseNumberParam, toString: (v) => v.toString() },
      { key: "length", parse: parseNumberParam, toString: (v) => v.toString() },
      { key: "sort_by", parse: parseStringParam, toString: (v) => v },
      { key: "sort_type", parse: parseSortTypeParam, toString: (v) => v },
      { key: "search_param", parse: parseStringParam, toString: (v) => v },
      { key: "status", parse: parseStatusParam, toString: (v) => v },
      { key: "limit", parse: parseNumberParam, toString: (v) => v.toString() },
      { key: "area_id", parse: parseNumberParam, toString: (v) => v.toString() },
      { key: "location_id", parse: parseNumberParam, toString: (v) => v.toString() },
      { key: "sub_location_id", parse: parseNumberParam, toString: (v) => v.toString() },
      { key: "start_date", parse: parseStringParam, toString: (v) => v },
      { key: "end_date", parse: parseStringParam, toString: (v) => v },
      { key: "bathroom", parse: parseNumberParam, toString: (v) => v.toString() },
      { key: "user_id", parse: parseNumberParam, toString: (v) => v.toString() },
      { key: "villa_bvp", parse: parseStringParam, toString: (v) => v },
      { key: "slug", parse: parseStringParam, toString: (v) => v },
      { key: "whatsapp", parse: parseStringParam, toString: (v) => v },
      { key: "email", parse: parseStringParam, toString: (v) => v },
      { key: "type_accommodation", parse: parseAccommodationParam, toString: (v) => v },
      { key: "freehold", parse: parseYesNoParam, toString: (v) => v },
      { key: "leasehold", parse: parseYesNoParam, toString: (v) => v },
      { key: "monthly_rental", parse: parseYesNoParam, toString: (v) => v },
      { key: "yearly_rental", parse: parseYesNoParam, toString: (v) => v },
      { key: "close_clubs", parse: parseBooleanParam, toString: (v) => v.toString() },
      {
        key: "facilities",
        parse: parseArrayParam,
        toString: (v: string[]) => v.join(","),
      },
      { key: "price_min", parse: parseNumberParam, toString: (v) => v.toString() },
      { key: "price_max", parse: parseNumberParam, toString: (v) => v.toString() },
      { key: "bedroom", parse: parseNumberParam, toString: (v) => v.toString() },
      { key: "code", parse: parseStringParam, toString: (v) => v },
      { key: "is_paginate", parse: parseBooleanParam, toString: (v) => v.toString() },
    ];

    // Process standard parameters
    paramConfigs.forEach(({ key, parse, toString }) => {
      if (routerSearchParams.has(key)) {
        queryFilters[key] = parse(routerSearchParams.get(key));
      } else if (filters[key] !== undefined && toString) {
        // Convert facility IDs to names for routerSearchParams
        if (key === "facilities" && Array.isArray(filters[key])) {
          const facilityNames = (filters[key] as string[])
            .map((id) => {
              const facility = facilities.find((f) => f.id.toString() === id);
              return facility ? facility.name : id;
            })
            .filter(Boolean);
          routerSearchParams.set(key, facilityNames.join(","));
        } else {
          routerSearchParams.set(key, toString(filters[key]));
        }
      }
    });

    // Handle villa type specific filters
    const villaTypes = [
      "retreats_villa",
      "mountain_villa",
      "beach_villa",
      "family_villa",
      "wedding_villa",
    ] as const;

    villaTypes.forEach((type) => {
      if (routerSearchParams.has(type)) {
        queryFilters[type] = parseVillaTypeParams(type, routerSearchParams);
      } else if (filters[type] !== undefined) {
        const villaData = filters[type];
        if (villaData && typeof villaData === "object" && "params" in villaData) {
          const params = villaData.params;
          if (Array.isArray(params)) {
            routerSearchParams.set(type, params.join(","));
          } else if (typeof params === "object") {
            // For wedding_villa, use keys with true values
            const activeParams = Object.keys(params).filter((k) => params[k] === true);
            routerSearchParams.set(type, activeParams.join(","));
          }
        }
      }
    });

    // Special case for sub_location_id dependency on location_id
    if (queryFilters.location_id) {
      if (routerSearchParams.has("sub_location_id")) {
        queryFilters.sub_location_id = parseNumberParam(routerSearchParams.get("sub_location_id"));
      } else if (filters.sub_location_id !== undefined) {
        routerSearchParams.set("sub_location_id", filters.sub_location_id.toString());
      }
    }

    // Set to store if any filter is present
    const hasFilters = Object.keys(queryFilters).some(
      (key) => queryFilters[key as keyof VillaQueryParams] !== undefined
    );
    if (hasFilters) {
      setFilters(queryFilters);
      // Update dates for display
      if (queryFilters.start_date) {
        setCheckInDate(parseISO(queryFilters.start_date));
      }
      if (queryFilters.end_date) {
        setCheckOutDate(parseISO(queryFilters.end_date));
      }
    }
    setInitialized(true);

    // Sync routerSearchParams to URL using qs for consistency
    if (hasFilters) {
      const cleanedParams = Object.fromEntries(
        Object.entries(queryFilters).filter(
          ([_, value]) => value !== undefined && value !== null && value !== ""
        )
      );

      // Convert facilities IDs to names for URL
      if (cleanedParams.facilities && Array.isArray(cleanedParams.facilities)) {
        const facilityNames = cleanedParams.facilities
          .map((id) => {
            const facility = facilities.find((f) => f.id.toString() === id);
            return facility ? facility.name : id;
          })
          .filter(Boolean);
        cleanedParams.facilities = facilityNames;
      }

      // Convert villa type params
      villaTypes.forEach((type) => {
        const villaData = cleanedParams[type];
        if (villaData && typeof villaData === "object" && "params" in villaData) {
          const params = villaData.params;
          if (Array.isArray(params)) {
            cleanedParams[type] = { params };
          } else if (typeof params === "object") {
            cleanedParams[type] = {
              params: Object.keys(params).filter((k) => params[k] === true),
            };
          }
        }
      });

      // Clear lat/lng/zoom if location filters are set
      if (cleanedParams.area_id || cleanedParams.location_id || cleanedParams.sub_location_id) {
        delete cleanedParams.lat;
        delete cleanedParams.lng;
        delete cleanedParams.zoom;
      }

      const queryString = qs.stringify(cleanedParams, {
        arrayFormat: "brackets",
        encode: false,
      });
      setRouterSearchParams(new URLSearchParams(queryString));
    }
  }
}, [routerSearchParams, initialized, setFilters, filters, facilities, setRouterSearchParams]);


  // Sync dates when filters change externally (but only if from query init)
  useEffect(() => {
    if (filters.start_date && !checkInDate) {
      setCheckInDate(parseISO(filters.start_date));
    }
    if (filters.end_date && !checkOutDate) {
      setCheckOutDate(parseISO(filters.end_date));
    }
  }, [filters.start_date, filters.end_date, checkInDate, checkOutDate]);

  useEffect(() => {
    if (open) {
      setDraftFilters(filters);

      // Ensure dates are set
      if (filters.start_date && !checkInDate) {
        setCheckInDate(parseISO(filters.start_date));
      }
      if (filters.end_date && !checkOutDate) {
        setCheckOutDate(parseISO(filters.end_date));
      }
    }
  }, [open, filters, checkInDate, checkOutDate]);

  const updateDraftFilter = useCallback(
    (key: keyof VillaQueryParams, value: any) => {
      const scrollPosition = scrollContainerRef.current?.scrollTop || 0;

      setDraftFilters((prev) => {
        const newFilters = {
          ...prev,
          [key]: value === undefined || value === "" ? undefined : value,
        };

        requestAnimationFrame(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollPosition;
          }
        });

        return newFilters;
      });
    },
    []
  );

  const toggleDraftFacility = useCallback((facilityName: string) => {
    const scrollPosition = scrollContainerRef.current?.scrollTop || 0;

    setDraftFilters((prev) => {
      const currentFacilities = prev.facilities || [];
      const isSelected = currentFacilities.includes(facilityName); // Check by name

      const newFacilities = isSelected
        ? currentFacilities.filter((name) => name !== facilityName) // Filter by name
        : [...currentFacilities, facilityName]; // Add name

      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollPosition;
        }
      });

      return {
        ...prev,
        facilities: newFacilities.length > 0 ? newFacilities : undefined,
      };
    });
  }, []);

  const handleDraftCheckInDateChange = useCallback(
    (date: Date | undefined) => {
      setCheckInDate(date);
      const dateString = date ? format(date, "yyyy-MM-dd") : undefined;

      // Capture current scroll position
      const scrollPosition = scrollContainerRef.current?.scrollTop || 0;

      setDraftFilters((prev) => {
        const newFilters = { ...prev, start_date: dateString };

        // Clear check-out date if it's before the new check-in date
        if (date && checkOutDate && checkOutDate < date) {
          setCheckOutDate(undefined);
          newFilters.end_date = undefined;
        }

        // Restore scroll position after state update
        requestAnimationFrame(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollPosition;
          }
        });

        return newFilters;
      });
    },
    [checkOutDate]
  );

  const handleDraftCheckOutDateChange = useCallback(
    (date: Date | undefined) => {
      setCheckOutDate(date);
      const dateString = date ? format(date, "yyyy-MM-dd") : undefined;
      updateDraftFilter("end_date", dateString);
    },
    [updateDraftFilter]
  );

  const updateDraftVillaTypeFilter = useCallback(
    (villaType: keyof VillaQueryParams, key: string, value: any) => {
      const scrollPosition = scrollContainerRef.current?.scrollTop || 0;

      setDraftFilters((prev) => {
        const currentVillaTypeData = prev[villaType] as any;
        const currentParams = currentVillaTypeData?.params || [];

        let newParams;

        if (villaType === "wedding_villa") {
          // Wedding villa uses object format
          newParams = { ...currentParams };
          if (value === true) {
            newParams[key] = true;
          } else {
            delete newParams[key];
          }
        } else {
          // Other villa types use array format
          newParams = Array.isArray(currentParams) ? [...currentParams] : [];
          if (value === true) {
            if (!newParams.includes(key)) {
              newParams.push(key);
            }
          } else {
            newParams = newParams.filter((param: string) => param !== key);
          }
        }

        const newFilters = {
          ...prev,
          [villaType]:
            (Array.isArray(newParams) && newParams.length > 0) ||
            (typeof newParams === "object" && Object.keys(newParams).length > 0)
              ? { params: newParams }
              : undefined,
        };

        requestAnimationFrame(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollPosition;
          }
        });

        return newFilters;
      });
    },
    []
  );

  const applyFilters = useCallback(() => {
    setFilters(draftFilters);
    if (draftFilters.lat && draftFilters.lng) {
      setCenter([parseFloat(draftFilters.lat), parseFloat(draftFilters.lng)]);
      setZoom(12);
    }

    // Update URL query params using qs for consistent serialization
    setRouterSearchParams((prev) => {
      // Convert current search params to object
      const currentParams = Object.fromEntries(prev.entries());

      // Merge with new filters
      const mergedParams = {
        ...currentParams,
        ...draftFilters,
      };

      // Clean up undefined values
      const cleanedParams = Object.fromEntries(
        Object.entries(mergedParams).filter(
          ([_, value]) => value !== undefined && value !== null && value !== ""
        )
      );

      // Clear location filters when area/location filters are set
      if (
        cleanedParams.area_id ||
        cleanedParams.location_id ||
        cleanedParams.sub_location_id
      ) {
        delete cleanedParams.lat;
        delete cleanedParams.lng;
        delete cleanedParams.zoom;
      }

      // Convert facilities IDs to names for backend
      if (cleanedParams.facilities && Array.isArray(cleanedParams.facilities)) {
        const facilityNames = cleanedParams.facilities
          .map((id) => {
            const facility = facilities.find((f) => f.id.toString() === id);
            return facility ? facility.name : id;
          })
          .filter(Boolean);

        cleanedParams.facilities = facilityNames;
      }

      // Convert villa type params to the format backend expects
      const villaTypes = [
        "retreats_villa",
        "mountain_villa",
        "wedding_villa",
        "beach_villa",
        "family_villa",
      ] as const;

      villaTypes.forEach((type) => {
        const villaData = cleanedParams[type];

        // Add type checking before accessing params
        if (
          villaData &&
          typeof villaData === "object" &&
          "params" in villaData
        ) {
          const villaParams = villaData.params;

          if (
            type === "wedding_villa" &&
            typeof villaParams === "object" &&
            !Array.isArray(villaParams)
          ) {
            // Convert wedding villa object to array of keys with true values
            cleanedParams[type] = {
              params: Object.keys(villaParams).filter(
                (k) => villaParams[k] === true
              ),
            };
          }
          // For other villa types, ensure params is an array
          else if (!Array.isArray(villaParams)) {
            cleanedParams[type] = { params: [] };
          }
          // If it's already an array, keep it as is
          else {
            cleanedParams[type] = { params: villaParams };
          }
        } else {
          // If it's not in the expected format, remove it
          delete cleanedParams[type];
        }
      });

      // Use qs to stringify with consistent format
      const queryString = qs.stringify(cleanedParams, {
        arrayFormat: "brackets",
        encode: false,
      });

      return new URLSearchParams(queryString);
    });

    setOpen(false);
  }, [
    draftFilters,
    setFilters,
    setCenter,
    setZoom,
    facilities,
    setRouterSearchParams,
    setOpen,
  ]);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  const clearAllDraftFilters = useCallback(() => {
    const scrollPosition = scrollContainerRef.current?.scrollTop || 0;

    setDraftFilters({});
    setCheckInDate(undefined);
    setCheckOutDate(undefined);
    clearAllFilters();
    setCenter([-8.663804, 115.141362]);
    setZoom(12);

    // Clear URL query params
    // navigate(location.pathname, { replace: true });
    setRouterSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      // keep only these
      const keepKeys = new Set(["lat", "lng", "zoom"]);

      Array.from(next.keys()).forEach((key) => {
        if (!keepKeys.has(key)) {
          next.delete(key);
        }
      });

      return next;
    });

    requestAnimationFrame(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollPosition;
      }
    });
  }, [clearAllFilters, setCenter, setZoom]);

  const getDraftActiveFilterCount = useMemo(() => {
    const filters = draftFilters;
    let count = 0;

    if (filters.area_id) count++;
    if (filters.location_id) count++;
    if (filters.sub_location_id) count++;
    if (filters.type_accommodation) count++;
    if (filters.bathroom) count++;
    if (filters.bedroom) count++;
    if (filters.price_min || filters.price_max) count++;
    if (filters.start_date || filters.end_date || checkInDate || checkOutDate)
      count++;
    if (filters.search_param) count++;

    if (filters.freehold === "yes") count++;
    if (filters.leasehold === "yes") count++;
    if (filters.monthly_rental === "yes") count++;
    if (filters.yearly_rental === "yes") count++;
    if (filters.close_clubs) count++;

    if (filters.facilities?.length) count += filters.facilities.length;

    const villaTypes = [
      "retreats_villa",
      "wedding_villa",
      "family_villa",
      "mountain_villa",
      "beach_villa",
    ] as const;

    villaTypes.forEach((type) => {
      const typeFilters = filters[type] as any;
      if (typeFilters?.params) {
        if (Array.isArray(typeFilters.params)) {
          count += typeFilters.params.length;
        } else if (typeof typeFilters.params === "object") {
          count += Object.values(typeFilters.params).filter(Boolean).length;
        }
      }
    });

    return count;
  }, [filters, draftFilters]);

  return (
    <Context.Provider
      value={{
        initialized,
        open,
        setOpen,
        applyFilters,
        handleCancel,
        scrollContainerRef,
        clearAllDraftFilters,
        checkInDate,
        checkOutDate,
        handleDraftCheckInDateChange,
        handleDraftCheckOutDateChange,
        updateDraftFilter,
        draftFilters,
        toggleDraftFacility,
        updateDraftVillaTypeFilter,
        facilities,
        facilitiesError,
        facilitiesLoading,
        activeTab,
        setActiveTab,
        getDraftActiveFilterCount,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useFilterContext must be used within FilterContextProvider"
    );
  }

  return context;
};
