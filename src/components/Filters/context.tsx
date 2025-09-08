import { useFacilities, type Facility } from "@/lib/api/hooks/facilities";
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

interface ContextProps {
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
  toggleDraftFacility: (facilityId: number) => void;
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

export const FilterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { filters, setFilters, clearAllFilters } = useVillaFilterStore();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("retreats");
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(
    filters.start_date ? parseISO(filters.start_date) : undefined
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    filters.end_date ? parseISO(filters.end_date) : undefined
  );
  const [draftFilters, setDraftFilters] = useState<VillaQueryParams>(filters);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { setCenter, setZoom } = useHomeContext();

  const {
    data: facilitiesData,
    isLoading: facilitiesLoading,
    isError: facilitiesError,
  } = useFacilities({}, open);

  const facilities = facilitiesData?.data || [];

  useEffect(() => {
    if (open) {
      setDraftFilters(filters);

      if (filters.start_date) {
        setCheckInDate(new Date(filters.start_date));
      }
      if (filters.end_date) {
        setCheckOutDate(new Date(filters.end_date));
      }
    }
  }, [open, filters]);

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

  const toggleDraftFacility = useCallback((facilityId: number) => {
    const scrollPosition = scrollContainerRef.current?.scrollTop || 0;

    setDraftFilters((prev) => {
      const currentFacilities = prev.facilities || [];
      const facilityIdStr = facilityId.toString();
      const isSelected = currentFacilities.includes(facilityIdStr);

      const newFacilities = isSelected
        ? currentFacilities.filter((id) => id !== facilityIdStr)
        : [...currentFacilities, facilityIdStr];

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
        const currentParams = currentVillaTypeData?.params || {};

        // Create new params object
        const newParams = { ...currentParams };

        // Handle the checkbox value properly
        if (value === true) {
          newParams[key] = true;
        } else {
          // Remove the key entirely when unchecked
          delete newParams[key];
        }

        // Clean up undefined values
        const cleanedParams = Object.fromEntries(
          Object.entries(newParams).filter(
            ([_, v]) => v !== undefined && v !== false
          )
        );

        const newFilters = {
          ...prev,
          [villaType]:
            Object.keys(cleanedParams).length > 0
              ? { params: cleanedParams }
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
  // const updateDraftVillaTypeFilter = useCallback(
  //   (villaType: keyof VillaQueryParams, key: string, value: any) => {
  //     // Capture current scroll position
  //     const scrollPosition = scrollContainerRef.current?.scrollTop || 0;

  //     setDraftFilters((prev) => {
  //       const currentParams =
  //         (prev[villaType] as any)?.params ||
  //         (villaType === "wedding_villa" ? {} : []);

  //       let newFilters;
  //       if (
  //         villaType === "wedding_villa" &&
  //         typeof currentParams === "object" &&
  //         !Array.isArray(currentParams)
  //       ) {
  //         // Wedding villa has mixed params structure
  //         newFilters = {
  //           ...prev,
  //           [villaType]: {
  //             params: {
  //               ...currentParams,
  //               [key]: value,
  //             },
  //           },
  //         };
  //       } else if (Array.isArray(currentParams)) {
  //         // Other villa types use string arrays
  //         const newParams = value
  //           ? [...currentParams.filter((p) => p !== key), key]
  //           : currentParams.filter((p) => p !== key);

  //         newFilters = {
  //           ...prev,
  //           [villaType]: { params: newParams },
  //         };
  //       } else {
  //         newFilters = prev;
  //       }

  //       // Restore scroll position after state update
  //       requestAnimationFrame(() => {
  //         if (scrollContainerRef.current) {
  //           scrollContainerRef.current.scrollTop = scrollPosition;
  //         }
  //       });

  //       return newFilters;
  //     });
  //   },
  //   []
  // );

  const applyFilters = useCallback(() => {
    setFilters(draftFilters);
    if (draftFilters.lat && draftFilters.lng) {
      setCenter([parseFloat(draftFilters.lat), parseFloat(draftFilters.lng)]);
      setZoom(12);
    }
    setOpen(false);
  }, [draftFilters, setFilters, setCenter]);

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
    setZoom(16);

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
    if (filters.start_date || filters.end_date) count++;
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
  }, [draftFilters]);

  return (
    <Context.Provider
      value={{
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
