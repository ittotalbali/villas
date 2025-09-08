import { useMap, MapContainer, TileLayer, Marker } from "react-leaflet";
import { MapEvents } from "./utils";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import type { Villa } from "@/lib/api/hooks/villas";
import { useHomeContext } from "../../contexts/context";
import { getMarkerIcon2 } from "./MarkerIcon";
import { useEffect, useRef, useCallback } from "react";
import { useVillaFilterStore } from "@/lib/store/filterStore";

type Props = {
  testid?: string;
  className?: string;
  style?: CSSProperties;
  villas: Villa[];
  // Add a prop to trigger resize when container size changes
  containerKey?: string | number;
};

const MapContent = ({
  villas,
  containerKey,
}: {
  villas: Villa[];
  containerKey?: string | number;
}) => {
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
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      const currentCenter = map.getCenter();
      map.invalidateSize({ animate: false });

      map.panTo([currentCenter.lat, currentCenter.lng], { animate: false });
    }, 100);
  }, [map]);

  useEffect(() => {
    if (containerKey !== undefined) {
      handleResize();
    }
  }, [containerKey, handleResize]);

  useEffect(() => {
    const container = map.getContainer();
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [map, handleResize]);

  useEffect(() => {
    if (center && zoom && !isNaN(center[0]) && !isNaN(center[1])) {
      const currentCenter = map.getCenter();
      const currentZoom = map.getZoom();

      const latDiff = Math.abs(currentCenter.lat - center[0]);
      const lngDiff = Math.abs(currentCenter.lng - center[1]);
      const zoomDiff = Math.abs(currentZoom - zoom);

      if (latDiff > 0.000001 || lngDiff > 0.000001 || zoomDiff > 0.1) {
        map.flyTo(center, zoom);
      }
    }
  }, [center, zoom, map]);

  return (
    <>
      <TileLayer
        className="w-full"
        attribution='&copy; <a href="https://totalbali.com/">Total Bali</a> | &copy; Google'
        // url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
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
        onDragStartEvent={() => {
          setFilters({
            ...filters,
            location_id: undefined,
            sub_location_id: undefined,
            area_id: undefined,
          });
        }}
      />
      {villas.map((villa) => {
        if (!villa.latitude || !villa.longitude) return null;
        const lat = parseFloat(villa.latitude);
        const lng = parseFloat(villa.longitude);
        const isActive = hoveredVilla === villa.id;
        return (
          <Marker
            key={villa.id}
            position={[lat, lng]}
            icon={getMarkerIcon2(villa.total_bedroom!, isActive)}
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

const Map = ({ style, villas, className, containerKey }: Props) => {
  const { zoom, center } = useHomeContext();

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={cn("w-full h-full", className)}
      style={style}
    >
      <MapContent villas={villas} containerKey={containerKey} />
    </MapContainer>
  );
};

export default Map;
