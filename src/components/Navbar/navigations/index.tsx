import { useState } from "react";
import { Menu, X } from "lucide-react";
import { default as NavbarCurrency } from "../currency";
import Link from "./link";

type Props = {
  testid?: string;
};

const Navigations = ({}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full flex items-center justify-end">
      {/* Hamburger Button for Mobile */}
      <div className="flex justify-end lg:hidden">
        <button
          onClick={toggleMenu}
          className="p-2 focus:outline-none"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Backdrop for Mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } lg:hidden`}
        onClick={toggleMenu}
        aria-hidden="true"
      ></div>

      {/* Mobile Menu (visible when open) */}
      <div
        className={`fixed top-0 right-0 w-full h-screen bg-white z-50 flex flex-col gap-6 p-6 overflow-y-auto transition-transform duration-300 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
        id="mobile-menu"
      >
        <div className="flex justify-end">
          <button
            onClick={toggleMenu}
            className="p-2 focus:outline-none"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <Link text="Home" link="https://totalbali.com" />
          <Link text="Package" link="https://totalbali.com/packages" />
          <Link text="Villas" link="https://totalbali.com/villa/" />
          <Link text="Activities" link="https://totalbali.com/activities" />
          <Link text="Investments" link="https://www.indoinvestments.com" />
          <Link text="Bali on Demand" link="https://baliondemand.com" />
          <Link text="Blog" link="https://www.totalbali.com/blog/" />
          <Link text="Contact" link="https://totalbali.com/contact" />
          <NavbarCurrency />
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-3 justify-center items-center w-full">
        <div className="flex justify-center gap-8 items-center w-full">
          <Link text="Home" link="https://totalbali.com" />
          <Link text="Package" link="https://totalbali.com/packages" />
          <Link text="Villas" link="https://totalbali.com/villa/" />
          <Link text="Activities" link="https://totalbali.com/activities" />
          <Link text="Investments" link="https://www.indoinvestments.com" />
          <Link text="Bali on Demand" link="https://baliondemand.com" />
          <Link text="Blog" link="https://www.totalbali.com/blog/" />
          <Link text="Contact" link="https://totalbali.com/contact" />
        </div>
        <NavbarCurrency />
      </div>
    </div>
  );
};

export default Navigations;
