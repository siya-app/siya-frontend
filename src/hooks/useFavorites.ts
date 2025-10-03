import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/useAuth';

interface Favorite {
  id: string;
  id_terrace: string;
}

export function useFavorites() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const userId = user?.id;
  const API_FAVS = import.meta.env.VITE_API_FAVS;

  const { data: favorites = [], isLoading } = useQuery<Favorite[]>({
    queryKey: ['favorites', userId],
    queryFn: async () => {
      if (!userId) return [];
      const res = await fetch(`${API_FAVS}?userId=${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Error fetching favorites');
      return await res.json();
    },
    enabled: !!userId,
  });

  const addMutation = useMutation({
    mutationFn: async (terraceId: string) => {
      if (!userId) throw new Error("User not authenticated");
      const res = await fetch(API_FAVS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, terraceId })
      });
      if (!res.ok) throw new Error('Error adding favorite');
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', userId] });
    }
  });

  const removeMutation = useMutation({
    mutationFn: async (terraceId: string) => {
      if (!userId) throw new Error("User not authenticated");
      const res = await fetch(API_FAVS, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, terraceId })
      });
      if (!res.ok) throw new Error('Error removing favorite');
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', userId] });
    }
  });

  const isFavorite = (terraceId: string): boolean =>
    !!(favorites as Favorite[] | undefined)?.find((f) => f.id_terrace === terraceId);

  return {
    isFavorite,
    addFavorite: addMutation.mutate,
    removeFavorite: removeMutation.mutate,
    loading: isLoading || addMutation.isPending || removeMutation.isPending,
  };
}
export default useFavorites;