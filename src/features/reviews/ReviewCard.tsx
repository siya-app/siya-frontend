import type { ReviewCardProps } from "../../types/types";
import RatingStars from "../../components/RatingStars";
import { fetchReviewsByField } from "./fetchReviewsByField";
import { useTerraceList } from "../../hooks/useTerraceList";
import type { CustomTerraceType } from "../../types/zod/customTerrace-schema";
import { Link } from "react-router-dom";

export default function ReviewCard({ rating, comment, userName, terraceId, userId }: ReviewCardProps) {

  // const terrace = terraceId
  //   ? fetchReviewsByField("terraceId", terraceId)
  //   : userId
  //   ? fetchReviewsByField("userId", userId)
  //   : null;

  const { terraceList } = useTerraceList();

  const terrace = terraceList.find((t: CustomTerraceType) => (
    t.id === terraceId
  ))

  // jo afagiria un boto de "veure mes +" o algo aixi
  // per tal que si el text es molt llarg, s'obri un modal i et mostri la review sencera
  // ho podem tractar d'una altra manera pero es el que se m'acut
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md p-4 w-64 snap-start flex-shrink-0 h-50 md:h-60 lg:h-70">
      <div className="flex flex-col w-full items-center gap-2 mb-2">
        <RatingStars
          rating={rating}
        />
        <div className="w-full text-left">
        {terrace && (
          <Link
            to={`/terrassa/${terrace.id}`}
            className="text-xs text-pretty text-siya-principal hover:underline font-medium "
          >
            {terrace.business_name}
          </Link>
        )}
        </div>
      </div>
      <p className="text-xs text-siya-dark-green italic line-clamp-4 overflow-hidden text-left">
        “{comment}”</p>
      <div className="mt-auto text-right text-xs text-siya-dark-green">
        – {userName}
      </div>
    </div>
  );
}
