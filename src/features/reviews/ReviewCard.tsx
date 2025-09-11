import type { ReviewCardProps } from "../../types/types";
import RatingStars from "../../components/RatingStars";

export default function ReviewCard({ rating, comment, userName }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-64 h-full snap-start flex-shrink-0">
      <div className="flex items-center gap-2 mb-2">
      <RatingStars
      rating={rating}
      />
      </div>
      <p className="text-sm text-gray-700 italic text-balance truncate">“{comment}”</p>
      <div className="text-right align-bottom self-end mt-10 text-xs text-siya-dark-green">– {userName}</div>
    </div>
  );
}
