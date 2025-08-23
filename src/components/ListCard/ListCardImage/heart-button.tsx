const HeartButton = () => {
  return (
    <button
      className="absolute top-3 right-3 w-7 h-7 rounded-full bg-transparent hover:bg-white/10 border-none flex items-center justify-center transition-colors duration-200 z-10"
      onClick={(e) => e.stopPropagation()}
      aria-label="Add to favorites"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 drop-shadow-sm"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
};

export default HeartButton;
