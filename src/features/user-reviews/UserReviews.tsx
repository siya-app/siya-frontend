import ProfileReviewCard from "../../components/ProfileReviewCard";
import { useState, useEffect, useContext } from "react";
import type { User } from "../../types/User";
import { ReviewContext } from "../../context/reviews.context";
import { useNavigate } from "react-router-dom";
import { HiArrowSmRight } from "react-icons/hi";
import { TerraceContext } from "../../context/filteredTerraces.context";
import type { CustomTerraceType } from "../../types/zod/customTerrace-schema";
import ReviewsModal from "../../components/ReviewsModal";


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
  const { allReviews, reviewError, getReviews } = useContext(ReviewContext);
  const { allTerraces, getTerraces } = useContext(TerraceContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    getReviews();
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, []);

  if (!user) return <div>Carregant dades...</div>;
  const personalReviews = allReviews.filter(
    (review: Review) => review.userId === user.id
  );
  const previewReviews = personalReviews.slice(0, 2);

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
          {previewReviews.length > 0 ? (
            previewReviews.map((review: Review) => {
              const currentTerrace = allTerraces.find(
                (terrace: CustomTerraceType) => terrace.id === review.terraceId
              );
              if (!currentTerrace) {
                console.warn(`Terrassa amb id ${review.terraceId} no trobada.`);
                return null;
              }
              const terraceName =
                currentTerrace && currentTerrace.business_name;

              return (
                <ProfileReviewCard
                  key={review.id}
                  restaurantName={terraceName}
                  rating={review.rating}
                  comment={review.comment}
                  terraceId={currentTerrace.id}
                ></ProfileReviewCard>
              );
            })
          ) : (
            <p>Encara no has publicat cap ressenya.</p>
          )}
        </div>
        {personalReviews.length > 2 && (
          <div className="text-end mx-2"><button
            onClick={() => setIsModalOpen(true)}
            className="mt-2 text-sm text-siya-dark-green hover:underline"
          >
            Veure-les totes
          </button></div>
        )}
      </div>
      <ReviewsModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  reviews={personalReviews}
  allTerraces={allTerraces}
/>
    </>
  );
}

export default UserReviews;
