import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Home,
  Bath,
  DollarSign,
  Calendar,
  Users,
  Mountain,
  Waves,
  Heart,
  Building,
  Loader2,
  CalendarIcon,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useHomeContext } from "@/components/Pages/Home/contexts/context";

// Import ComboBoxes
import AreaComboBox from "@/components/ComboBoxes/Area";
import LocationComboBox from "@/components/ComboBoxes/Location";
import SubLocationComboBox from "@/components/ComboBoxes/SubLocation";

// Import facilities hook
import { useFacilities } from "@/lib/api/hooks/facilities";
import {
  useVillaFilterStore,
  type VillaQueryParams,
} from "@/lib/store/filterStore";

export default function VillaFilterModal() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("retreats");
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();

  // Zustand store
  const { filters, setFilters, clearAllFilters, getActiveFilterCount } =
    useVillaFilterStore();

  // Home context for resetting map position
  const { setCenter, setZoom } = useHomeContext();

  // Fetch facilities from API
  const {
    data: facilitiesData,
    isLoading: facilitiesLoading,
    isError: facilitiesError,
  } = useFacilities({}, open);

  const facilities = facilitiesData?.data || [];

  // Local draft state for form values
  const [draftFilters, setDraftFilters] = useState<VillaQueryParams>({});

  // Ref to track scroll position
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Initialize draft filters when modal opens
  useEffect(() => {
    if (open) {
      setDraftFilters(filters);
      // Also initialize date states
      if (filters.start_date) {
        setCheckInDate(new Date(filters.start_date));
      }
      if (filters.end_date) {
        setCheckOutDate(new Date(filters.end_date));
      }
    }
  }, [open, filters]);

  // Memoized update draft filter helper with scroll preservation
  const updateDraftFilter = useCallback(
    (key: keyof VillaQueryParams, value: any) => {
      // Capture current scroll position
      const scrollPosition = scrollContainerRef.current?.scrollTop || 0;

      setDraftFilters((prev) => {
        const newFilters = {
          ...prev,
          [key]: value === undefined || value === "" ? undefined : value,
        };

        // Restore scroll position after state update
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

  // Memoized toggle facility in draft with scroll preservation
  const toggleDraftFacility = useCallback((facilityId: number) => {
    // Capture current scroll position
    const scrollPosition = scrollContainerRef.current?.scrollTop || 0;

    setDraftFilters((prev) => {
      const currentFacilities = prev.facilities || [];
      const facilityIdStr = facilityId.toString();
      const isSelected = currentFacilities.includes(facilityIdStr);

      const newFacilities = isSelected
        ? currentFacilities.filter((id) => id !== facilityIdStr)
        : [...currentFacilities, facilityIdStr];

      // Restore scroll position after state update
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

  // Memoized handle check-in date change for draft
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

  // Memoized handle check-out date change for draft
  const handleDraftCheckOutDateChange = useCallback(
    (date: Date | undefined) => {
      setCheckOutDate(date);
      const dateString = date ? format(date, "yyyy-MM-dd") : undefined;
      updateDraftFilter("end_date", dateString);
    },
    [updateDraftFilter]
  );

  // Memoized update villa type nested filters for draft with scroll preservation
  const updateDraftVillaTypeFilter = useCallback(
    (villaType: keyof VillaQueryParams, key: string, value: any) => {
      // Capture current scroll position
      const scrollPosition = scrollContainerRef.current?.scrollTop || 0;

      setDraftFilters((prev) => {
        const currentParams =
          (prev[villaType] as any)?.params ||
          (villaType === "wedding_villa" ? {} : []);

        let newFilters;
        if (
          villaType === "wedding_villa" &&
          typeof currentParams === "object" &&
          !Array.isArray(currentParams)
        ) {
          // Wedding villa has mixed params structure
          newFilters = {
            ...prev,
            [villaType]: {
              params: {
                ...currentParams,
                [key]: value,
              },
            },
          };
        } else if (Array.isArray(currentParams)) {
          // Other villa types use string arrays
          const newParams = value
            ? [...currentParams.filter((p) => p !== key), key]
            : currentParams.filter((p) => p !== key);

          newFilters = {
            ...prev,
            [villaType]: { params: newParams },
          };
        } else {
          newFilters = prev;
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
    []
  );

  // Apply filters - update Zustand store only when clicked
  const applyFilters = useCallback(() => {
    setFilters(draftFilters); // Update the Zustand store
    if (draftFilters.lat && draftFilters.lng) {
      setCenter([parseFloat(draftFilters.lat), parseFloat(draftFilters.lng)]);
      setZoom(12);
    }
    setOpen(false);
  }, [draftFilters, setFilters, setCenter]);

  // Cancel and don't update Zustand store
  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  // Clear all draft filters and Zustand store filters
  const clearAllDraftFilters = useCallback(() => {
    // Capture current scroll position
    const scrollPosition = scrollContainerRef.current?.scrollTop || 0;

    setDraftFilters({});
    setCheckInDate(undefined);
    setCheckOutDate(undefined);
    clearAllFilters(); // Clear Zustand store filters
    setCenter([-8.663804, 115.141362]); // Reset map to default center
    setZoom(16); // Reset map to default zoom

    // Restore scroll position after state update
    requestAnimationFrame(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollPosition;
      }
    });
  }, [clearAllFilters, setCenter, setZoom]);

  // Memoized calculate active filter count for draft
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

  // Memoized property type checkboxes
  const PropertyTypeCheckboxes = useMemo(() => {
    return [
      { key: "freehold", label: "Freehold" },
      { key: "leasehold", label: "Leasehold" },
      { key: "monthly_rental", label: "Monthly Rental" },
      { key: "yearly_rental", label: "Yearly Rental" },
      { key: "close_clubs", label: "Close to Clubs" },
    ].map(({ key, label }) => (
      <div key={key} className="flex items-center space-x-2">
        <Checkbox
          id={key}
          checked={
            draftFilters[key as keyof VillaQueryParams] ===
            (key === "close_clubs" ? true : "yes")
          }
          onCheckedChange={(checked) => {
            if (key === "close_clubs") {
              updateDraftFilter(
                key as keyof VillaQueryParams,
                checked || undefined
              );
            } else {
              updateDraftFilter(
                key as keyof VillaQueryParams,
                checked ? "yes" : undefined
              );
            }
          }}
        />
        <Label htmlFor={key} className="text-sm">
          {label}
        </Label>
      </div>
    ));
  }, [draftFilters, updateDraftFilter]);

  // Memoized facilities checkboxes
  const FacilitiesCheckboxes = useMemo(() => {
    if (facilitiesLoading || facilitiesError || facilities.length === 0) {
      return null;
    }

    return facilities.map((facility) => (
      <div key={facility.id} className="flex items-center space-x-2">
        <Checkbox
          id={`facility_${facility.id}`}
          checked={
            draftFilters.facilities?.includes(facility.id.toString()) || false
          }
          onCheckedChange={() => toggleDraftFacility(facility.id)}
        />
        <Label
          htmlFor={`facility_${facility.id}`}
          className="text-sm leading-tight cursor-pointer"
        >
          {facility.name}
        </Label>
      </div>
    ));
  }, [
    facilities,
    facilitiesLoading,
    facilitiesError,
    draftFilters.facilities,
    toggleDraftFacility,
  ]);

  // Memoized villa type tabs content
  const VillaTypeTabsContent = useMemo(() => {
    const retreatsOptions = [
      { key: "workout_deck", label: "Workout Deck" },
      { key: "gym", label: "Gym" },
      { key: "exclusive_rental", label: "Exclusive Rental" },
      { key: "house_chef", label: "House Chef" },
      { key: "views_from_workout", label: "Views from Workout" },
    ];

    const familyOptions = [
      { key: "pool_fence", label: "Pool Fence" },
      { key: "infant_cot", label: "Infant Cot" },
      { key: "baby_cot", label: "Baby Cot" },
      { key: "baby_high_chair", label: "Baby High Chair" },
      { key: "chef", label: "Chef" },
    ];

    const mountainOptions = [
      { key: "view_of_ricefield", label: "Views of Ricefield" },
      { key: "river_closeby", label: "River Closeby" },
      { key: "waterfall_closeby", label: "Waterfall Closeby" },
    ];

    const beachOptions = [
      { key: "surf_villa", label: "Surf Villa" },
      { key: "views_of_ocean", label: "Ocean Views" },
    ];

    const weddingFeatures = [
      { key: "wedding_packages", label: "Wedding Packages" },
      { key: "ocean_views", label: "Ocean Views" },
      { key: "garden_weddings", label: "Garden Weddings" },
      { key: "beachfront", label: "Beachfront" },
    ];

    return {
      retreats: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {retreatsOptions.map(({ key, label }) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={`retreats_${key}`}
                checked={
                  (draftFilters.retreats_villa as any)?.params?.includes(key) ||
                  false
                }
                onCheckedChange={(checked) =>
                  updateDraftVillaTypeFilter("retreats_villa", key, checked)
                }
              />
              <Label htmlFor={`retreats_${key}`} className="text-sm">
                {label}
              </Label>
            </div>
          ))}
        </div>
      ),
      family: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {familyOptions.map(({ key, label }) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={`family_${key}`}
                checked={
                  (draftFilters.family_villa as any)?.params?.includes(key) ||
                  false
                }
                onCheckedChange={(checked) =>
                  updateDraftVillaTypeFilter("family_villa", key, checked)
                }
              />
              <Label htmlFor={`family_${key}`} className="text-sm">
                {label}
              </Label>
            </div>
          ))}
        </div>
      ),
      mountain: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mountainOptions.map(({ key, label }) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={`mountain_${key}`}
                checked={
                  (draftFilters.mountain_villa as any)?.params?.includes(key) ||
                  false
                }
                onCheckedChange={(checked) =>
                  updateDraftVillaTypeFilter("mountain_villa", key, checked)
                }
              />
              <Label htmlFor={`mountain_${key}`} className="text-sm">
                {label}
              </Label>
            </div>
          ))}
        </div>
      ),
      beach: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {beachOptions.map(({ key, label }) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={`beach_${key}`}
                checked={
                  (draftFilters.beach_villa as any)?.params?.includes(key) ||
                  false
                }
                onCheckedChange={(checked) =>
                  updateDraftVillaTypeFilter("beach_villa", key, checked)
                }
              />
              <Label htmlFor={`beach_${key}`} className="text-sm">
                {label}
              </Label>
            </div>
          ))}
        </div>
      ),
      wedding: (
        <div className="space-y-4">
          {/* Guest Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm">Standing Guests</Label>
              <Input
                type="number"
                placeholder="Number of standing guests"
                value={
                  (draftFilters.wedding_villa as any)?.params
                    ?.standing_guests || ""
                }
                onChange={(e) =>
                  updateDraftVillaTypeFilter(
                    "wedding_villa",
                    "standing_guests",
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Seated Guests</Label>
              <Input
                type="number"
                placeholder="Number of seated guests"
                value={
                  (draftFilters.wedding_villa as any)?.params?.seated_guests ||
                  ""
                }
                onChange={(e) =>
                  updateDraftVillaTypeFilter(
                    "wedding_villa",
                    "seated_guests",
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
              />
            </div>
          </div>

          {/* Wedding Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {weddingFeatures.map(({ key, label }) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={`wedding_${key}`}
                  checked={!!(draftFilters.wedding_villa as any)?.params?.[key]}
                  onCheckedChange={(checked) =>
                    updateDraftVillaTypeFilter("wedding_villa", key, checked)
                  }
                />
                <Label htmlFor={`wedding_${key}`} className="text-sm">
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      ),
    };
  }, [draftFilters, updateDraftVillaTypeFilter]);

  // Filter Content Component
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Search</Label>
        <Input
          placeholder="Search villas..."
          value={draftFilters.search_param || ""}
          onChange={(e) =>
            updateDraftFilter("search_param", e.target.value || undefined)
          }
        />
      </div>
      {/* Location Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Area */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Area</Label>
          <div className="relative z-[59]">
            <AreaComboBox
              value={draftFilters.area_id}
              onValueChange={(value) => {
                updateDraftFilter("area_id", value);
                // Clear location_id and sub_location_id when area_id changes
                updateDraftFilter("location_id", undefined);
                updateDraftFilter("sub_location_id", undefined);
              }}
              placeholder="Select area"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Location</Label>
          <div className="relative z-[58]">
            <LocationComboBox
              value={draftFilters.location_id}
              onValueChange={(id, coordinates) => {
                updateDraftFilter("location_id", id);
                updateDraftFilter("sub_location_id", undefined); // Clear sub_location_id when location_id changes
                if (coordinates) {
                  updateDraftFilter("lat", coordinates.lat);
                  updateDraftFilter("lng", coordinates.lng);
                }
              }}
              placeholder="Select location"
              disabled={!draftFilters.area_id}
              baseParams={{ area_id: draftFilters.area_id?.toString() }}
            />
          </div>
        </div>

        {/* Sub Location */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Sub Location</Label>
          <div className="relative z-[57]">
            <SubLocationComboBox
              value={draftFilters.sub_location_id}
              onValueChange={(value) =>
                updateDraftFilter("sub_location_id", value)
              }
              placeholder="Select sub-location"
              disabled={!draftFilters.location_id}
              baseParams={{ location_id: draftFilters.location_id }}
            />
          </div>
        </div>
      </div>

      {/* Basic Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Type of Accommodation */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Type of Accommodation</Label>
          <Select
            value={draftFilters.type_accommodation || ""}
            onValueChange={(value) =>
              updateDraftFilter("type_accommodation", value || undefined)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto z-50 bg-white">
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="hotel">Hotel</SelectItem>
              <SelectItem value="guesthouse">Guesthouse</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bathrooms */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Bathrooms</Label>
          <Select
            value={draftFilters.bathroom?.toString() || ""}
            onValueChange={(value) =>
              updateDraftFilter("bathroom", value ? parseInt(value) : undefined)
            }
          >
            <SelectTrigger>
              <Bath className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto z-50 bg-white">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} Bathroom{num > 1 ? "s" : ""}
                </SelectItem>
              ))}
              <SelectItem value="8">7+ Bathrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Bedrooms</Label>
          <Select
            value={draftFilters.bedroom?.toString() || ""}
            onValueChange={(value) =>
              updateDraftFilter("bedroom", value ? parseInt(value) : undefined)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto z-50 bg-white">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} Bedroom{num > 1 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Property Type & Additional Options */}
      <div className="space-y-4">
        <Label className="text-sm font-semibold">Property Type & Options</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PropertyTypeCheckboxes}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <Label className="text-sm font-semibold flex items-center">
          <DollarSign className="mr-2 h-4 w-4" />
          Price Range (USD)
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price_min" className="text-sm">
              Minimum Price
            </Label>
            <Input
              id="price_min"
              type="number"
              placeholder="Min price"
              value={draftFilters.price_min || ""}
              onChange={(e) =>
                updateDraftFilter(
                  "price_min",
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price_max" className="text-sm">
              Maximum Price
            </Label>
            <Input
              id="price_max"
              type="number"
              placeholder="Max price"
              value={draftFilters.price_max || ""}
              onChange={(e) =>
                updateDraftFilter(
                  "price_max",
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
            />
          </div>
        </div>
      </div>

      {/* Date Range with shadcn/ui Date Picker */}
      <div className="space-y-4">
        <Label className="text-sm font-semibold flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          Date Range
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Check In Date */}
          <div className="space-y-2">
            <Label className="text-sm">Check In</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkInDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkInDate ? (
                    format(checkInDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={checkInDate}
                  onSelect={handleDraftCheckInDateChange}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check Out Date */}
          <div className="space-y-2">
            <Label className="text-sm">Check Out</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkOutDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOutDate ? (
                    format(checkOutDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={checkOutDate}
                  onSelect={handleDraftCheckOutDateChange}
                  disabled={(date) => {
                    const today = new Date(new Date().setHours(0, 0, 0, 0));
                    const minDate = checkInDate || today;
                    return date < minDate;
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <Separator />

      {/* Villa Type Tabs */}
      <div className="space-y-4">
        <Label className="text-sm font-semibold">Villa Types</Label>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="retreats" className="text-xs p-2">
              <div className="flex flex-col items-center">
                <Heart className="w-3 h-3 mb-1" />
                <span>Retreats</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="wedding" className="text-xs p-2">
              <div className="flex flex-col items-center">
                <Users className="w-3 h-3 mb-1" />
                <span>Wedding</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="family" className="text-xs p-2">
              <div className="flex flex-col items-center">
                <Home className="w-3 h-3 mb-1" />
                <span>Family</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="mountain" className="text-xs p-2">
              <div className="flex flex-col items-center">
                <Mountain className="w-3 h-3 mb-1" />
                <span>Mountain</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="beach" className="text-xs p-2">
              <div className="flex flex-col items-center">
                <Waves className="w-3 h-3 mb-1" />
                <span>Beach</span>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Retreats Villa */}
          <TabsContent value="retreats" className="space-y-4 mt-4">
            {VillaTypeTabsContent.retreats}
          </TabsContent>

          {/* Wedding Villa */}
          <TabsContent value="wedding" className="space-y-4 mt-4">
            {VillaTypeTabsContent.wedding}
          </TabsContent>

          {/* Family Villa */}
          <TabsContent value="family" className="space-y-4 mt-4">
            {VillaTypeTabsContent.family}
          </TabsContent>

          {/* Mountain Villa */}
          <TabsContent value="mountain" className="space-y-4 mt-4">
            {VillaTypeTabsContent.mountain}
          </TabsContent>

          {/* Beach Villa */}
          <TabsContent value="beach" className="space-y-4 mt-4">
            {VillaTypeTabsContent.beach}
          </TabsContent>
        </Tabs>
      </div>

      <Separator />

      {/* Facilities */}
      <div className="space-y-4">
        <Label className="text-sm font-semibold flex items-center">
          <Building className="mr-2 h-4 w-4" />
          Facilities
          {facilitiesLoading && (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          )}
        </Label>

        {facilitiesLoading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span className="text-sm text-muted-foreground">
              Loading facilities...
            </span>
          </div>
        )}

        {facilitiesError && (
          <div className="p-4 text-center border border-destructive/20 rounded-lg bg-destructive/5">
            <p className="text-sm text-destructive">
              Failed to load facilities. Please try again.
            </p>
          </div>
        )}

        {!facilitiesLoading && !facilitiesError && facilities.length === 0 && (
          <div className="p-4 text-center border border-muted rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground">
              No facilities available.
            </p>
          </div>
        )}

        {FacilitiesCheckboxes && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FacilitiesCheckboxes}
          </div>
        )}
      </div>
    </div>
  );

  // Action Buttons Component
  const ActionButtons = () => (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0 p-4 sm:px-6 sm:py-4 border-t bg-background">
      <Button
        variant="outline"
        onClick={clearAllDraftFilters}
        disabled={getDraftActiveFilterCount === 0}
        className="w-full sm:w-auto"
      >
        Clear All
      </Button>
      <div className="flex flex-col sm:flex-row gap-3 sm:space-x-3 sm:gap-0">
        <Button
          variant="ghost"
          onClick={handleCancel}
          className="w-full sm:w-auto order-2 sm:order-1"
        >
          Cancel
        </Button>
        <Button
          onClick={applyFilters}
          className="w-full sm:w-auto order-1 sm:order-2"
        >
          Apply Filters
          {getDraftActiveFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {getDraftActiveFilterCount}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );

  // Dialog for all screen sizes
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative rounded-full flex items-center justify-center p-0"
        >
          <SlidersHorizontal className="h-5 w-5" />
          Filters
          {getActiveFilterCount() > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {getActiveFilterCount()}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-[95vw] max-w-5xl h-[95vh] max-h-[95vh] z-[1000] flex flex-col p-0 bg-white"
        style={{ zIndex: 50 }}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-4">
          <DialogTitle className="flex items-center text-lg sm:text-xl">
            <Home className="mr-2 h-5 w-5" />
            Filter Villas
          </DialogTitle>
        </DialogHeader>
        <div
          ref={scrollContainerRef}
          className="relative flex-1 overflow-y-auto px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <FilterContent />
        </div>
        <ActionButtons />
      </DialogContent>
    </Dialog>
  );
}
