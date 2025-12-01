import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useUserLocation } from "../../hooks/useUserLocation";
import TerraceMarker from "./TerraceMarker";
import "mapbox-gl/dist/mapbox-gl.css";
import type { CustomTerraceType } from "../../types/zod/customTerrace-schema";
import Spinner from "../../components/Spinner";

interface MapProps {
  terraces: CustomTerraceType[];
}

const Map = ({ terraces }: MapProps) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const { location, loading, error } = useUserLocation();

  useEffect(() => {
    if (!mapContainerRef.current || loading || !location) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [location.longitude, location.latitude],
      style: "mapbox://styles/mapbox/light-v10",
      zoom: 15,
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-left');


    new mapboxgl.Marker({ color: 'siya-red', rotation: 15, scale: 1.2 })
      .setPopup(new mapboxgl.Popup().setHTML("<h3>La teva ubicació</h3>"))
      .setLngLat([location.longitude, location.latitude])
      .addTo(map);

    const loadedTerraces: CustomTerraceType[] = terraces;
    loadedTerraces.forEach((terrace) => {
      if (terrace.latitude && terrace.longitude) {
        TerraceMarker({ terrace, map });
      }
    });

    return () => {
      map?.remove();
    };
  }, [location, loading, terraces]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const previousMarkers = mapContainerRef.current?.querySelectorAll('.terrace-marker') || [];
    previousMarkers.forEach((el) => el.remove());

    terraces.forEach((terrace) => {
      if (terrace.latitude && terrace.longitude) {
        TerraceMarker({ terrace, map });
      }
    });
  }, [terraces]);

  if (loading) return <p><Spinner /></p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div ref={mapContainerRef} className="w-3/4 aspect-square" />
    </>
  );
};

export default Map;
