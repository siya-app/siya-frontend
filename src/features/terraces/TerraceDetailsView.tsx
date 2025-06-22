import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart, Share2 } from "lucide-react";
import type { Terrace } from "../../types/TerraceType";
import { fetchTerraceById } from "../../services/fetchTerraceById";
import { ReviewSlider } from "../reviews/ReviewSlider";
import { ReviewForm } from "../reviews/ReviewForm";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import { RiHeartsLine, RiHeartsFill } from "react-icons/ri";

const TerraceDetailsView = () => {
  const { id } = useParams();
  const [terrace, setTerrace] = useState<Terrace | null>(null);
  const [loadingTerrace, setLoadingTerrace] = useState(true);
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
          message: 'Debes iniciar sesión para reservar esta terraza',
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

  if (loadingTerrace) return <p className="p-4">Carregant terrassa...</p>;
  if (!terrace)
    return <p className="p-4 text-red-500">No s'ha trobat la terrassa.</p>;

  return (
    <div className="p-4 space-y-3">
      <img
        src={terrace.profile_pic}
        alt={terrace.business_name}
        className="rounded-lg w-full object-cover h-52"
      />

      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold text-siya-principal leading-tight">
          {terrace.business_name.split(" ")[0]} <br />
          {terrace.business_name.split(" ").slice(1).join(" ")}
        </h1>
        <div className="text-right text-siya-dark-green">
          <div className="text-2xl">⭐ {terrace.average_rating}/10</div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-700">
        <span>📍</span>
        <span>{terrace.address}</span>
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
              className={`w-6 h-6 transition-all ${
                favorite ? "fill-red-500 text-red-500" : ""
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
            className="bg-siya-principal text-white px-4 py-2 rounded-full font-semibold hover:bg-siya-dark-green transition"
            onClick={handleBooking}
          >
            Reservar taula
          </button>
        </div>
      )}
      <div className="pt-6">
        <h2 className="text-xl font-medium">Ressenyes</h2>
      </div>
      <ReviewSlider terraceId={terrace.id} />
      <div className="pt-6">
        <h2 className="text-xl font-medium">Deixa la teva Ressenya</h2>
      </div>
      <ReviewForm
        userId={user?.id || ""}
        terraceId={terrace.id}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["reviews", terrace.id] });
        }}
      />
    </div>
  );
};

export default TerraceDetailsView;
