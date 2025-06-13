// components/Map/TerraceMarker.tsx
import mapboxgl from "mapbox-gl";
import { Heart } from "lucide-react";
import type { Terrace } from "../../types/TerraceType";

type Props = {
  terrace: Terrace;
  map: mapboxgl.Map;
  isFavorite?: boolean; // Pots passar-ho quan tinguis aquesta info
};

const TerraceMarker = ({ terrace, map, isFavorite = false }: Props) => {
  const el = document.createElement("div");

  if (isFavorite) {
    // ❤️ marcador amb icona (Heart) via SVG
    const heartIcon = document.createElement("div");
    heartIcon.innerHTML = Heart.toString(); // converteix el component a SVG
    heartIcon.style.width = "50px";
    heartIcon.style.height = "50px";
    heartIcon.style.color = "red"; // o fes servir Tailwind per classList
    el.appendChild(heartIcon);
  } else {
    // 🧭 marcador per defecte amb el logo
    const img = document.createElement("img");
    img.src = "/bg-transp-logo-siya 1.svg";
    img.alt = terrace.business_name;
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.objectFit = "contain";
    el.appendChild(img);
  }

  new mapboxgl.Marker({ element: el })
    .setLngLat([terrace.longitude, terrace.latitude])
    .setPopup(
      new mapboxgl.Popup().setHTML(`
        <strong>${terrace.business_name}</strong>
        <p>${terrace.address}</p>
      `)
    )
    .addTo(map);

  return null;
};

export default TerraceMarker;
