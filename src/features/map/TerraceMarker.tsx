// components/Map/TerraceMarker.tsx
import mapboxgl from "mapbox-gl";
import type { Terrace } from "../../types/TerraceType";

type Props = {
  terrace: Terrace;
  map: mapboxgl.Map;
  isFavorite?: boolean;
};

const TerraceMarker = ({ terrace, map, isFavorite }: Props) => {
  // Crea el contenidor del marcador
  const el = document.createElement("div");

  if (isFavorite) {
    const heartIcon = document.createElement("div");
    heartIcon.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="red" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
      2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 
      3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
      6.86-8.55 11.54L12 21.35z"/>
  </svg>
`; el.appendChild(heartIcon);
  } else {
    const img = document.createElement("img");
    img.src = "/bg-transp-logo-siya 1.svg";
    img.alt = terrace.business_name;
    img.style.width = "30px";
    img.style.height = "30px";
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