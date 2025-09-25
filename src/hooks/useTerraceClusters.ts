import Supercluster from "supercluster";
import { useMemo } from "react";
import type { LngLatBoundsLike } from "mapbox-gl";
import type { CustomTerraceType } from "../types/zod/customTerrace-schema";
import useFavorites from "./useFavorites";

// type ClusterPoint = {
//   type: "Feature";
//   properties: {
//     cluster: true;
//     cluster_id: number;
//     point_count: number;
//     point_count_abbreviated: string | number;
//   };
//   geometry: {
//     type: "Point";
//     coordinates: [number, number];
//   };
// };

type IndividualPoint = {
  type: "Feature";
  properties: {
    id: string | undefined;
    business_name: string;
    address: string;
    isFavorite: boolean;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
};

// type ClusterOrPoint = ClusterPoint | IndividualPoint;

export function useTerraceClusters({
  terraces,
  bounds,
  zoom,
}: {
  terraces: CustomTerraceType[];
  bounds: LngLatBoundsLike | null;
  zoom: number;
}) {
  const { isFavorite } = useFavorites();
  const geoJsonPoints: IndividualPoint[] = useMemo(() => {
    return terraces
      .filter((t) => t.latitude && t.longitude)
      .map((terrace) => ({
        type: "Feature",
        properties: {
          id: terrace.id,
          business_name: terrace.business_name,
          address: terrace.address,
          isFavorite: terrace.id ? isFavorite(terrace.id) : false
        },
        geometry: {
          type: "Point",
          coordinates: [terrace.longitude, terrace.latitude],
        },
      }));
  }, [terraces, isFavorite]);

  const supercluster = useMemo(() => {
    return new Supercluster({
      radius: 20,
      maxZoom: 15,
    }).load(geoJsonPoints);
  }, [geoJsonPoints]);

  const clusters = useMemo(() => {
    if (!bounds) return [];
    // Convert bounds to array if necessary
    let boundsArray: [number, number, number, number];
    if (Array.isArray(bounds) && Array.isArray(bounds[0])) {
      // bounds is [[west, south], [east, north]]
      boundsArray = [
        (bounds as [[number, number], [number, number]])[0][0],
        (bounds as [[number, number], [number, number]])[0][1],
        (bounds as [[number, number], [number, number]])[1][0],
        (bounds as [[number, number], [number, number]])[1][1],
      ];
    } else {
      throw new Error("Unsupported bounds format");
    }
    return supercluster.getClusters(
      boundsArray,
      Math.round(zoom)
    );
  }, [supercluster, bounds, zoom]);

  return clusters;
}
