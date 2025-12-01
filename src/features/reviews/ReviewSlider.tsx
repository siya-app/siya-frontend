// components/reviews/ReviewSlider.tsx
import ScrollSnap from "../../components/slider/ScrollSnap";
import ReviewCard from "./ReviewCard";
import { useQuery } from "@tanstack/react-query";
import { fetchReviewsByField } from "../../features/reviews/fetchReviewsByField";
import { type Review } from "../../types/types";
import { useEffect } from "react";
import Spinner from "../../components/Spinner";

type Props = {
  terraceId?: string;
  userId?: string;
  refresh?: boolean;
};

export function ReviewSlider({ terraceId, userId, refresh }: Props) {
  const field = terraceId ? "terraceId" : "userId";
  const value = terraceId ?? userId;

  const { data: reviews, isLoading, error, refetch } = useQuery({
    queryKey: ['reviews', terraceId],
    queryFn: () => fetchReviewsByField(field as "terraceId" | "userId", value!),
    enabled: Boolean(value), // no fa fetch si no hi ha id
  });

  useEffect(() => {
    if (refresh) {
      refetch();
    }
  }, [refresh, refetch]);

  if (isLoading) return <div className="flex justify-center items-center text-center p-4">
    <Spinner /></div>;

  if (error) return <p className="text-red-500 font-bold">Error</p>;

  if (!reviews?.length) return <p className="ms-4">No s'han trobat ressenyes</p>;

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
            terraceId={review.terraceId}
          />
        </div>
      ))}
    </ScrollSnap>
  );
}
