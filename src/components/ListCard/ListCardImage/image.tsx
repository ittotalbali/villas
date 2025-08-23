import { useListCardContext } from "../context";
import { useListCardImageContext } from "./context";

const ListCardImage = () => {
  const { villa } = useListCardContext();
  const { emblaRef } = useListCardImageContext();

  return (
    <div className="overflow-hidden w-full h-full" ref={emblaRef}>
      <div className="flex h-full">
        {villa.albums.map((album, index) => (
          <div key={index} className="flex-[0_0_100%] min-w-0 h-full">
            <img
              src={album.image_url || ""}
              alt={villa.code || "Villa"}
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCardImage;
