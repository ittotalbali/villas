import type { Villa } from "@/lib/api/hooks/villas";
import { cn } from "@/lib/utils";
import React, { useCallback, useRef } from "react";
import { ListCardContextProvider } from "./context";
import { default as Image } from "./ListCardImage";
import { default as Content } from "./ListCardContent";

type props = {
  villa: Villa;
  forMap?: boolean;
  handleCloseCard: () => void;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const ListCard = ({
  villa,
  forMap = false,
  handleCloseCard,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: props) => {
  if (!villa) {
    return (
      <div className="flex flex-col rounded-xl overflow-hidden bg-white">
        No villa data
      </div>
    );
  }

  const isHoveringRef = useRef(false);

  const handleMouseEnter = useCallback(
    (_: React.MouseEvent) => {
      isHoveringRef.current = true;
      onMouseEnter();
    },
    [onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (_: React.MouseEvent) => {
      isHoveringRef.current = false;
      onMouseLeave();
    },
    [onMouseLeave]
  );

  // Add a touch event for mobile to make it more responsive
  const handleTouchStart = useCallback(
    (_: React.TouchEvent) => {
      isHoveringRef.current = true;
      onMouseEnter();
    },
    [onMouseEnter]
  );

  const handleTouchEnd = useCallback(
    (_: React.TouchEvent) => {
      isHoveringRef.current = false;
      onMouseLeave();
    },
    [onMouseLeave]
  );

  return (
    <ListCardContextProvider
      villa={villa}
      forMap={forMap}
      handleCloseCard={handleCloseCard}
    >
      <div
        className={cn(
          "group flex flex-col bg-white cursor-pointer transition-all duration-200",
          // isSelected && "ring-2 ring-black ring-offset-2",
          "hover:scale-[1.02] hover:shadow-lg",
          forMap &&
            "absolute top-4 right-4 z-[1000] w-[360px] max-w-[70%] lg:max-w-[50%] villa-card h-[350px]"
        )}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image Container */}
        <Image />

        {/* Content */}
        <Content />
      </div>
    </ListCardContextProvider>
  );
};

export default ListCard;
