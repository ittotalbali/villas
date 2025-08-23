import VillaFilterModal from "./Filter";

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-200 py-3 px-5 lg:px-6 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="https://a0.muscache.com/pictures/00f6db5b-d8d9-4e9b-879c-7c681e6114d7.jpg"
          alt="Airbnb Logo"
          className="h-9 mr-5"
        />
        <div className="hidden lg:flex items-center space-x-5">
          <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-full hover:bg-gray-100">
            Penginapan terdekat
          </button>
          <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-full hover:bg-gray-100">
            Minggu mana pun
          </button>

          <VillaFilterModal />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-full hover:bg-gray-100 hidden lg:block">
          Menjadi Tuan Rumah
        </button>
        <button className="flex items-center space-x-2 bg-white border border-gray-300 rounded-full px-3 py-2 hover:shadow-md">
          <img
            src="https://a0.muscache.com/defaults/user_pic-225x225.png?v=3"
            alt="Profile"
            className="w-7 h-7 rounded-full"
          />
          <span className="hidden lg:inline">Bahasa Indonesia (ID)</span>
          <span className="hidden lg:inline">Rp</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
