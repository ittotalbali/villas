import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Heart, Home, Mountain, Users, Waves } from "lucide-react";
import { useFilterContext } from "../context";
import { useMemo } from "react";
import RetreatsCheckbox from "../Checkboxes/retreats";
import FamiliyCheckbox from "../Checkboxes/family";
import MountainCheckbox from "../Checkboxes/mountain";
import BeachCheckbox from "../Checkboxes/beach";
import StandingGuestInput from "../Inputs/standing.guests";
import SeatedGuestsInput from "../Inputs/seated.guests";
import WeddingCheckbox from "../Checkboxes/wedding";

type Props = {
  testid?: string;
};

const VillaTypeTabs = ({}: Props) => {
  const { activeTab, setActiveTab, draftFilters, updateDraftVillaTypeFilter } =
    useFilterContext();

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
            <RetreatsCheckbox key={key} label={label} />
          ))}
        </div>
      ),
      family: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {familyOptions.map(({ key, label }) => (
            <FamiliyCheckbox key={key} label={label} />
          ))}
        </div>
      ),
      mountain: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mountainOptions.map(({ key, label }) => (
            <MountainCheckbox key={key} label={label} />
          ))}
        </div>
      ),
      beach: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {beachOptions.map(({ key, label }) => (
            <BeachCheckbox key={key} label={label} />
          ))}
        </div>
      ),
      wedding: (
        <div className="space-y-4">
          {/* Guest Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StandingGuestInput />
            <SeatedGuestsInput />
          </div>

          {/* Wedding Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {weddingFeatures.map(({ key, label }) => (
              <WeddingCheckbox key={key} label={label} />
            ))}
          </div>
        </div>
      ),
    };
  }, [draftFilters, updateDraftVillaTypeFilter]);

  return (
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
        <TabsContent value="retreats" className="space-y-4 mt-7">
          {VillaTypeTabsContent.retreats}
        </TabsContent>

        {/* Wedding Villa */}
        <TabsContent value="wedding" className="space-y-4 mt-7">
          {VillaTypeTabsContent.wedding}
        </TabsContent>

        {/* Family Villa */}
        <TabsContent value="family" className="space-y-4 mt-7">
          {VillaTypeTabsContent.family}
        </TabsContent>

        {/* Mountain Villa */}
        <TabsContent value="mountain" className="space-y-4 mt-7">
          {VillaTypeTabsContent.mountain}
        </TabsContent>

        {/* Beach Villa */}
        <TabsContent value="beach" className="space-y-4 mt-7">
          {VillaTypeTabsContent.beach}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VillaTypeTabs;
