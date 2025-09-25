import type { ReviewCardProps } from "../../types/types";
import RatingStars from "../../components/RatingStars";

export default function ReviewCard({ rating, comment, userName }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-64 snap-start flex-shrink-0">
      <div className="flex items-center gap-2 mb-2">
      <RatingStars
      rating={rating}
      />
      </div>
      <p className="text-sm text-gray-700 italic">“{comment}”</p>
      <div className="mt-2 text-right text-xs text-gray-500">– {userName}</div>
    </div>
  );
}
