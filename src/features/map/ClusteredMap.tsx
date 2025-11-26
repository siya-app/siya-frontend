import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useUserLocation } from "../../hooks/useUserLocation";
import { fetchTerraces } from "../../services/fetchTerraces";
import { useTerraceClusters } from "../../hooks/useTerraceClusters";
import type { CustomTerraceType } from "../../types/zod/customTerrace-schema";
import useFavorites from "../../hooks/useFavorites";
import TerraceMarker from "./TerraceMarker";

const ClusteredMap = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { location, loading, error } = useUserLocation();
  const [terraces, setTerraces] = useState<CustomTerraceType[]>([]);
  const [bounds, setBounds] = useState<mapboxgl.LngLatBoundsLike | null>(null);
  const [zoom, setZoom] = useState(16);
  const { isFavorite } = useFavorites();

  useEffect(() => {
    fetchTerraces().then(setTerraces);
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || !location || loading) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [location.longitude, location.latitude],
      style: "mapbox://styles/mapbox/light-v10",
      zoom: 16,
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-left");

    new mapboxgl.Marker({ color: "#d00" })
      .setPopup(new mapboxgl.Popup().setHTML("<h3>La teva ubicació</h3>"))
      .setLngLat([location.longitude, location.latitude])
      .addTo(map);

    map.on("moveend", () => {
      const bounds = map.getBounds();
      if (bounds) {
        setBounds(bounds.toArray());
      }
      setZoom(map.getZoom());
    });

    const bounds = map.getBounds();
    if (bounds) {
      setBounds(bounds.toArray());
    }
    setZoom(map.getZoom());

    return () => map.remove();
  }, [location, loading]);

  const clusters = useTerraceClusters({ terraces, bounds, zoom });

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const markerEls: mapboxgl.Marker[] = [];
    clusters.forEach((cluster) => {
      const [lng, lat] = cluster.geometry.coordinates;

      if ("cluster" in cluster.properties) {
        const el = document.createElement("div");
        el.className = "cluster-marker";
        el.style.width = "40px";
        el.style.height = "40px";
        el.style.borderRadius = "50%";
        el.style.backgroundColor = "#ff1818";
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";
        el.style.color = "white";
        el.style.fontWeight = "bold";
        el.innerText = cluster.properties.point_count.toString();

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([lng, lat])
          .addTo(map);

        el.addEventListener("click", () => {
          map.easeTo({
            center: [lng, lat],
            zoom: zoom + 2,
          });
        });

        markerEls.push(marker);
      } else {
        const id = cluster.properties.id;
        const terrace = terraces.find((t) => t.id === id);
        if (terrace) {
          TerraceMarker({
            terrace,
            map,
            isFavorite: terrace.id ? isFavorite(terrace.id) : false,
            navigate,
          });
        }
      }
    });

    return () => {
      markerEls.forEach((marker) => marker.remove());
    };
  }, [clusters, terraces, isFavorite, zoom, navigate]);

  if (loading) return <p>Carregant mapa…</p>;
  if (error) return <p>Error: {error}</p>;

  return <div ref={mapContainerRef} className="h-80 w-full" />;
};

export default ClusteredMap;
