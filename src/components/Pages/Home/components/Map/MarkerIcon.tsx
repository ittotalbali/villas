import L from "leaflet";
import { measureTextWidth } from "./utils";

export function getMarkerColor(total_bedroom: number): string {
  if (total_bedroom <= 3) {
    return "#4B6584";
  } else if (total_bedroom === 4) {
    return "#6A89CC";
  } else if (total_bedroom === 5) {
    return "#2D98DA";
  } else if (total_bedroom === 6) {
    return "#45A29E";
  } else if (total_bedroom === 7) {
    return "#0A79DF";
  } else if (total_bedroom === 8) {
    return "#3B3B98";
  } else if (total_bedroom === 9) {
    return "#2C3A47";
  } else if (total_bedroom === 10) {
    return "#3742FA";
  } else if (total_bedroom === 11) {
    return "#706FD3";
  } else if (total_bedroom === 12) {
    return "#30336B";
  } else {
    return "#130F40";
  }
}

export function getMarkerIcon2(
  totalBedroom: number,
  isActive: boolean = false
) {
  const markerColor = getMarkerColor(totalBedroom);
  const scale = isActive ? 1.1 : 1;
  const textColor = "#ffffff";

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" style="transform: scale(${scale}); transform-origin: center;">

      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${markerColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#75c5f0;stop-opacity:1" />
        </linearGradient>
        <filter id="f1" x="0" y="0">
          <feDropShadow dx="1" dy="1" stdDeviation="2" flood-color="#75c5f0" />
        </filter>
      </defs>
      <path class="${
        isActive ? "active" : ""
      }" d="M21 10c0 6.627-9 13-9 13S3 16.627 3 10a9 9 0 1 1 18 0z" fill="url(#grad1)" filter="url(#f1)"></path>
      <circle cx="12" cy="10" r="7" fill="${markerColor}"></circle>
      <text x="12" y="10" text-anchor="middle" font-size="8" fill="${textColor}" font-family="Verdana" font-weight="300" dy=".35em">${totalBedroom}</text>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: `marker-icon ${isActive ? "active" : ""}`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
}

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
