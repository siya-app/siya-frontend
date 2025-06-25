// components/reviews/ReviewSlider.tsx
import ScrollSnap from "../../components/slider/ScrollSnap";
import ReviewCard from "./ReviewCard";
import { useQuery } from "@tanstack/react-query";
import { fetchReviewsByTerraceId } from "../../features/reviews/fetchReviewsByTerraceId";            
import { type Review } from "../../types/types";
import { useEffect } from "react";

type Props = {
  terraceId?: string;
  userId?: string;
  refresh: boolean;
  // setRefreshReviews:  React.Dispatch<React.SetStateAction<boolean>>;
};

export async function fetchReviewsByUserId(userId: string) {
  const res = await fetch(`http://localhost:8080/reviews/from-user?userId=${userId}`);
  if (!res.ok) throw new Error("Error fetching user reviews");
  return await res.json();
}

export function ReviewSlider({ terraceId, userId, refresh }: Props) {
  const { data: reviews, isLoading, error, refetch } = useQuery({
    queryKey: ['reviews', terraceId || userId],
    queryFn: () => {
      if (terraceId) return fetchReviewsByTerraceId(terraceId);
      if (userId) return fetchReviewsByUserId(userId);
      return Promise.resolve([]);
    },
    enabled: !!terraceId || !!userId,
  });

  useEffect(() => {
    if (refresh) {
      refetch();
    }
  }, [refresh, refetch]);

  if (isLoading) return <p>Carregant reviews...</p>;
  if (error) return <p className="text-red-500">Error carregant les reviews.</p>;

  if (!reviews?.length) return <p>Sigues el primer en valorar aquesta terrassa!</p>;

  return (
    <ScrollSnap>
      {reviews.map((review: Review) => (
        <div
        key={review.id + 1}
        className="m-2 w-64 h-40 flex-shrink-0">
          <ReviewCard
            key={review.id}
            rating={review.rating}
            comment={review.comment}
            userName={review.userName || "Anònim"} // Si Supabase retorna join
          />
        </div>
      ))}
    </ScrollSnap>
  );
}
