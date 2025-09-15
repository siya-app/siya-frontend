// services/favoritesService.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "../hooks/useUser";
import { fetchTerraces } from "../services";
import type { Favorite } from "../types/types";
import type { Terrace } from "../types/TerraceType";

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

  const favoriteTerraces: Terrace[] = terraceList.filter(t =>
    favorites?.some(fav => fav.terrace_id === t.id)
  );

  return {
    favoriteTerraces,
    isLoading,
    error,
  };
};
