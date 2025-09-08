import { useListCardContext } from "../context";
import HeartButton from "./heart-button";
import NavigationArrows from "./navigation-arrows";
import { ListCardImageContextProvider } from "./context";
import Dots from "./dots";
import { default as Image } from "./image";
import { default as NoImage } from "./no-image";
import ActionButton from "./action-button";
import { cn } from "@/lib/utils";

const ListCardImage = () => {
  const { villa, forMap } = useListCardContext();

  const totalImages = villa.albums?.length || 0;
  const shouldShowDots = totalImages > 1;
  const shouldShowArrows = totalImages > 1;

  return (
    <ListCardImageContextProvider totalImages={totalImages}>
      <div
        className={cn(
          "relative w-full aspect-square overflow-hidden  mb-3 group",
          forMap ? "rounded-t-xl" : "rounded-xl"
        )}
      >
        {totalImages > 0 ? (
          <div className="relative w-full h-[calc(100%)]">
            <Image />

            {shouldShowArrows && (
              <>
                <NavigationArrows arrow="left" />
                <NavigationArrows arrow="right" />
              </>
            )}

            {forMap ? <ActionButton /> : <HeartButton />}

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
