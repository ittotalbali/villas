import { default as NavbarImage } from "./Navbar/image";
import { default as NavbarNavigations } from "./Navbar/navigations";
import DesktopFilters from "./Navbar/filters/desktop.filter";
import { cn } from "@/lib/utils";
import { FilterContextProvider } from "./Filters/context";

const Navbar = () => {
  return (
    <div className={cn("w-full")}>
      {/* 1st layer - Sticky navigation */}
      <nav
        className={cn(
          "w-full bg-white border-b border-gray-200 py-3 px-5 lg:px-6 flex flex-wrap items-center justify-between",
          "sticky top-0 z-30" // Removed conflicting z-index and static behavior
        )}
      >
        <div className="flex justify-between w-full lg:flex-row lg:items-center">
          <div className="w-full lg:w-auto">
            <NavbarImage />
          </div>
          <div className="w-full lg:w-full my-auto">
            <FilterContextProvider>
              <NavbarNavigations />
            </FilterContextProvider>
          </div>
        </div>
      </nav>

      {/* 2nd layer - Filters section */}
      <nav className="w-full bg-white border-b border-gray-200 py-3 px-5 lg:px-6 hidden lg:flex flex-wrap items-center justify-between relative z-20">
        {/* Filters */}
        <div className="flex flex-col gap-3 w-full lg:flex-row lg:items-center">
          <FilterContextProvider>
            <DesktopFilters />
          </FilterContextProvider>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
