import { Star } from "lucide-react";

type ReviewCardProps = {
  rating: number;
  comment: string;
  userName: string; // suposem que ve de Supabase amb join o inclòs al JSON
};

export default function ReviewCard({ rating, comment, userName }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-64 snap-start flex-shrink-0">
      <div className="flex items-center gap-2 mb-2">
        <Star className="text-yellow-500 w-4 h-4" />
        <span className="font-semibold">{rating}/5</span>
      </div>
      <p className="text-sm text-gray-700 italic">“{comment}”</p>
      <div className="mt-2 text-right text-xs text-gray-500">– {userName}</div>
    </div>
  );
}
