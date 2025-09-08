import L from "leaflet";
import { measureTextWidth } from "./utils";

export function getMarkerColor(total_bedroom: number): string {
  const beds = Number(total_bedroom) || 0;

  if (beds <= 3) {
    return "#4B6587";
  } else if (beds === 4) {
    return "#6A89CC";
  } else if (beds === 5) {
    return "#2D98DA";
  } else if (beds === 6) {
    return "#45A29E";
  } else if (beds === 7) {
    return "#0A79DF";
  } else if (beds === 8) {
    return "#3B3B98";
  } else if (beds === 9) {
    return "#2C3A47";
  } else if (beds === 10) {
    return "#3742FA";
  } else if (beds === 11) {
    return "#706FD3";
  } else if (beds === 12) {
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
  const textColor = "#ffffff";

  const animationId = `bounce-${Math.random().toString(36).substr(2, 9)}`;
  const yOffset = 20;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="80" viewBox="0 0 24 56" overflow="visible">

      
      <defs>
        <linearGradient id="grad1-${animationId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${markerColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#75c5f0;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <g class="marker-bounce" transform-origin="12 ${10 + yOffset + 26}">
        ${
          isActive
            ? `
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          values="0,0; 0,-16; 0,0; 0,-8; 0,0"
          dur="1.2s"
          repeatCount="indefinite"
        />
        `
            : ""
        }
        
        ${
          isActive
            ? `
        <circle cx="12" cy="${10 + yOffset}" r="12" 
                fill="none" 
                stroke="${markerColor}" 
                stroke-width="2" 
                opacity="0.4">
          <animate attributeName="r" 
                   values="12;18;12" 
                   dur="1.2s" 
                   repeatCount="indefinite"/>
          <animate attributeName="opacity" 
                   values="0.4;0;0.4" 
                   dur="1.2s" 
                   repeatCount="indefinite"/>
        </circle>
        `
            : ""
        }
        
        <!-- Main marker path -->
        <path d="M21 ${10 + yOffset}c0 6.627-9 13-9 13S3 ${
    16.627 + yOffset
  } 3 ${10 + yOffset}a9 9 0 1 1 18 0z" 
              fill="url(#grad1-${animationId})"
              transform="scale(${isActive ? 1 : 1})"/>
              
        <circle cx="12" cy="${10 + yOffset}" r="7" fill="${markerColor}"/>
        
        <text x="12" y="${10 + yOffset}" 
              text-anchor="middle" 
              font-size="8" 
              fill="${textColor}" 
              font-family="Verdana" 
              font-weight="700" 
              dy=".35em">
          ${totalBedroom}
        </text>
      </g>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: `marker-icon-bedroom ${isActive ? "active" : ""}`,
    iconSize: [40, 90],
    // Try different anchor points:
    iconAnchor: [20, 56], // Try this instead of [20, 85]
    popupAnchor: [0, -56],
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
