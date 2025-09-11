import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { fetchTerraceById } from "../../services/fetchTerraceById";
import { ReviewSlider } from "../reviews/ReviewSlider";
import { ReviewForm } from "../reviews/ReviewForm";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import { GoPin } from "react-icons/go";
import RatingStars from "../../components/RatingStars";
import { GrCurrency } from "react-icons/gr";
import { GrRss } from "react-icons/gr";
import { GrWheelchairActive } from "react-icons/gr";
import { IoBusiness } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa";
import { PiBowlFoodBold } from "react-icons/pi";
import { TagsModal } from "../../components/TagsModal";
import Button from "../../components/Button";
import type { CustomTerraceType } from "../../types/zod/customTerrace-schema";
import TerraceSlider from "../../components/slider/TerraceSlider";
import { useTerraceList } from "../../hooks/useTerraceList";


const TerraceDetailsView = () => {
  const { id } = useParams();
  const [terrace, setTerrace] = useState<CustomTerraceType | null>(null);
  const [loadingTerrace, setLoadingTerrace] = useState(true);
  const [refreshReviews, setRefreshReviews] = useState(false);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const { terraceList } = useTerraceList();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { isFavorite, addFavorite, removeFavorite, loading } = useFavorites();
  const favorite = isFavorite(id || "");

  const toggleFavorite = () => {
    if (!id || !user?.id) return;
    if (favorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  useEffect(() => {
    if (!id) return;

    fetchTerraceById(id)
      .then((data) => setTerrace(data))
      .catch((error) => console.error(error))
      .finally(() => setLoadingTerrace(false));
  }, [id]);

  const handleBooking = () => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');

    if (!token || !userString) {
      navigate('/login', {
        state: {
          message: 'Siusplau, inicia sessió per reservar la terrassa.',
          returnTo: `/terrace/${id}`
        }
      });
      return;
    }

    const user = JSON.parse(userString);

    const params = new URLSearchParams({
      token,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      id_terrace: user.id_terrace ?? '',
      restaurantId: user.restaurantId ?? '',
      terraceId: id ?? ''
    });

    window.location.href = `http://localhost:4200/calendar?${params.toString()}`;
  };

  console.log(`terrace rating: ${terrace?.average_rating}`)

  if (loadingTerrace) return <p className="p-4">Carregant terrassa...</p>;
  if (!terrace)
    return <p className="p-4 text-red-500">No s'ha trobat la terrassa.</p>;

  return (
    <div>
    <div className="p-4 space-y-3 m-3">
      <div className="relative">
        <img
          src={terrace.profile_pic}
          alt={terrace.business_name}
          className="rounded-lg w-full object-cover h-50"
        />
      </div>
      {/* Visualise tags */}
      <div className="absolute top-19 right-2 z-1 rotate-16 animate-pulse animate-twice">
        <Button
          onClick={() => setShowTagsModal(true)}
          className="border-2 border-siya-principal p-3
          text-siya-principal w-fit
          bg-white
          rounded-full">
          Tags
        </Button>
      </div>
      <TagsModal
        isOpen={showTagsModal}
        onClose={() => setShowTagsModal(false)}
        tags={terrace.tags}
      />

      <div className="flex items-start justify-between text-balance">
        <h1 className="text-3xl font-bold text-siya-principal leading-tight text-balance">
          {terrace.business_name.split(" ")[0]} <br />
          {terrace.business_name.split(" ").slice(1).join(" ")}
        </h1>
        <div className="text-right text-siya-dark-green">
          <RatingStars
            rating={terrace.average_rating ?? 0}
          />
        </div>

      </div>
      <div className="shadow-lg p-4 rounded-xl text-balance">
        <div className="flex flex-row items-center justify-center gap-4 siyaDark-text mb-5">
          <span className="">
            <GoPin className="inline-icon me-2 text-xl" />
            {terrace.address}</span>

          <span className="self-end">
            <IoBusiness className="inline-icon me-2 text-xl" />
            {terrace.neighbourhood_name}</span>
        </div>

        <div className="flex flex-row items-center justify-center gap-8 siyaDark-text">

          <span>
            <GrCurrency className="inline-icon me-2 text-xl" />
            {terrace.average_price ?
              terrace.average_price + "€" :
              <FaQuestion className="inline-icon text-siya-principal" />}</span>

          <span>
            <PiBowlFoodBold className="inline-icon me-2 text-xl" />
            {terrace.has_kitchen ?
              "Si" :
              terrace.has_kitchen === null ?
                <FaQuestion className="inline-icon text-siya-principal" /> :
                "No"
            }</span>

          <span>
            <GrRss className="inline-icon me-2 text-xl" />
            {terrace.has_wifi ?
              "Si" :
              terrace.has_wifi === null ?
                <FaQuestion className="inline-icon text-siya-principal" /> :
                "No"}</span>

          <span>
            <GrWheelchairActive className="inline-icon me-2 text-xl" />
            {terrace.has_disabled_access ?
              "Si" :
              terrace.has_disabled_access === null ?
                <FaQuestion className="inline-icon text-siya-principal" /> :
                "No"}</span>
        </div>
      </div>

      {/* Accions: Favorit i Compartir */}
      <div className="flex justify-around pt-4">
        {user ? (
          <button
            onClick={toggleFavorite}
            className="flex flex-col items-center disabled:opacity-50"
            disabled={loading}
          >
            <Heart
              className={`w-6 h-6 transition-all ${favorite ? "fill-red-500 text-red-500" : ""
                }`}
            />
            <span className="text-sm">{favorite ? "Guardat" : "Guardar"}</span>
          </button>
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <Heart className="w-6 h-6" />
            <span className="text-sm">Cal iniciar sessió per guardar</span>
          </div>
        )}
        <div className="flex flex-col items-center">
          <Share2
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Enllaç copiat al porta-retalls!");
            }}
            className="w-6 h-6"
          />
          <span className="text-sm">Compartir</span>
        </div>
      </div>
      {terrace.is_claimed && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-siya-principal text-white px-4 py-2 rounded-full font-semibold
            hover:bg-siya-dark-green transition"
            onClick={handleBooking}
          >
            Reservar taula
          </button>
        </div>
      )}
      <div className="pt-6">
        <h2 className="text-xl font-medium">Ressenyes</h2>
      </div>
      <ReviewSlider
        terraceId={terrace.id}
        refresh={refreshReviews}
      />
      <div className="pt-6">
        <h2 className="text-xl font-medium">La teva opinió és molt important per nosaltres...</h2>
      </div>
      <ReviewForm
        userId={user?.id || ""}
        terraceId={terrace.id}
        onSuccess={async () => {
          const updatedTerrace = await fetchTerraceById(terrace.id);
          setTerrace(updatedTerrace);
          setRefreshReviews(prev => !prev);

        }}
      />
    </div>
      <div>
      <TerraceSlider
      orderBy="nearby"
      list={terraceList}
      />
      </div>
    </div>
  );
};

export default TerraceDetailsView;
