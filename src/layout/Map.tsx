import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { getUserLocation } from "../services/getUserLocation";

import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";

const Map = () => {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const [userLocation, setUserLocation] = useState<{
        longitude: number;
        latitude: number;
    } | null>(null);

    useEffect(() => {
        getUserLocation().then((location) => {
            
                setUserLocation({
                    longitude: location.longitude,
                    latitude: location.latitude,
                });
            
        });
    }, []);

    useEffect(() => {
        if (!mapContainerRef.current) return;
        mapboxgl.accessToken =
            import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
            
        // Initialize the map only if userLocation is available
        if (userLocation) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                center: [userLocation.longitude, userLocation.latitude], // Initial center based on user's location
                style: "mapbox://styles/mapbox/streets-v11", // Map style
                zoom: 16, // Initial zoom level
            });
        } else {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                center: [0, 0], // Default center
                style: "mapbox://styles/mapbox/streets-v11", // Map style
                zoom: 2, // Default zoom level
            });
        }

        return () => {
            mapRef.current?.remove();
        };
    }, [userLocation]);

    return (
        <div
            id="map-container"
            ref={mapContainerRef}
            className="bg-siya-dark-green h-80"
        ></div>
    );
};

export default Map;
