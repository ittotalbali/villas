import type { Villa } from "@/lib/api/hooks/villas";
import { cn, formatPrice } from "@/lib/utils";
import { useState } from "react";

type props = {
  villa: Villa;
  onClose: () => void;
};

const MarkerCard = ({ villa, onClose }: props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev >= (villa.albums?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev <= 0 ? (villa.albums?.length || 1) - 1 : prev - 1
    );
  };

  const getAccommodationType = (type: string | null) => {
    if (!type) return "Accommodation";
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div
      className={cn(
        "absolute top-4 right-4 w-[360px] max-w-[80%] bg-white rounded-xl shadow-lg z-[1000] overflow-hidden villa-card"
      )}
    >
      <div className="flex flex-col">
        <div className="relative h-[200px] overflow-hidden">
          {villa.albums && villa.albums.length > 0 ? (
            <>
              <img
                src={villa.albums[currentImageIndex]?.image_url || ""}
                alt={villa.code || "Villa"}
                className="w-full h-full object-cover"
              />
              {villa.albums.length > 1 && (
                <>
                  <button
                    className="absolute top-1/2 left-2.5 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border-none shadow-md flex items-center justify-center cursor-pointer z-10 hover:bg-white"
                    onClick={prevImage}
                  >
                    ‹
                  </button>
                  <button
                    className="absolute top-1/2 right-2.5 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border-none shadow-md flex items-center justify-center cursor-pointer z-10 hover:bg-white"
                    onClick={nextImage}
                  >
                    ›
                  </button>
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {villa.albums.map((_, index) => (
                      <button
                        key={index}
                        className={cn(
                          "w-1.5 h-1.5 rounded-full bg-white/60 border-none cursor-pointer",
                          index === currentImageIndex && "bg-white scale-125"
                        )}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">
              <span>No Image Available</span>
            </div>
          )}
          <button
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white border-none shadow-md flex items-center justify-center cursor-pointer text-lg"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="m-0 text-lg font-semibold text-gray-900">
              {villa.code || "Unnamed Villa"}
            </h3>
            {villa.base_rate && (
              <div className="flex items-baseline whitespace-nowrap">
                <span className="font-semibold text-gray-900">
                  {villa.base_rate_currency}{" "}
                  {formatPrice(
                    Number(villa.base_rate),
                    villa.base_rate_currency || "USD"
                  )}
                </span>
                <span className="text-sm text-gray-500 ml-1">night</span>
              </div>
            )}
          </div>
          <div className="flex items-center flex-wrap mb-3 text-sm text-gray-500">
            <span className="font-medium">
              {getAccommodationType(villa.type_of_accommodation)}
            </span>
            {villa.area && <span className="mx-1">·</span>}
            <span>{villa.area}</span>
            {villa.location && <span className="mx-1">·</span>}
            <span>{villa.location}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {villa.total_bedroom && (
              <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                {villa.total_bedroom}{" "}
                {villa.total_bedroom === 1 ? "bedroom" : "bedrooms"}
              </span>
            )}
            {villa.total_bathroom && (
              <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                {villa.total_bathroom}{" "}
                {villa.total_bathroom === 1 ? "bathroom" : "bathrooms"}
              </span>
            )}
            {villa.wedding_villa?.seated_guests && (
              <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                Up to {villa.wedding_villa.seated_guests} guests
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkerCard;
