// components/Map/TerraceMarker.tsx
import mapboxgl from "mapbox-gl";
import { Heart } from "lucide-react";
// import type { Terrace } from "../../types/TerraceType";
import type { CustomTerraceType } from "../../types/zod/customTerrace-schema";

type Props = {
  terrace: CustomTerraceType;
  map: mapboxgl.Map;
  isFavorite?: boolean; // Pots passar-ho quan tinguis aquesta info
};

const TerraceMarker = ({ terrace, map, isFavorite = false }: Props) => {
  // Crea el contenidor del marcador
  const el = document.createElement("div");

  if (isFavorite) {
    const heartIcon = document.createElement("div");
    heartIcon.innerHTML = Heart.toString();
    heartIcon.style.width = "50px";
    heartIcon.style.height = "50px";
    heartIcon.style.color = "red";
    el.appendChild(heartIcon);
  } else {
    const img = document.createElement("img");
    img.src = "/bg-transp-logo-siya 1.svg";
    img.alt = terrace.business_name;
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.objectFit = "contain";
    el.appendChild(img);
  }

  // Crea el contingut del popup com a element HTML (no string)
  const popupDiv = document.createElement("div");
  popupDiv.innerHTML = `
    <strong>${terrace.business_name}</strong>
    <p>${terrace.address}</p>
    <button id="view-${terrace.id}" class="text-sm text-blue-500 underline">Veure detalls terrassa</button>
  `;

  const popup = new mapboxgl.Popup().setDOMContent(popupDiv);

  // Afegeix el listener al botó un cop el popup s'ha afegit al DOM
  popup.on("open", () => {
    const button = document.getElementById(`view-${terrace.id}`);
    if (button) {
      button.addEventListener("click", () => {
        window.location.href = `/terrassa/${terrace.id}`;
      });
    }
  });

  // Afegeix el marcador al mapa
  new mapboxgl.Marker({ element: el })
    .setLngLat([terrace.longitude, terrace.latitude])
    .setPopup(popup)
    .addTo(map);

  return null; // No cal renderitzar res en el DOM de React
};

export default TerraceMarker;