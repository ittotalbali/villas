const ListCardNoImage = () => {
  return (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-medium rounded-xl">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8 mb-2"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
      <div>No Image</div>
    </div>
  );
};

export default ListCardNoImage;
