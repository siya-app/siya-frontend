import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useUserLocation } from "../../hooks/useUserLocation";

import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const { location, loading, error } = useUserLocation();

  useEffect(() => {
    if (!mapContainerRef.current || loading || !location) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [location.longitude, location.latitude],
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 16,
    });

    return () => {
      mapRef.current?.remove();
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
