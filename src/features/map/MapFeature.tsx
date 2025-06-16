import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useUserLocation } from "../../hooks/useUserLocation";
import { fetchTerraces } from "../../services/fetchTerraces";
import type { Terrace } from "../../types/TerraceType";
import TerraceMarker from "./TerraceMarker";

import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const { location, loading, error } = useUserLocation();
  const [terraces, setTerraces] = useState<Terrace[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || loading || !location) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [location.longitude, location.latitude],
      style: "mapbox://styles/mapbox/light-v10",
      zoom: 16,
    });

    mapRef.current = map;

    new mapboxgl.Marker({ color: 'siya-red', rotation: 15, scale: 1.2 })
      .setPopup(new mapboxgl.Popup().setHTML("<h3>La teva ubicació</h3>"))
      .setLngLat([location.longitude, location.latitude])
      .addTo(map);
    
      // Carreguem les terrasses i afegim marcadors
  fetchTerraces().then((data) => {
    setTerraces(data);

    data.forEach((terrace) => {
      if (terrace.latitude && terrace.longitude) {
        const isFavorite = false; // Aquí més endavant pots afegir la lògica
        TerraceMarker({ terrace, map, isFavorite });
      }
    });
  });

    return () => {
      map?.remove();
    };
  }, [location, loading]);

  if (loading) return <p>Carregant mapa…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="bg-[rgba(47,68,90,0.34)] text-white px-2 relative top-0 left-0 m-3 rounded">un div dins el map(hauria de ser transparent no lo consigo)</div>
      <div ref={mapContainerRef} className="h-80" />
    </>
  );
};

export default Map;
