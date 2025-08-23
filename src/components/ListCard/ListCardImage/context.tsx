import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";

interface ContextProps {
  emblaRef: (emblaRoot: HTMLDivElement) => void;
  emblaApi: EmblaCarouselType | undefined;
  selectedIndex: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  totalSlides: number;
}

const Context = createContext<ContextProps | undefined>(undefined);

export const ListCardImageContextProvider = ({
  children,
  totalImages = 0,
}: {
  children: React.ReactNode;
  totalImages?: number;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <Context.Provider
      value={{
        emblaRef,
        emblaApi,
        selectedIndex,
        canScrollPrev,
        canScrollNext,
        scrollPrev,
        scrollNext,
        scrollTo,
        totalSlides: totalImages,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useListCardImageContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useListCardImageContext must be used within ListCardImageContextProvider"
    );
  }

  return context;
};
