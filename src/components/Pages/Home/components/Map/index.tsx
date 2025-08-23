import { useMap, MapContainer, TileLayer, Marker } from "react-leaflet";
import { MapEvents } from "./utils";
import type { CSSProperties } from "react";
import { cn, formatPrice } from "@/lib/utils";
import type { Villa } from "@/lib/api/hooks/villas";
import { useHomeContext } from "../../contexts/context";
import { getMarkerIcon } from "./MarkerIcon";
import { useEffect } from "react";
import { useVillaFilterStore } from "@/lib/store/filterStore";

type Props = {
  testid?: string;
  className?: string;
  style?: CSSProperties;
  villas: Villa[];
};

const MapContent = ({ villas }: { villas: Villa[] }) => {
  const map = useMap();
  const {
    center,
    zoom,
    setCenter,
    setZoom,
    setSearchParams,
    markerRefs,
    hoveredVilla,
    handleMarkerClick,
  } = useHomeContext();
  const { setFilters, filters } = useVillaFilterStore();

  // Update map view when center or zoom changes
  useEffect(() => {
    if (center && zoom) {
      const currentCenter = map.getCenter();
      const currentZoom = map.getZoom();

      if (
        currentCenter.lat.toFixed(6) !== center[0].toFixed(6) ||
        currentCenter.lng.toFixed(6) !== center[1].toFixed(6) ||
        currentZoom !== zoom
      ) {
        map.flyTo(center, zoom);
      }
    }
  }, [center, zoom, map]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://totalbali.com/">Total Bali</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents
        onMove={(c, z) => {
          setCenter([c.lat, c.lng]);
          setZoom(z);
          setSearchParams({
            lat: c.lat.toFixed(6),
            lng: c.lng.toFixed(6),
            zoom: String(z),
          });
        }}
        onDragStartEvent={(_) => {
          setFilters({
            ...filters,
            location_id: undefined,
            sub_location_id: undefined,
          });
        }}
      />
      {villas.map((villa) => {
        if (!villa.latitude || !villa.longitude) return null;
        const lat = parseFloat(villa.latitude);
        const lng = parseFloat(villa.longitude);
        const priceLabel =
          villa.base_rate && villa.base_rate_currency
            ? `${villa.base_rate_currency} ${formatPrice(
                Number(villa.base_rate),
                villa.base_rate_currency
              )}`
            : "-";
        const isActive = hoveredVilla === villa.id;
        return (
          <Marker
            key={villa.id}
            position={[lat, lng]}
            icon={getMarkerIcon(priceLabel, isActive)}
            ref={(ref) => {
              if (ref) markerRefs.current[villa.id] = ref;
            }}
            eventHandlers={{
              click: () => handleMarkerClick(villa.id),
            }}
          />
        );
      })}
    </>
  );
};

const Map = ({ style, villas, className }: Props) => {
  const { zoom, center } = useHomeContext();

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={cn("w-full h-full", className)}
      style={style}
    >
      <MapContent villas={villas} />
    </MapContainer>
  );
};

export default Map;
