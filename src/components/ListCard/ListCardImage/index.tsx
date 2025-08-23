import { useListCardContext } from "../context";
import HeartButton from "./heart-button";
import NavigationArrows from "./navigation-arrows";
import { ListCardImageContextProvider } from "./context";
import Dots from "./dots";
import { default as Image } from "./image";
import { default as NoImage } from "./no-image";

const ListCardImage = () => {
  const { villa } = useListCardContext();

  const totalImages = villa.albums?.length || 0;
  const shouldShowDots = totalImages > 1;
  const shouldShowArrows = totalImages > 1;

  return (
    <ListCardImageContextProvider totalImages={totalImages}>
      <div className="relative w-full aspect-square overflow-hidden rounded-xl mb-3 group">
        {totalImages > 0 ? (
          <div className="relative w-full h-[calc(100%)]">
            <Image />

            {shouldShowArrows && (
              <>
                <NavigationArrows arrow="left" />
                <NavigationArrows arrow="right" />
              </>
            )}

            <HeartButton />

            {shouldShowDots && <Dots />}
          </div>
        ) : (
          <NoImage />
        )}
      </div>
    </ListCardImageContextProvider>
  );
};

export default ListCardImage;
