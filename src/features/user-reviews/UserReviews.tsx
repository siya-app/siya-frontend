import ProfileReviewCard from "../../components/ProfileReviewCard";
import { useState, useEffect, useContext } from "react";
import type { User } from "../../types/User";
import { ReviewContext } from "../../context/reviews.context";
import { useNavigate } from "react-router-dom";
import { HiArrowSmRight } from "react-icons/hi";
import { TerraceContext } from "../../context/filteredTerraces.context";
import type {CustomTerraceType} from "../../types/zod/customTerrace-schema"

interface Review {
  id: number;
  restaurantName: string;
  rating: number;
  comment: string;
  terraceId: string;
  userId: string;
}

function UserReviews() {
  const [user, setUser] = useState<User | null>(null);

  const reviewContext = useContext(ReviewContext);

  if (!reviewContext) {
    throw new Error("ReviewContext is undefined");
  }

  const { allReviews, getReviews } = reviewContext;

  const terraceContext = useContext(TerraceContext);

  if (!terraceContext) {
    throw new Error("TerraceContext is undefined");
  }

  const { allTerraces } = terraceContext;

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    // const storedToken = localStorage.getItem("token");

    getReviews();
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, []);

  if (!user) return <div>Carregant dades...</div>;
  if (!user || !Array.isArray(allReviews)) return <div>Carregant dades...</div>;
  
  const personalReviews = (allReviews as unknown as Review[]).filter(
  (review) => review.userId === user.id
);
  
  console.log(personalReviews);
  console.log(allReviews);

  return (
    <>
      <div className="mt-5">
        <h2
          className="montserrat-siya text-xl
            m-2 ms-3 siyaDark-text"
        >
          Les meves ressenyes
          <span className="inline-icon">
            <HiArrowSmRight />
          </span>
        </h2>
        <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-center items-center">
          {personalReviews.length > 0 ? (
            personalReviews.map((review: Review) => 
            { const currentTerrace = (allTerraces as CustomTerraceType[]).find(
  (terrace) => terrace.id === review.terraceId
);
              const terraceName = currentTerrace && currentTerrace.business_name ;
             if (!currentTerrace) return null;
              return (
              
              <ProfileReviewCard
                key={review.id}
                restaurantName={terraceName ?? "Desconegut"}
                rating={review.rating}
                comment={review.comment}
                terraceId={currentTerrace.id ?? "unknown-id"}
              ></ProfileReviewCard>
            )})
          ) : (
            <p>Encara no has publicat cap ressenya.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default UserReviews;