import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Heart, Home, Mountain, Users, Waves } from "lucide-react";
import { useFilterContext } from "../context";
import RetreatsCheckbox from "../Checkboxes/retreats";
import FamilyCheckbox from "../Checkboxes/family";
import MountainCheckbox from "../Checkboxes/mountain";
import BeachCheckbox from "../Checkboxes/beach";
import StandingGuestInput from "../Inputs/standing.guests";
import SeatedGuestsInput from "../Inputs/seated.guests";
import WeddingCheckbox from "../Checkboxes/wedding";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type Props = {
  testid?: string;
};

const VillaTypeTabs = ({}: Props) => {
  const { activeTab, setActiveTab } = useFilterContext();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsListRef = useRef<HTMLDivElement>(null);

  // Static config, no dependencies needed
  const VillaTypeTabsContent = {
    retreats: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { key: "workout_deck", label: "Workout Deck" },
          { key: "gym", label: "Gym" },
          { key: "exclusive_rental", label: "Exclusive Rental" },
          { key: "house_chef", label: "House Chef" },
          { key: "views_from_workout", label: "Views from Workout" },
        ].map(({ key, label }) => (
          <RetreatsCheckbox key={key} label={label} checkKey={key} />
        ))}
      </div>
    ),
    family: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { key: "pool_fence", label: "Pool Fence" },
          { key: "infant_cot", label: "Infant Cot" },
          { key: "baby_cot", label: "Baby Cot" },
          { key: "baby_high_chair", label: "Baby High Chair" },
          { key: "chef", label: "Chef" },
        ].map(({ key, label }) => (
          <FamilyCheckbox key={key} label={label} checkKey={key} />
        ))}
      </div>
    ),
    mountain: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { key: "view_of_ricefield", label: "Views of Ricefield" },
          { key: "river_closeby", label: "River Closeby" },
          { key: "waterfall_closeby", label: "Waterfall Closeby" },
        ].map(({ key, label }) => (
          <MountainCheckbox key={key} label={label} checkKey={key} />
        ))}
      </div>
    ),
    beach: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { key: "surf_villa", label: "Surf Villa" },
          { key: "views_of_ocean", label: "Ocean Views" },
        ].map(({ key, label }) => (
          <BeachCheckbox key={key} label={label} checkKey={key} />
        ))}
      </div>
    ),
    wedding: (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StandingGuestInput />
          <SeatedGuestsInput />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { key: "wedding_packages", label: "Wedding Packages" },
            { key: "ocean_views", label: "Ocean Views" },
            { key: "garden_weddings", label: "Garden Weddings" },
            { key: "beachfront", label: "Beachfront" },
          ].map(({ key, label }) => (
            <WeddingCheckbox key={key} label={label} checkKey={key} />
          ))}
        </div>
      </div>
    ),
  };

  // Update indicator position when active tab changes
  useEffect(() => {
    const updateIndicator = () => {
      if (tabsListRef.current) {
        const activeTabElement = tabsListRef.current.querySelector(
          `[data-value="${activeTab}"]`
        ) as HTMLElement;
        if (activeTabElement) {
          const tabsListRect = tabsListRef.current.getBoundingClientRect();
          const activeTabRect = activeTabElement.getBoundingClientRect();

          setIndicatorStyle({
            left: activeTabRect.left - tabsListRect.left,
            width: activeTabRect.width,
          });
        }
      }
    };

    updateIndicator();
    // Add a small delay to ensure DOM is updated
    setTimeout(updateIndicator, 50);
  }, [activeTab]);

  // Update on resize
  useEffect(() => {
    const handleResize = () => {
      const updateIndicator = () => {
        if (tabsListRef.current) {
          const activeTabElement = tabsListRef.current.querySelector(
            `[data-value="${activeTab}"]`
          ) as HTMLElement;
          if (activeTabElement) {
            const tabsListRect = tabsListRef.current.getBoundingClientRect();
            const activeTabRect = activeTabElement.getBoundingClientRect();

            setIndicatorStyle({
              left: activeTabRect.left - tabsListRect.left,
              width: activeTabRect.width,
            });
          }
        }
      };
      updateIndicator();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab]);

  return (
    <div className="space-y-4">
      <Label className="text-sm font-semibold">Villa Types</Label>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="relative">
          <TabsList
            ref={tabsListRef}
            className="grid w-full grid-cols-5 bg-transparent border-b border-gray-200 rounded-none h-auto p-0"
          >
            <TabsTrigger
              value="retreats"
              data-value="retreats"
              className={cn(
                "relative flex flex-col items-center justify-center px-4 py-3 text-sm font-medium transition-colors duration-200",
                "bg-transparent border-0 rounded-none shadow-none",
                "text-gray-600 hover:text-gray-900",
                "data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              )}
            >
              <Heart className="w-4 h-4 mb-1" aria-label="Retreats" />
              <span>Retreats</span>
            </TabsTrigger>

            <TabsTrigger
              value="wedding"
              data-value="wedding"
              className={cn(
                "relative flex flex-col items-center justify-center px-4 py-3 text-sm font-medium transition-colors duration-200",
                "bg-transparent border-0 rounded-none shadow-none",
                "text-gray-600 hover:text-gray-900",
                "data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              )}
            >
              <Users className="w-4 h-4 mb-1" aria-label="Wedding" />
              <span>Wedding</span>
            </TabsTrigger>

            <TabsTrigger
              value="family"
              data-value="family"
              className={cn(
                "relative flex flex-col items-center justify-center px-4 py-3 text-sm font-medium transition-colors duration-200",
                "bg-transparent border-0 rounded-none shadow-none",
                "text-gray-600 hover:text-gray-900",
                "data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              )}
            >
              <Home className="w-4 h-4 mb-1" aria-label="Family" />
              <span>Family</span>
            </TabsTrigger>

            <TabsTrigger
              value="mountain"
              data-value="mountain"
              className={cn(
                "relative flex flex-col items-center justify-center px-4 py-3 text-sm font-medium transition-colors duration-200",
                "bg-transparent border-0 rounded-none shadow-none",
                "text-gray-600 hover:text-gray-900",
                "data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              )}
            >
              <Mountain className="w-4 h-4 mb-1" aria-label="Mountain" />
              <span>Mountain</span>
            </TabsTrigger>

            <TabsTrigger
              value="beach"
              data-value="beach"
              className={cn(
                "relative flex flex-col items-center justify-center px-4 py-3 text-sm font-medium transition-colors duration-200",
                "bg-transparent border-0 rounded-none shadow-none",
                "text-gray-600 hover:text-gray-900",
                "data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              )}
            >
              <Waves className="w-4 h-4 mb-1" aria-label="Beach" />
              <span>Beach</span>
            </TabsTrigger>
          </TabsList>

          {/* Sliding indicator */}
          <div
            className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
            }}
          />
        </div>

        {/* Tab Contents */}
        {[
          { value: "retreats", content: VillaTypeTabsContent.retreats },
          { value: "wedding", content: VillaTypeTabsContent.wedding },
          { value: "family", content: VillaTypeTabsContent.family },
          { value: "mountain", content: VillaTypeTabsContent.mountain },
          { value: "beach", content: VillaTypeTabsContent.beach },
        ].map(({ value, content }) => (
          <TabsContent
            key={value}
            value={value}
            className="space-y-4 mt-6 animate-in fade-in-0 slide-in-from-bottom-1 duration-200"
          >
            {content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default VillaTypeTabs;
