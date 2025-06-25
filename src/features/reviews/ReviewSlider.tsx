// components/reviews/ReviewSlider.tsx
import ScrollSnap from "../../components/slider/ScrollSnap";
import ReviewCard from "./ReviewCard";
import { useQuery } from "@tanstack/react-query";
import { fetchReviewsByTerraceId } from "../../features/reviews/fetchReviewsByTerraceId";
import { type Review } from "../../types/types";
import { useEffect } from "react";

type Props = {
  terraceId: string;
  userId?: string;
  refresh: boolean;
  // setRefreshReviews:  React.Dispatch<React.SetStateAction<boolean>>;
};

export function ReviewSlider({ terraceId, refresh }: Props) {
  const { data: reviews, isLoading, error, refetch } = useQuery({
    queryKey: ['reviews', terraceId],
    queryFn: () => fetchReviewsByTerraceId(terraceId),
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
        className="m-2">
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
