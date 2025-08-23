import L from "leaflet";
import { measureTextWidth } from "./utils";

export function getMarkerIcon(price?: string, isActive: boolean = false) {
  const fillColor = isActive ? "#222222" : "#ffffff";
  const strokeColor = isActive ? "#222222" : "#cccccc";
  const textColor = isActive ? "#ffffff" : "#222222";
  const displayPrice = price ?? "-";
  const scale = isActive ? 1.02 : 1;

  const textWidth = measureTextWidth(displayPrice);
  const padding = 20;
  const boxWidth = Math.max(60, textWidth + padding);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${boxWidth}" height="44" viewBox="0 0 ${boxWidth} 44" style="transform: scale(${scale}); transform-origin: center;">
      <style>
        rect {
          transition: fill 0.3s ease-out, stroke 0.3s ease-out;
        }
        text {
          transition: fill 0.3s ease-out;
        }
        svg {
          transition: transform 0.3s ease-out;
        }
      </style>
      <rect x="2" y="2" rx="14" ry="14" width="${boxWidth - 4}" height="34"
        fill="${fillColor}" stroke="${strokeColor}" stroke-width="1.5"/>
      <text x="${boxWidth / 2}" y="24" text-anchor="middle" font-size="12"
        fill="${textColor}" font-weight="600" font-family="Arial, sans-serif">
        ${displayPrice}
      </text>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: `marker-icon ${isActive ? "active" : ""}`,
    iconSize: [boxWidth, 44],
    iconAnchor: [boxWidth / 2, 44],
    popupAnchor: [0, -44],
  });
}
