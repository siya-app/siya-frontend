// services/favoritesService.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "../hooks/useUser";
import { fetchTerraces } from "../services";
import type { Favorite } from "../types/types";
// import type { Terrace } from "../types/TerraceType";
import type { CustomTerraceType } from "../types/zod/customTerrace-schema";

const fetchFavorites = async (userId: string): Promise<Favorite[]> => {
  const res = await axios.get(`http://localhost:8080/favorites?userId=${userId}`);
  return res.data;
};

export const useFavoriteTerraces = () => {
  const { user } = useUser();
  const { terraceList } = fetchTerraces();

  const { data: favorites, isLoading, error } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: () => fetchFavorites(user!.id),
    enabled: !!user?.id,
  });

  const favoriteTerraces: CustomTerraceType[] = terraceList.filter((terrace: CustomTerraceType) =>
    favorites?.some((fav: Favorite) => fav.terraceId === terrace.id)
  );

  return {
    favoriteTerraces,
    isLoading,
    error,
  };
};
