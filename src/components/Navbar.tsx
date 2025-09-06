import { default as NavbarImage } from "./Navbar/image";
import { default as NavbarNavigations } from "./Navbar/navigations";
import { FilterContextProvider } from "./Filters/context";
import Filters from "./Navbar/filters";

const Navbar = () => {
  return (
    <div className="w-full">
      <nav className="w-full z-[10] bg-white border-b border-gray-200 py-3 px-5 lg:px-6 flex flex-wrap items-center justify-between">
        {/* Headers */}
        <div className="flex justify-between gap-3 w-full lg:flex-row lg:items-center">
          <div className="w-full lg:w-auto">
            <NavbarImage />
          </div>
          <div className="w-full lg:w-full my-auto">
            <NavbarNavigations />
          </div>
        </div>
      </nav>
      <nav className="w-full z-[10] bg-white border-b border-gray-200 py-3 px-5 lg:px-6 flex flex-wrap items-center justify-between">
        {/* Filters */}
        <div className="flex flex-col gap-3 w-full lg:flex-row lg:items-center">
          <FilterContextProvider>
            <Filters />
          </FilterContextProvider>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
