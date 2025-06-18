// components/reviews/ReviewSlider.tsx
import ScrollSnap from "../../components/slider/ScrollSnap";
import ReviewCard from "./ReviewCard";
import { useQuery } from "@tanstack/react-query";
import { fetchReviewsByTerraceId } from "../../features/reviews/fetchReviewsByTerraceId";
import { type Review } from "../../types/types";

type Props = {
  terraceId: string;
};

export function ReviewSlider({ terraceId }: Props) {
  const { data: reviews, isLoading, error } = useQuery({
    queryKey: ['reviews', terraceId],
    queryFn: () => fetchReviewsByTerraceId(terraceId),
  });

  if (isLoading) return <p>Carregant reviews...</p>;
  if (error) return <p className="text-red-500">Error carregant les reviews.</p>;

  if (!reviews?.length) return <p>No hi ha ressenyes encara.</p>;

  return (
    <ScrollSnap>
      {reviews.map((review: Review) => (
        <ReviewCard
          key={review.id}
          rating={review.rating}
          comment={review.comment}
          userName={review.user?.name || "Anònim"} // Si Supabase retorna join
        />
      ))}
    </ScrollSnap>
  );
}
