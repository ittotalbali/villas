import type { LeafletEventHandlerFn } from "leaflet";
import { useMapEvents } from "react-leaflet";

export const measureTextWidth = (
  text: string,
  font: string = "600 12px Arial"
): number => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  ctx.font = font;
  return ctx.measureText(text).width;
};

type MapEventsProps = {
  onMove: (center: L.LatLng, zoom: number) => void;
  onDragStartEvent?: LeafletEventHandlerFn; // optional is better than forcing `undefined`
};

export function MapEvents({ onMove, onDragStartEvent }: MapEventsProps) {
  useMapEvents({
    moveend: (e) => {
      const map = e.target;
      onMove(map.getCenter(), map.getZoom());
    },
    zoomend: (e) => {
      const map = e.target;
      onMove(map.getCenter(), map.getZoom());
    },
    dragstart: onDragStartEvent,
  });
  return null;
}
