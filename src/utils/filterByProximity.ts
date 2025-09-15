import type { UserLocationContextType } from "../context/UserLocationContext";
import type { CustomTerraceType } from "../types/zod/customTerrace-schema";

interface FilterByProximityProps {
    maxDistance: number;
    terraces: CustomTerraceType[];
    location: UserLocationContextType["location"];
    calculateDistance: (
        userLat: number,
        userLng: number,
        terraceLat: number,
        terraceLng: number
    ) => number;
}

export const filterByProximity = ({
    maxDistance,
    terraces,
    location,
    calculateDistance,
}: FilterByProximityProps): CustomTerraceType[] => {
    if (!location) return terraces;

    return terraces
        .map((terrace) => ({
            ...terrace,
            distance: calculateDistance(
                location.latitude,
                location.longitude,
                terrace.latitude,
                terrace.longitude
            ),
        }))
        .filter((terrace) => terrace.distance <= maxDistance)
        .sort((a, b) => a.distance - b.distance);
};